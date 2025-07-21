import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bitcoin, Wallet, FileText, Download, Loader2, AlertCircle } from 'lucide-react'
import jsPDF from 'jspdf'

interface InvoiceData {
  recipientName: string
  recipientEmail: string
  amount: string
  currency: string
  blockchainNetwork: string
  description: string
  walletAddress: string
}

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    recipientName: '',
    recipientEmail: '',
    amount: '',
    currency: '',
    blockchainNetwork: '',
    description: '',
    walletAddress: ''
  })

  const [generatedInvoice, setGeneratedInvoice] = useState<InvoiceData | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  // PDF generation configuration
  const pdfConfig = {
    orientation: 'portrait' as const,
    unit: 'mm' as const,
    format: 'a4' as const,
    margins: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    fontSize: {
      title: 18,
      subtitle: 14,
      normal: 12,
      small: 10
    }
  }

  const handleInputChange = (field: keyof InvoiceData, value: string) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }))
  }

  const generateInvoice = () => {
    if (invoiceData.recipientName && invoiceData.amount && invoiceData.walletAddress) {
      setGeneratedInvoice({ ...invoiceData })
    }
  }

  const generatePDF = async () => {
    if (!generatedInvoice) return

    // Clear any previous errors and set loading state
    setPdfError(null)
    setIsGeneratingPDF(true)

    try {
      // Add a small delay to show loading state for user feedback
      await new Promise(resolve => setTimeout(resolve, 500))

      const doc = new jsPDF(pdfConfig.orientation, pdfConfig.unit, pdfConfig.format)
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      // Generate invoice number
      const invoiceNumber = Date.now().toString().slice(-6)

      // Header
      doc.setFontSize(pdfConfig.fontSize.title)
      doc.setFont('helvetica', 'bold')
      doc.text('CRYPTO INVOICE', pageWidth / 2, pdfConfig.margins.top + 10, { align: 'center' })

      doc.setFontSize(pdfConfig.fontSize.normal)
      doc.setFont('helvetica', 'normal')
      doc.text(`Invoice #${invoiceNumber}`, pageWidth / 2, pdfConfig.margins.top + 20, { align: 'center' })

      // Date
      const currentDate = new Date().toLocaleDateString()
      doc.text(`Date: ${currentDate}`, pageWidth / 2, pdfConfig.margins.top + 30, { align: 'center' })

      let yPosition = pdfConfig.margins.top + 50

      // Recipient Information Section
      doc.setFontSize(pdfConfig.fontSize.subtitle)
      doc.setFont('helvetica', 'bold')
      doc.text('BILL TO:', pdfConfig.margins.left, yPosition)
      yPosition += 10

      doc.setFontSize(pdfConfig.fontSize.normal)
      doc.setFont('helvetica', 'normal')
      doc.text(generatedInvoice.recipientName, pdfConfig.margins.left, yPosition)
      yPosition += 8

      if (generatedInvoice.recipientEmail) {
        doc.text(generatedInvoice.recipientEmail, pdfConfig.margins.left, yPosition)
        yPosition += 8
      }

      yPosition += 10

      // Payment Details Section
      doc.setFontSize(pdfConfig.fontSize.subtitle)
      doc.setFont('helvetica', 'bold')
      doc.text('PAYMENT DETAILS:', pdfConfig.margins.left, yPosition)
      yPosition += 10

      doc.setFontSize(pdfConfig.fontSize.normal)
      doc.setFont('helvetica', 'normal')

      // Amount
      doc.text('Amount:', pdfConfig.margins.left, yPosition)
      doc.setFont('helvetica', 'bold')
      doc.text(`${generatedInvoice.amount} ${generatedInvoice.currency}`, pdfConfig.margins.left + 40, yPosition)
      doc.setFont('helvetica', 'normal')
      yPosition += 8

      // Network
      doc.text('Network:', pdfConfig.margins.left, yPosition)
      doc.text(generatedInvoice.blockchainNetwork || 'Not specified', pdfConfig.margins.left + 40, yPosition)
      yPosition += 8

      // Description (if provided)
      if (generatedInvoice.description) {
        doc.text('Description:', pdfConfig.margins.left, yPosition)
        // Handle long descriptions with text wrapping
        const descriptionLines = doc.splitTextToSize(generatedInvoice.description, pageWidth - pdfConfig.margins.left - pdfConfig.margins.right - 40)
        doc.text(descriptionLines, pdfConfig.margins.left + 40, yPosition)
        yPosition += descriptionLines.length * 6 + 2
      }

      yPosition += 10

      // Wallet Address Section
      doc.setFontSize(pdfConfig.fontSize.subtitle)
      doc.setFont('helvetica', 'bold')
      doc.text('PAYMENT ADDRESS:', pdfConfig.margins.left, yPosition)
      yPosition += 10

      // Handle long wallet addresses with proper text wrapping
      doc.setFontSize(pdfConfig.fontSize.small)
      doc.setFont('courier', 'normal')
      const maxWidth = pageWidth - pdfConfig.margins.left - pdfConfig.margins.right
      const addressLines = doc.splitTextToSize(generatedInvoice.walletAddress, maxWidth)

      // Add background rectangle for wallet address
      const addressHeight = addressLines.length * 4 + 4
      doc.setFillColor(245, 245, 245)
      doc.rect(pdfConfig.margins.left, yPosition - 2, maxWidth, addressHeight, 'F')

      doc.setFontSize(12)
      doc.text(addressLines, pdfConfig.margins.left + 2, yPosition + 2)
      yPosition += addressHeight + 10

      // Footer
      doc.setFontSize(pdfConfig.fontSize.small)
      doc.setFont('helvetica', 'italic')
      const footerText = 'Please send the exact amount to the specified wallet address on the correct network.'
      doc.text(footerText, pageWidth / 2, pageHeight - pdfConfig.margins.bottom, { align: 'center' })

      // Save the PDF
      doc.save(`crypto-invoice-${invoiceNumber}.pdf`)

    } catch (error) {
      console.error('PDF generation failed:', error)
      setPdfError('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const resetForm = () => {
    setInvoiceData({
      recipientName: '',
      recipientEmail: '',
      amount: '',
      currency: 'BTC',
      blockchainNetwork: '',
      description: '',
      walletAddress: ''
    })
    setGeneratedInvoice(null)
    setPdfError(null)
    setIsGeneratingPDF(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bitcoin className="h-12 w-12 text-orange-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Crypto Invoice Generator</h1>
          </div>
          <p className="text-lg text-gray-600">Create professional cryptocurrency invoices in seconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Invoice Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Create Invoice
              </CardTitle>
              <CardDescription>
                Fill in the details to generate your crypto invoice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  value={invoiceData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  placeholder="Enter recipient name"
                />
              </div>

              <div>
                <Label htmlFor="recipientEmail">Recipient Email</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={invoiceData.recipientEmail}
                  onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                  placeholder="Enter recipient email"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.00000001"
                    value={invoiceData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={invoiceData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    placeholder="BTC, ETH, LTC, ADA, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  value={invoiceData.walletAddress}
                  onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                  placeholder="Enter your wallet address"
                />
              </div>

              <div>
                <Label htmlFor="blockchainNetwork">Blockchain Network</Label>
                <Input
                  id="blockchainNetwork"
                  value={invoiceData.blockchainNetwork}
                  onChange={(e) => handleInputChange('blockchainNetwork', e.target.value)}
                  placeholder="e.g., Bitcoin, Ethereum, Polygon, BSC"
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={invoiceData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Invoice description"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={generateInvoice} className="flex-1">
                  Generate Invoice
                </Button>
                <Button onClick={resetForm} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="h-5 w-5 mr-2" />
                Invoice Preview
              </CardTitle>
              <CardDescription>
                Preview of your generated invoice
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedInvoice ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold">CRYPTO INVOICE</h3>
                      <p className="text-sm text-gray-500">Invoice #{Date.now().toString().slice(-6)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">To:</span>
                        <span>{generatedInvoice.recipientName}</span>
                      </div>
                      {generatedInvoice.recipientEmail && (
                        <div className="flex justify-between">
                          <span className="font-medium">Email:</span>
                          <span>{generatedInvoice.recipientEmail}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="font-medium">Amount:</span>
                        <span className="font-bold text-lg">{generatedInvoice.amount} {generatedInvoice.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Network:</span>
                        <span>{generatedInvoice.blockchainNetwork || 'Not specified'}</span>
                      </div>
                      {generatedInvoice.description && (
                        <div className="flex justify-between">
                          <span className="font-medium">Description:</span>
                          <span>{generatedInvoice.description}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-4">
                        <div className="text-sm">
                          <span className="font-medium">Payment Address:</span>
                          <div className="mt-1 p-4 bg-gray-100 rounded text-lg font-mono break-all">
                            {generatedInvoice.walletAddress}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={generatePDF}
                      className="w-full"
                      variant="outline"
                      disabled={isGeneratingPDF}
                    >
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </>
                      )}
                    </Button>

                    {pdfError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{pdfError}</span>
                        <Button
                          onClick={() => setPdfError(null)}
                          variant="ghost"
                          size="sm"
                          className="ml-auto h-6 w-6 p-0 text-red-700 hover:text-red-900"
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in the form to generate your invoice</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
