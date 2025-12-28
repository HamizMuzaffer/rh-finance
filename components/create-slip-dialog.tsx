"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateInvoicePDF } from "@/components/invoice-generator"

interface CreateSlipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSlipDialog({ open, onOpenChange }: CreateSlipDialogProps) {
  const [employeeName, setEmployeeName] = useState("")
  const [baseSalary, setBaseSalary] = useState("")
  const [commission, setCommission] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    if (!employeeName || !baseSalary || !commission) {
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      await generateInvoicePDF({
        employeeName,
        baseSalary: Number.parseFloat(baseSalary),
        commission: Number.parseFloat(commission),
      })

      // Reset form
      setEmployeeName("")
      setBaseSalary("")
      setCommission("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating invoice. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Salary Invoice</DialogTitle>
          <DialogDescription>Enter employee details to generate an invoice</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Base Salary</Label>
            <Input
              id="salary"
              type="number"
              placeholder="Enter base salary"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commission">Commission Earned</Label>
            <Input
              id="commission"
              type="number"
              placeholder="Enter commission amount"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Generating..." : "Generate Invoice"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
