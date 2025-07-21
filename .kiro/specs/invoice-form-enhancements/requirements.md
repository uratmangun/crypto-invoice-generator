# Requirements Document

## Introduction

This feature enhances the existing crypto invoice generator by improving the currency input flexibility, adding blockchain network selection, and implementing PDF download functionality. These improvements will provide users with more customization options and the ability to export their invoices as professional PDF documents.

## Requirements

### Requirement 1

**User Story:** As a user creating crypto invoices, I want to input custom currency symbols instead of selecting from a predefined dropdown, so that I can support any cryptocurrency or token.

#### Acceptance Criteria

1. WHEN the user views the invoice form THEN the system SHALL display a currency input field instead of a dropdown
2. WHEN the user types in the currency field THEN the system SHALL accept any alphanumeric currency symbol
3. WHEN the user generates an invoice THEN the system SHALL display the custom currency symbol in the invoice preview
4. WHEN the currency field is empty THEN the system SHALL default to "BTC" as the currency symbol

### Requirement 2

**User Story:** As a user creating crypto invoices, I want to specify the blockchain network for the payment, so that recipients know which network to use for the transaction.

#### Acceptance Criteria

1. WHEN the user views the invoice form THEN the system SHALL display a blockchain network input field
2. WHEN the user types in the network field THEN the system SHALL accept any network name (e.g., "Ethereum", "Bitcoin", "Polygon")
3. WHEN the user generates an invoice THEN the system SHALL display the blockchain network in the invoice preview
4. WHEN the network field is empty THEN the system SHALL display "Not specified" in the invoice preview
5. WHEN the user selects a common network THEN the system SHOULD provide autocomplete suggestions for popular networks

### Requirement 3

**User Story:** As a user who has generated an invoice, I want to download it as a PDF file, so that I can save, print, or share it professionally.

#### Acceptance Criteria

1. WHEN an invoice is generated and displayed THEN the system SHALL show an enabled "Download PDF" button
2. WHEN the user clicks the "Download PDF" button THEN the system SHALL generate a PDF version of the invoice
3. WHEN the PDF is generated THEN the system SHALL automatically download the file to the user's device
4. WHEN the PDF is created THEN it SHALL contain all invoice information including recipient details, amount, currency, network, description, and wallet address
5. WHEN the PDF is created THEN it SHALL have professional formatting with proper spacing and typography
6. WHEN no invoice is generated THEN the "Download PDF" button SHALL be disabled or hidden