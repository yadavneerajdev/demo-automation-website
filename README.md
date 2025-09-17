# Automation Testing Website

A comprehensive website designed specifically for Selenium automation testing practice. Built with Next.js, TypeScript, and Tailwind CSS following SOLID principles for maintainable and reusable code architecture.

## 🚀 Features

### 🔧 Technical Architecture

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **SOLID Principles** implementation
- **Reusable component architecture**
- **Custom hooks and utilities**
- **Service layer abstraction**

### 📱 Testing Sections

1. **Forms** (`/forms`)

   - Text inputs with validation
   - Email, phone, number inputs
   - Select dropdowns
   - Checkboxes and radio buttons
   - File uploads
   - Date and color pickers
   - Range sliders
   - Form validation and error handling

2. **Tables & Data** (`/tables`)

   - Sortable columns
   - Search functionality
   - Filtering by status/role
   - Pagination
   - Row selection (single/bulk)
   - Bulk actions
   - CSV export
   - Responsive design

3. **Modals & Dialogs** (`/modals`)

   - Confirmation dialogs
   - Information modals
   - Form modals
   - Alert dialogs
   - Toast notifications
   - Nested modals
   - Loading states

4. **Authentication** (`/auth`)

   - Login form
   - Registration form
   - Password reset
   - Form validation
   - Tab navigation
   - Demo credentials provided

5. **E-commerce** (`/shop`) - _Planned_

   - Product listings
   - Shopping cart
   - Checkout process
   - Payment forms

6. **Interactive Elements** (`/interactive`) - _Planned_
   - Drag & drop
   - Sliders
   - File uploads
   - Dynamic content

## 🛠️ SOLID Principles Implementation

### Single Responsibility Principle (SRP)

- Each component has one clear purpose
- Separate validation, formatting, and storage utilities
- Dedicated service classes for API calls

### Open/Closed Principle (OCP)

- Extensible component interfaces
- Configurable form validation rules
- Pluggable service implementations

### Liskov Substitution Principle (LSP)

- Consistent component prop interfaces
- Interchangeable service implementations
- Type-safe component variants

### Interface Segregation Principle (ISP)

- Focused component prop interfaces
- Separate concerns in type definitions
- Specific hook interfaces

### Dependency Inversion Principle (DIP)

- Abstract service base classes
- Dependency injection patterns
- Mock data services for testing

## 🏗️ Project Structure

```
automation-testing-website/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── forms/               # Forms testing page
│   ├── tables/              # Tables & data page
│   ├── modals/              # Modals & dialogs page
│   ├── auth/                # Authentication page
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utility functions
│   ├── utils.ts             # Core utilities
│   ├── utils-extended.ts    # Extended utilities
│   └── validators.ts        # Form validation
├── hooks/                   # Custom React hooks
│   └── index.ts             # Hook implementations
├── services/                # API and data services
│   └── index.ts             # Service classes
├── types/                   # TypeScript definitions
│   └── index.ts             # Type definitions
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd automation-testing-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing Elements

### Consistent Selectors

All interactive elements include comprehensive test attributes:

- `data-testid` attributes for reliable element selection
- Semantic HTML structure
- Consistent ID and class naming conventions
- ARIA labels for accessibility

### Common Test Scenarios

#### Forms Testing

- Field validation (required, email, length, etc.)
- Form submission flows
- Error message display
- File upload handling
- Dynamic form interactions

#### Table Testing

- Column sorting
- Search and filtering
- Pagination navigation
- Row selection
- Bulk operations
- Data export

#### Modal Testing

- Modal opening/closing
- Form interactions within modals
- Confirmation workflows
- Toast notification handling
- Keyboard navigation (ESC key)

#### Authentication Testing

- Login/logout flows
- Form validation
- Tab navigation
- Remember me functionality
- Password reset flow

## 🎯 Demo Credentials

For testing the authentication flow:

- **Email:** demo@example.com
- **Password:** password123

## 🔧 Configuration

### Tailwind CSS

Custom design system with consistent colors, spacing, and components.

### TypeScript

Strict type checking enabled with comprehensive type definitions.

### ESLint

Code quality rules configured for TypeScript and Next.js.

## 📚 Components Documentation

### Custom Hooks

- `useLocalStorage` - Local storage state management
- `useModal` - Modal state management
- `useApiCall` - API request handling
- `useTableState` - Table functionality
- `useDebounce` - Debounced values
- `useClipboard` - Clipboard operations

### Utility Classes

- `FormValidator` - Form validation logic
- `DataFormatter` - Data formatting utilities
- `StorageUtils` - Local storage operations
- `ArrayUtils` - Array manipulation helpers

### Service Classes

- `BaseApiService` - Abstract API service
- `AuthService` - Authentication operations
- `ProductService` - Product data handling
- `MockDataService` - Test data generation

## 🤝 Contributing

1. Follow SOLID principles
2. Add comprehensive TypeScript types
3. Include data-testid attributes
4. Write meaningful component documentation
5. Test all interactive elements

## 📄 License

MIT License - feel free to use this project for your automation testing practice!

## 🎉 Happy Testing!

This website provides a comprehensive environment for practicing Selenium automation testing with real-world scenarios and consistent, reliable selectors.
