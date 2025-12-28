"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateSlipDialog } from "@/components/create-slip-dialog"
import { CompanyLogo } from "@/components/company-logo"

export default function Home() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CompanyLogo />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Hi, Hamza</h1>
                <p className="text-sm text-slate-500">Welcome to your invoice management dashboard</p>
              </div>
            </div>
            <Button onClick={() => setShowDialog(true)} className="bg-blue-600 hover:bg-blue-700" size="lg">
              Create Slip
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-slate-600">Click Create Slip to generate a new salary invoice</p>
        </div>
      </div>

      {/* Create Slip Dialog */}
      <CreateSlipDialog open={showDialog} onOpenChange={setShowDialog} />
    </main>
  )
}
