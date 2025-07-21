# Crypto Invoice Generator

A modern, professional cryptocurrency invoice generator built with React and TypeScript. Create, preview, and download crypto invoices with support for any cryptocurrency and blockchain network.

![Crypto Invoice Generator](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## Features

- **🚀 Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **💰 Multi-Currency Support**: Input any cryptocurrency symbol (BTC, ETH, ADA, etc.)
- **🌐 Blockchain Network Specification**: Specify the blockchain network for payments
- **📄 PDF Export**: Generate professional PDF invoices with one click
- **👀 Live Preview**: Real-time invoice preview as you type
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Professional Styling**: Clean, modern design with proper typography
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## Technologies Used

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **PDF Generation**: jsPDF for client-side PDF creation
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Development**: ESLint, TypeScript ESLint

## Installation

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-invoice-generator
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install

   # Using bun
   bun install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev

   # Using bun
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## Usage

### Creating an Invoice

1. **Fill in recipient details**:
   - Recipient name (required)
   - Recipient email (optional)

2. **Specify payment details**:
   - Amount (required)
   - Currency symbol (e.g., BTC, ETH, ADA)
   - Blockchain network (e.g., Bitcoin, Ethereum, Polygon)

3. **Add payment information**:
   - Your wallet address (required)
   - Description (optional)

4. **Generate and download**:
   - Click "Generate Invoice" to preview
   - Click "Download PDF" to save as PDF

### Example Invoice Data

```typescript
{
  recipientName: "John Doe",
  recipientEmail: "john@example.com",
  amount: "0.05",
  currency: "BTC",
  blockchainNetwork: "Bitcoin",
  description: "Web development services",
  walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
}
```

## Project Structure

```
crypto-invoice-generator/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles and Tailwind imports
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type definitions
├── .kiro/                 # Kiro AI assistant configuration
│   ├── specs/             # Feature specifications
│   └── steering/          # AI steering rules
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md             # This file
```

## Key Components

### InvoiceData Interface

```typescript
interface InvoiceData {
  recipientName: string
  recipientEmail: string
  amount: string
  currency: string
  blockchainNetwork: string
  description: string
  walletAddress: string
}
```

### PDF Generation

The application uses jsPDF to generate professional PDF invoices with:
- Professional formatting and typography
- Proper text wrapping for long wallet addresses
- Invoice numbering system
- Clean layout with consistent margins

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier-compatible formatting
- Consistent component structure

### Adding New Features

1. Create feature specifications in `.kiro/specs/`
2. Implement components in `src/components/`
3. Update types and interfaces as needed
4. Add tests for new functionality
5. Update documentation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI components when possible
- Maintain responsive design principles
- Add proper error handling
- Write clear commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- PDF generation with [jsPDF](https://github.com/parallax/jsPDF)

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Made with ❤️ for the crypto community**
