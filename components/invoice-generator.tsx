import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface InvoiceData {
  employeeName: string
  baseSalary: number
  commission: number
}

export async function generateInvoicePDF(data: InvoiceData) {
  const invoiceNumber = `INV${Date.now()}`
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  const container = document.createElement("div")
  container.style.position = "absolute"
  container.style.left = "-9999px"
  container.style.width = "816px"
  container.style.backgroundColor = "white"
  document.body.appendChild(container)

  container.innerHTML = generateInvoiceHTML(data, invoiceNumber, currentDate)

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
      allowTaint: true,
      onclone: (clonedDoc) => {
        const style = clonedDoc.createElement('style')
        style.textContent = `
          * {
            color: revert !important;
            background-color: revert !important;
            border-color: revert !important;
          }
        `
        clonedDoc.head.appendChild(style)
      }
    })

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    const yOffset = imgHeight > pdfHeight ? 0 : (pdfHeight - imgHeight) / 2
    pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, Math.min(imgHeight, pdfHeight))

    pdf.save(`${data.employeeName.replace(/\s+/g, '-')}-${invoiceNumber}.pdf`)
  } finally {
    document.body.removeChild(container)
  }
}

function generateInvoiceHTML(data: InvoiceData, invoiceNumber: string, currentDate: string): string {
  const grandTotal = data.baseSalary + data.commission

  return `
    <div style="font-family: Arial, sans-serif; padding: 40px; background: white; box-sizing: border-box;">
      <!-- Header with Logo and Company Info -->
      <div style="margin-bottom: 30px; border-bottom: 2px solid #000000; padding-bottom: 15px;">
        <div style="overflow: hidden;">
          <div style="float: left; width: 60%;">
            <img src="./logo.png" alt="Logo" style="width: 50px; height: 50px; margin-bottom: 10px; display: block;" />
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">R&H Software House</div>
            <div style="font-size: 11px; color: #666666; line-height: 1.4;">
              Gulshan e Iqbal Block 13 c wali center office #2<br>
              03363814012<br>
              rHsoftwarehouse@gmail.com
            </div>
          </div>
          <div style="float: right; text-align: right; width: 35%;">
            <div style="font-size: 18px; font-weight: bold; color: #0066cc; margin-bottom: 5px;">${invoiceNumber}</div>
            <div style="font-size: 12px; color: #666666;">${currentDate}</div>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>

      <!-- Invoice Title -->
      <div style="text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 30px; color: #000000;">INVOICE</div>

      <!-- Bill To Section -->
      <div style="margin-bottom: 30px;">
        <div style="font-weight: bold; margin-bottom: 5px; color: #000000;">Bill To</div>
        <div style="font-size: 14px; font-weight: bold; color: #000000;">${data.employeeName}</div>
        <div style="font-size: 11px; color: #666666; line-height: 1.6;">
          Office #2 Gulshan E Iqbal<br>
          syedhamzaali328@gmail.com<br>
          +923363814012
        </div>
      </div>

      <!-- Summary Section -->
      <div style="margin-bottom: 30px;">
        <div style="margin-bottom: 20px;">
          <div style="font-weight: bold; border-bottom: 1px solid #cccccc; padding-bottom: 5px; color: #000000;">Please Note</div>
          <div style="font-size: 11px; color: #666666; margin-top: 5px;">Payment terms: Net 30 days</div>
        </div>

        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="text-align: left; padding: 8px 10px; border-bottom: 1px solid #cccccc; color: #000000;">
              <div style="font-weight: bold;">Base Salary</div>
            </td>
            <td style="text-align: right; padding: 8px 10px; border-bottom: 1px solid #cccccc; color: #000000;">
              <div>Rs ${data.baseSalary.toFixed(2)}</div>
            </td>
          </tr>
          <tr>
            <td style="text-align: left; padding: 8px 10px; border-bottom: 1px solid #cccccc; color: #000000;">
              <div>(+) Commission Earned</div>
            </td>
            <td style="text-align: right; padding: 8px 10px; border-bottom: 1px solid #cccccc; color: #000000;">
              <div>Rs ${data.commission.toFixed(2)}</div>
            </td>
          </tr>
          <tr>
            <td style="text-align: left; padding: 12px 10px; background-color: #0066cc; color: #ffffff; font-weight: bold;">
              <div>Grand Total</div>
            </td>
            <td style="text-align: right; padding: 12px 10px; background-color: #0066cc; color: #ffffff; font-weight: bold;">
              <div>Rs ${grandTotal.toFixed(2)}</div>
            </td>
          </tr>
          <tr>
            <td style="text-align: left; padding: 8px 10px; font-size: 11px; color: #000000;">
              <div>(-) Paid (${currentDate})</div>
            </td>
            <td style="text-align: right; padding: 8px 10px; font-size: 11px; color: #000000;">
              <div>Rs ${grandTotal.toFixed(2)}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Signature Section -->
      <div style="margin-top: 60px; padding-top: 20px;">
        <div style="float: right; text-align: center; width: 150px;">
          <div style="border-top: 1px solid #000000; padding-top: 5px; font-size: 11px; color: #000000;">
            <div style="font-weight: bold; margin-bottom: 3px;">${data.employeeName}</div>
            <div>Authorized Signature</div>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>

      <!-- Footer Logo -->
      <div style="text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #cccccc;">
        <img src="./logo.png" alt="Logo" style="width: 60px; height: 60px; margin: 0 auto 10px; display: block;" />
        <div style="font-size: 11px; color: #666666;">R&H Software House</div>
      </div>
    </div>
  `
}