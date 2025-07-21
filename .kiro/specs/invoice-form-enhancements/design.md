# Design Document

## Overview

This design document outlines the enhancements to the crypto invoice generator, focusing on three key improvements: flexible currency input, blockchain network specification, and PDF export functionality. The design maintains the existing clean UI while adding these new capabilities seamlessly.

## Architecture

The enhancements will be implemented within the existing React component structure:

- **Frontend**: React with TypeScript, maintaining the current component-based architecture
- **State Management**: Continue using React's useState for form and invoice data
- **PDF Generation**: Integrate jsPDF library for client-side PDF creation
- **UI Components**: Extend existing shadcn/ui components for consistency

## Components and Interfaces

### Updated InvoiceData Interface

```typescript
interface InvoiceData {
  recipientName: string
  recipientEmail: string
  amount: string
  currency: string        // Changed from dropdown to free text input
  blockchainNetwork: string // New field for network specification
  description: string
  walletAddress: string
}
```

### Currency Input Component

- Replace the existing `<select>` dropdown with an `<Input>` component
- Maintain the same styling and layout as other form inputs
- Provide placeholder text suggesting common currencies
- Default value remains "BTC" for backward compatibility

### Blockchain Network Input Component

- Add new input field below the wallet address field
- Use standard `<Input>` component for consistency
- Include helpful placeholder text with network examples
- Optional field that displays "Not specified" when empty

### PDF Generation Service

- Utilize jsPDF library for client-side PDF generation
- Create a dedicated function to format invoice data into PDF
- Include proper styling, fonts, and layout for professional appearance
- Handle long wallet addresses with proper text wrapping

## Data Models

### Enhanced Form State

The existing form state will be extended to include the blockchain network field:

```typescript
const [invoiceData, setInvoiceData] = useState<InvoiceData>({
  recipientName: '',
  recipientEmail: '',
  amount: '',
  currency: 'BTC',           // Default value
  blockchainNetwork: '',     // New field
  description: '',
  walletAddress: ''
})
```

### PDF Document Structure

The PDF will contain:
- Header with "CRYPTO INVOICE" title and invoice number
- Recipient information section
- Payment details (amount, currency, network)
- Wallet address with proper formatting
- Description (if provided)
- Professional styling with consistent margins and fonts

## Error Handling

### Input Validation

- Currency field: Accept alphanumeric characters and common symbols (-, _)
- Network field: Accept alphanumeric characters and spaces
- Maintain existing validation for required fields (name, amount, wallet address)

### PDF Generation Errors

- Handle cases where PDF generation fails
- Display user-friendly error messages
- Provide fallback options (retry, copy invoice text)
- Log errors for debugging purposes

### Network Connectivity

- PDF generation is client-side, so no network dependencies
- Handle browser compatibility issues gracefully
- Provide feedback during PDF generation process

## Testing Strategy

### Unit Testing

- Test currency input accepts various formats
- Test network input handles different network names
- Test PDF generation with various invoice data combinations
- Test form validation with new fields

### Integration Testing

- Test complete invoice creation flow with new fields
- Test PDF download functionality across different browsers
- Test form reset functionality includes new fields
- Test invoice preview displays new information correctly

### User Acceptance Testing

- Verify currency input provides better flexibility than dropdown
- Confirm network field adds value to invoice clarity
- Validate PDF output meets professional standards
- Ensure download process is intuitive and reliable

### Browser Compatibility Testing

- Test PDF generation across major browsers (Chrome, Firefox, Safari, Edge)
- Verify download functionality works consistently
- Test responsive design with new form fields
- Validate accessibility compliance for new inputs

## Implementation Considerations

### Dependencies

- Add jsPDF library for PDF generation
- Consider @types/jspdf for TypeScript support
- Evaluate bundle size impact and optimize if necessary

### Performance

- PDF generation should be fast for typical invoice sizes
- Consider lazy loading jsPDF library to reduce initial bundle size
- Optimize PDF generation for mobile devices

### Accessibility

- Ensure new input fields have proper labels and ARIA attributes
- Maintain keyboard navigation support
- Provide clear error messages for screen readers
- Test with screen reader software

### User Experience

- Maintain consistent styling with existing form elements
- Provide helpful placeholder text and examples
- Show loading state during PDF generation
- Confirm successful PDF download with user feedback