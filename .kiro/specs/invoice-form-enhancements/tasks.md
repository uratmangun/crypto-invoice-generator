# Implementation Plan

- [x] 1. Update TypeScript interfaces and state management
  - Modify the InvoiceData interface to include blockchainNetwork field
  - Update the initial state object to include the new field with empty string default
  - Update the resetForm function to include the new field
  - _Requirements: 2.1, 2.4_

- [x] 2. Replace currency dropdown with input field
  - Remove the existing select element for currency selection
  - Replace with Input component using the same styling and layout
  - Set default value to "BTC" and add appropriate placeholder text
  - Update the handleInputChange function calls for the new input
  - _Requirements: 1.1, 1.2, 1.4_

- [ ] 3. Add blockchain network input field to the form
  - Create new form field section for blockchain network input
  - Add Label component with "Blockchain Network" text
  - Add Input component with placeholder suggesting common networks
  - Wire up the input to the handleInputChange function
  - Position the field appropriately in the form layout
  - _Requirements: 2.1, 2.2, 2.5_

- [ ] 4. Update invoice preview to display new fields
  - Add blockchain network display in the invoice preview section
  - Show custom currency input in the amount display
  - Handle empty network field by displaying "Not specified"
  - Ensure proper formatting and spacing in the preview layout
  - _Requirements: 1.3, 2.3, 2.4_

- [ ] 5. Install and configure PDF generation dependencies
  - Add jsPDF library to package.json dependencies
  - Add @types/jspdf for TypeScript support if available
  - Import jsPDF in the App component
  - Set up basic PDF generation configuration
  - _Requirements: 3.2, 3.3_

- [ ] 6. Implement PDF generation functionality
  - Create generatePDF function that formats invoice data into PDF
  - Include all invoice fields: recipient info, amount, currency, network, description, wallet address
  - Apply professional formatting with proper margins, fonts, and spacing
  - Handle long wallet addresses with appropriate text wrapping
  - Add invoice header with title and generated invoice number
  - _Requirements: 3.4, 3.5_

- [ ] 7. Wire up PDF download button functionality
  - Connect the existing "Download PDF" button to the generatePDF function
  - Implement automatic file download when PDF is generated
  - Add loading state or feedback during PDF generation process
  - Ensure button is only enabled when an invoice is generated
  - Handle any PDF generation errors gracefully with user feedback
  - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [ ] 8. Test and validate all enhancements
  - Test currency input accepts various cryptocurrency symbols
  - Test blockchain network input with different network names
  - Test PDF generation with complete invoice data
  - Test PDF download functionality in the browser
  - Verify form reset includes all new fields
  - Test invoice preview displays all information correctly
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.4_