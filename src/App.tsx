import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bitcoin, Wallet, FileText, Download } from 'lucide-react'

interface InvoiceData {
  recipientName: string
  recipientEmail: string
  amount: string
  currency: string
  description: string
  walletAddress: string
}

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    recipientName: '',
    recipientEmail: '',
    amount: '',
    currency: 'BTC',
    description: '',
    walletAddress: ''
  })

  const [generatedInvoice, setGeneratedInvoice] = useState<InvoiceData | null>(null)

  const handleInputChange = (field: keyof InvoiceData, value: string) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }))
  }

  const generateInvoice = () => {
    if (invoiceData.recipientName && invoiceData.amount && invoiceData.walletAddress) {
      setGeneratedInvoice({ ...invoiceData })
    }
  }

  const resetForm = () => {
    setInvoiceData({
      recipientName: '',
      recipientEmail: '',
      amount: '',
      currency: 'BTC',
      description: '',
      walletAddress: ''
    })
    setGeneratedInvoice(null)
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
                  <select
                    id="currency"
                    value={invoiceData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="LTC">Litecoin (LTC)</option>
                    <option value="ADA">Cardano (ADA)</option>
                  </select>
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
                        <span className="font-bold">{generatedInvoice.amount} {generatedInvoice.currency}</span>
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
                          <div className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">
                            {generatedInvoice.walletAddress}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
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
