# Portal de Serviços - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Data Structure](#data-structure)
4. [Business Logic](#business-logic)
5. [User Interface & User Experience](#user-interface--user-experience)
6. [User Flow](#user-flow)
7. [Features & Functionality](#features--functionality)
8. [Component Breakdown](#component-breakdown)
9. [Styling & Design System](#styling--design-system)
10. [Deployment & Configuration](#deployment--configuration)
11. [Replication Guide](#replication-guide)

---

## Project Overview

### Purpose
The **Portal de Serviços** is a comprehensive service catalog and booking platform designed for SIM7 Travel Agency. It provides a modern, intuitive interface for browsing, searching, and managing travel packages, accommodations, and services in Ceará, Brazil (primarily Fortaleza and Jericoacoara).

### Target Audience
- Travel agents and service providers
- End customers looking for travel packages
- Tour operators managing multiple service categories

### Key Objectives
1. Simplify service discovery through categorized browsing
2. Provide detailed pricing information with seasonal variations
3. Enable quick sharing of service links and marketing materials
4. Offer a visual trigger library for sales conversion
5. Support multi-language marketing materials

---

## Technical Architecture

### Technology Stack

#### Framework & Runtime
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type-safe development
- **Node.js** - Runtime environment

#### Styling & UI Components
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Select, Tabs, Toast, etc.
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **tailwind-merge & clsx** - Utility for merging Tailwind classes

#### Fonts & Typography
- **Geist Sans & Geist Mono** - Primary fonts (via @fontsource)
- **Inter, Roboto, Open Sans** - Additional web fonts
- **Fira Code, JetBrains Mono** - Monospace fonts

#### Additional Libraries
- **@dnd-kit** - Drag and drop functionality
- **react-day-picker** - Date/calendar selection
- **recharts** - Data visualization
- **sonner** - Toast notifications
- **react-hook-form + zod** - Form handling and validation

### Project Structure

```
Portal-de-servi-os/
├── src/
│   ├── app/
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout component
│   │   ├── page.tsx                 # Main portal page (2300+ lines)
│   │   └── biblioteca-gatilhos/     # Trigger library page
│   │       └── page.tsx
│   ├── components/
│   │   └── ui/                      # Reusable UI components
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── sidebar.tsx
│   │       ├── table.tsx
│   │       └── ... (40+ components)
│   ├── hooks/
│   │   ├── use-mobile.ts            # Mobile detection hook
│   │   └── use-toast.ts             # Toast notification hook
│   └── lib/
│       ├── fonts.ts                 # Font configurations
│       └── utils.ts                 # Utility functions (cn)
├── public/
│   └── lasy-bridge.js               # AI integration bridge
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies

```

### Build Configuration

#### next.config.ts
```typescript
- TypeScript config enabled
- ESLint and TypeScript checks enabled in build
- Image optimization for multiple CDN providers:
  - Unsplash, Supabase, Firebase, AWS S3
  - Cloudinary, Vercel Blob, GitHub
  - Support for WebP and AVIF formats
- Optimized package imports (lucide-react, @radix-ui)
```

---

## Data Structure

### Core Types

#### Product Type
```typescript
type Product = {
  id: number;
  name: string;
  price: string;                    // Display price (e.g., "R$ 850,00")
  costPrice: string;                // Cost to provider
  netValue: string;                 // Profit margin
  description: string;              // Short description
  duration: string;                 // Trip duration (e.g., "3 dias")
  people: string;                   // Number of people (e.g., "2 pessoas")
  includes: string[];               // What's included
  notIncludes: string[];            // What's not included
  serviceDescription: string;       // Detailed service description
  aboutService: string;             // About this service
  highlights: string[];             // Key highlights
  importantNotes: string[];         // Important notes
  rules: string[];                  // Service rules
  agenda: string;                   // Day-by-day agenda
  availableDays: string[];          // Days of the week available
  specialistLibrary: {              // Marketing materials
    pdf: string;
    banner1: string;
    banner2: string;
    video1: string;
    bannerEnglish: string;
    bannerSpanish: string;
  };
  pricingDetails?: {                // Optional pricing matrix
    seasons: {
      high: {
        period: string[];           // High season months
        multiplier: number;         // Price multiplier
      };
      low: {
        period: string[];           // Low season months
        multiplier: number;
      };
    };
    accommodationTypes: {
      standard: { name: string; basePrice: number; };
      superior: { name: string; basePrice: number; };
      luxury: { name: string; basePrice: number; };
    };
    occupancy: {
      single: { name: string; multiplier: number; };
      double: { name: string; multiplier: number; };
    };
  };
};
```

### Categories Structure

The application organizes services into 9 main categories:

```typescript
const categoriesData = {
  'pacotes-jericoacoara': {
    name: 'Pacotes Jericoacoara',
    icon: '🏖️',
    products: Product[]
  },
  'pacotes-fortaleza-jericoacoara': {
    name: 'Pacotes Fortaleza x Jericoacoara',
    icon: '🌊',
    products: Product[]
  },
  'pacotes-fortaleza': {
    name: 'Pacotes Fortaleza',
    icon: '🏙️',
    products: Product[]
  },
  'servicos-regulares': {
    name: 'Serviços Regulares',
    icon: '🚌',
    products: Product[]
  },
  'ingressos-atividades': {
    name: 'Ingressos e Atividades',
    icon: '🎢',
    products: Product[]
  },
  'transfers-privativos': {
    name: 'Transfers Privativos',
    icon: '🚗',
    products: Product[]
  },
  'passeios-privativos': {
    name: 'Passeios Privativos',
    icon: '🗺️',
    products: Product[]
  },
  'apenas-hospedagens': {
    name: 'Apenas Hospedagens',
    icon: '🏨',
    products: Product[]
  },
  'outros': {
    name: 'Outros Serviços',
    icon: '✨',
    products: Product[]
  }
};
```

### Category Colors
Each category has a unique gradient color scheme:
- **Pacotes Jericoacoara**: Blue gradient (from-blue-400 to-blue-500)
- **Pacotes Fortaleza x Jeri**: Yellow gradient (from-yellow-400 to-yellow-500)
- **Pacotes Fortaleza**: Orange gradient (from-orange-400 to-orange-500)
- **Serviços Regulares**: Green gradient (from-green-400 to-green-500)
- **Ingressos e Atividades**: Purple gradient (from-purple-400 to-purple-500)
- **Transfers Privativos**: Pink gradient (from-pink-400 to-pink-500)
- **Passeios Privativos**: Amber gradient (from-amber-600 to-amber-700)
- **Apenas Hospedagens**: Teal gradient (from-teal-400 to-teal-500)
- **Outros**: Gray gradient (from-gray-400 to-gray-500)

### Trigger Library Data

```typescript
const triggersData = [
  {
    id: number,
    name: string,              // Trigger name
    description: string,       // Trigger description
    icon: LucideIcon,         // Icon component
    link: string,             // Link to copy
    color: string             // Gradient colors
  }
];
```

7 visual triggers available:
1. **Prestação da empresa** - Company credibility
2. **Gatilho de confiança** - Trust building
3. **Diferenciais da Sim7** - Company differentiators
4. **Cupom de primeira compra** - First purchase coupon
5. **Por que comprar com a Sim7** - Reasons to buy
6. **Recomende no Reclame Aqui** - Reviews and reputation
7. **Nosso Pix** - Payment facilitation

### Notifications Data

```typescript
type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: 'promotion' | 'new-service' | 'tip' | 'update' | 'reminder';
  isNew: boolean;
};
```

---

## Business Logic

### Pricing Logic

#### Package Categories
Three categories have advanced pricing matrices:
- `pacotes-jericoacoara`
- `pacotes-fortaleza-jericoacoara`
- `pacotes-fortaleza`

#### Pricing Calculation Formula
```
Final Price = Base Price × Season Multiplier × Occupancy Multiplier
```

**Example Calculation:**
- Base Price: R$ 850 (Standard accommodation, low season, double occupancy)
- High Season Single: R$ 850 × 1.4 (season) × 1.6 (single) = R$ 1,904
- Low Season Double: R$ 850 × 1.0 × 1.0 = R$ 850

#### Season Definitions
**High Season (40% increase):**
- January
- February
- June 16 - August 31
- December 16 - 31

**Low Season (base price):**
- March - May
- June 1-15
- September - November
- December 1-15

#### Accommodation Types
1. **Standard** (Padrão) - Base price
2. **Superior** - ~40% increase over standard
3. **Luxury** (Luxo) - ~100% increase over standard

#### Occupancy Pricing
- **Single (1 person):** 1.5x - 1.6x multiplier
- **Double (2+ people):** 1.0x multiplier (base)

### Search & Filter Logic

#### Global Search (Home Page)
- Searches across ALL categories and products
- Matches: product name, description, category name
- Case-insensitive
- Real-time results

#### Category Search
- Searches within selected category only
- Text-based filtering
- Price range filtering (R$ 0 - R$ 5,000)
- Day-of-week filtering (for applicable categories)

#### Applicable Categories for Day Filter
- `servicos-regulares`
- `ingressos-atividades`

### Copy-to-Clipboard Functionality

Multiple copy features throughout the app:
1. **Product links** - Copy service URLs
2. **Marketing materials** - Copy PDF, banner, video links
3. **Trigger links** - Copy trigger URLs
4. **Pix information** - Copy payment details

**Implementation:**
```typescript
const copyToClipboard = (link: string, type: string) => {
  navigator.clipboard.writeText(link)
  setCopiedLink(`${type}-${product.id}`)
  setTimeout(() => setCopiedLink(''), 2000)  // 2-second feedback
}
```

---

## User Interface & User Experience

### Design Principles

1. **Visual Hierarchy**
   - Clear category distinctions with color coding
   - Gradient color bars on cards
   - Progressive disclosure of information

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
   - Touch-friendly tap targets
   - Adaptive layouts

3. **Micro-interactions**
   - Hover effects on cards (scale, shadow, translate)
   - Button state changes
   - Smooth transitions (duration-200 to duration-300)
   - Loading states and feedback

4. **Accessibility**
   - Semantic HTML
   - Keyboard navigation support
   - ARIA labels where needed
   - Color contrast compliance

### Color System

#### Background Gradients
- **Main Background**: `from-gray-50 to-blue-50`
- **Cards**: White with subtle shadows
- **Accent Colors**: Category-specific gradients

#### Status Colors
- **Success/Green**: Confirmations, included items
- **Error/Red**: Warnings, not included items
- **Warning/Yellow**: Highlights, important info
- **Info/Blue**: General information
- **Neutral/Gray**: Secondary information

### Typography

#### Font Families
- **Primary**: Geist Sans
- **Monospace**: Geist Mono, Fira Code, JetBrains Mono
- **Fallback**: Inter, Roboto, Open Sans

#### Text Sizes (Responsive)
```
Headings:
- H1: text-xl sm:text-2xl md:text-3xl (20px → 24px → 30px)
- H2: text-lg sm:text-xl md:text-2xl (18px → 20px → 24px)
- H3: text-base sm:text-lg md:text-xl (16px → 18px → 20px)

Body:
- Default: text-sm sm:text-base (14px → 16px)
- Small: text-xs sm:text-sm (12px → 14px)
```

### Spacing System

Padding and margins use Tailwind's spacing scale:
- **Compact**: p-3, p-4
- **Default**: p-4 sm:p-6
- **Spacious**: p-4 sm:p-6 md:p-8

### Component Patterns

#### Card Pattern
```tsx
<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 cursor-pointer 
                transform hover:scale-105 hover:-translate-y-2 
                border border-gray-100 overflow-hidden">
  {/* Color bar */}
  <div className="h-2 bg-gradient-to-r {categoryColor}" />
  
  {/* Content */}
  <div className="p-4 sm:p-6">
    {/* Card content */}
  </div>
</div>
```

#### Button Variants
1. **Primary**: Blue gradient background
2. **Secondary**: Gray background
3. **Success**: Green background (copied state)
4. **Outline**: Border with transparent background
5. **Ghost**: No background, hover effect only

---

## User Flow

### Flow Diagram

```
START
  │
  ├─► Home Page
  │     │
  │     ├─► Global Search → Search Results → Product Details
  │     │
  │     ├─► Select Category → Category Page
  │     │                          │
  │     │                          ├─► Category Search
  │     │                          ├─► Apply Filters
  │     │                          └─► Select Product → Product Details
  │     │
  │     └─► View Notifications → Notification Popup
  │
  ├─► Biblioteca de Gatilhos (Trigger Library)
  │     │
  │     └─► Copy Trigger Link → Clipboard
  │
  └─► Product Details Page
        │
        ├─► View Pricing Matrix
        ├─► View Specialist Library
        ├─► Copy Marketing Materials
        └─► Back to Category/Home
```

### Detailed User Journeys

#### Journey 1: Browse and Find a Package
```
1. User lands on Home Page
2. Sees 9 category cards with icons and descriptions
3. Clicks on "Pacotes Jericoacoara" card
4. Navigated to Category Page
5. Sees 3+ packages with prices and descriptions
6. Uses price filter to narrow options (R$ 500 - R$ 2000)
7. Clicks on "Jericoacoara 3 dias / 2 noites"
8. Views full product details:
   - Description and pricing
   - What's included/not included
   - Highlights and important notes
   - Pricing matrix (seasonal variations)
   - Specialist library (marketing materials)
9. Copies PDF link for client
10. Returns to category or home
```

#### Journey 2: Search for Specific Service
```
1. User on Home Page
2. Types "transfer" in search bar
3. Real-time results show matching services across categories
4. Clicks on a transfer service from results
5. Views product details
6. Copies service link to share
7. Returns to home
```

#### Journey 3: Access Sales Triggers
```
1. User clicks "Biblioteca de Gatilhos" button
2. Navigated to Triggers Page
3. Sees 7 trigger cards with descriptions
4. Clicks "Copiar Link" on desired trigger
5. Link copied to clipboard
6. Success feedback shown (green button, "Copiado!")
7. Can share link via WhatsApp, email, etc.
8. Returns to portal
```

#### Journey 4: View Pricing Variations
```
1. User viewing a package product
2. Scrolls to "Detalhes de Precificação" section
3. Sees seasonal information:
   - High season months
   - Low season months
4. Views accommodation types (Standard, Superior, Luxury)
5. For each type, sees prices for:
   - Low season single/double
   - High season single/double
6. Each price has associated specialist library links
7. Copies desired marketing material
```

### Navigation Patterns

#### Primary Navigation
- **Back Button**: Top-left on all non-home pages
- **Breadcrumb**: Not implemented (single-level navigation)
- **Search Bar**: Prominent on home page

#### Secondary Navigation
- **Notifications Bell**: Top-right corner
- **Category Cards**: Grid layout on home
- **Product Cards**: Grid layout on category pages

#### State Management
- `currentView`: Controls which view is rendered
  - `'home'`: Main landing page
  - `'category'`: Category listing page
  - `'product'`: Product details page
  - `'triggers'`: Not used (separate route)

---

## Features & Functionality

### 1. Multi-View Portal System

**Views:**
- **Home View**: Category browser with global search
- **Category View**: Filtered products by category with advanced filters
- **Product View**: Detailed product information with pricing matrix

### 2. Advanced Search System

**Global Search Features:**
- Real-time search across all categories
- Searches product names, descriptions, category names
- Case-insensitive matching
- Results show category badge
- Click result to view product details

**Category Search Features:**
- Text search within category
- Price range slider (R$ 0 - R$ 5,000)
- Day-of-week filter (for applicable categories)
- Filter reset functionality

### 3. Pricing Matrix System

**For Package Categories Only:**
- Seasonal pricing (high/low season)
- Accommodation type variations (3 levels)
- Occupancy pricing (single/double)
- Automatic calculation display
- Associated specialist library for each variation

### 4. Specialist Library

**Marketing Materials Available:**
- **PDF**: Detailed service information
- **Banner 1**: Primary promotional banner
- **Banner 2**: Secondary promotional banner
- **Video 1**: Service showcase video
- **English Banner**: International marketing
- **Spanish Banner**: International marketing

**Functionality:**
- One-click copy links
- Visual feedback (icon change + green color)
- 2-second auto-reset
- Organized by material type

### 5. Visual Triggers Library

**Separate Page (`/biblioteca-gatilhos`):**
- 7 psychological triggers
- Each with icon, name, description
- Copy link functionality
- Usage instructions
- Sharing platform suggestions

### 6. Notifications System

**Notification Types:**
- Promotions
- New services
- Tips
- Updates
- Reminders

**Features:**
- Bell icon with new indicator
- Popup modal display
- Categorized by type
- Date stamped
- Color-coded badges

### 7. Expandable Text Components

**ExpandableText Component:**
- Shows first 200 characters
- "Ver mais" button to expand
- "Ver menos" button to collapse
- Smooth transition
- Used for long descriptions

### 8. Copy-to-Clipboard System

**Implementation Throughout:**
- Product links
- Marketing material URLs
- Trigger links
- Visual feedback (icon change, color change)
- Automatic reset after 2 seconds

### 9. Responsive Grid Layouts

**Adaptive Columns:**
- **Mobile (default)**: 1 column
- **Tablet (sm: 640px)**: 2 columns
- **Desktop (lg: 1024px)**: 3 columns
- **Large Desktop (xl: 1280px)**: 4 columns

### 10. Filter System

**Price Range Filter:**
- Slider component
- Min: R$ 0, Max: R$ 5,000
- Real-time filtering
- Visual indicator of selected range

**Day Selection Filter:**
- Multi-select checkboxes
- 7 days of week
- Only for applicable categories
- Clear all option

---

## Component Breakdown

### Page Components

#### src/app/page.tsx (Main Portal)

**State Management:**
```typescript
- currentView: 'home' | 'category' | 'product'
- selectedCategory: string | null
- selectedProduct: Product | null
- searchTerm: string
- categorySearchTerm: string
- copiedTrigger: string
- showNotifications: boolean
- showFilters: boolean
- priceRange: [number, number]
- selectedDays: string[]
```

**Sub-Components:**
1. **ExpandableText** - Expandable text with show more/less
2. **SpecialistLibrarySection** - Marketing materials display and copy
3. **PricingDetails** - Pricing matrix for package categories
4. **NotificationsPopup** - Notifications modal

**Key Functions:**
```typescript
- searchResults: useMemo - Global search functionality
- extractPrice: (priceString) => number - Parse price strings
- getCategorySearchResults: () => Product[] - Category filtering
- handleCategoryClick: (categoryKey) => void - Navigate to category
- handleProductClick: (product, categoryKey?) => void - Navigate to product
- handleBackToHome: () => void - Reset to home view
- copyTriggerLink: (link, triggerId) => void - Copy to clipboard
- toggleDay: (day) => void - Toggle day filter
```

#### src/app/biblioteca-gatilhos/page.tsx

**State:**
```typescript
- copiedTrigger: string | number - Track copied trigger
```

**Features:**
- Static trigger data (7 triggers)
- Copy link functionality
- Usage instructions
- Platform sharing suggestions

### UI Components (src/components/ui/)

#### Core Components
1. **Button** - Multiple variants (default, outline, ghost, etc.)
2. **Card** - Container with header, content, footer
3. **Input** - Form input with label
4. **Select** - Dropdown select with Radix UI
5. **Dialog** - Modal dialogs
6. **Popover** - Floating popovers
7. **Toast** - Notification toasts
8. **Tabs** - Tabbed interfaces
9. **Table** - Data tables
10. **Accordion** - Collapsible sections

#### Advanced Components
11. **Calendar** - Date picker with react-day-picker
12. **Sidebar** - Collapsible navigation sidebar
13. **Carousel** - Image/content carousel
14. **Chart** - Data visualization with recharts
15. **Command** - Command palette (cmdk)
16. **Navigation Menu** - Complex navigation
17. **Pagination** - Page navigation
18. **Resizable** - Resizable panels

### Utility Components

#### lib/utils.ts
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- Merges Tailwind classes
- Handles conditional classes
- Prevents class conflicts

#### hooks/use-mobile.ts
```typescript
export function useMobile() {
  // Detects if viewport is mobile size
  // Returns boolean
}
```

#### hooks/use-toast.ts
```typescript
export function useToast() {
  // Toast notification management
  // Returns { toast, dismiss, toasts }
}
```

---

## Styling & Design System

### Tailwind Configuration

#### Custom Colors
```javascript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  muted: "hsl(var(--muted))",
  accent: "hsl(var(--accent))",
  destructive: "hsl(var(--destructive))",
  // ... more color tokens
}
```

#### Border Radius
```javascript
borderRadius: {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)"
}
```

### Global Styles (src/app/globals.css)

#### CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --radius: 0.5rem;
}

.dark {
  /* Dark mode variables */
}
```

#### Tailwind Layers
```css
@layer base {
  /* Base styles */
}

@layer components {
  /* Component styles */
}

@layer utilities {
  /* Utility classes */
}
```

### Animation System

#### Hover Animations
```css
.card-hover {
  @apply hover:shadow-2xl hover:scale-105 hover:-translate-y-2;
  @apply transition-all duration-300;
}
```

#### State Transitions
```css
.button-transition {
  @apply transition-colors duration-200;
}
```

### Responsive Breakpoints

```
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Small desktops
xl: 1280px  - Large desktops
2xl: 1536px - Extra large desktops
```

---

## Deployment & Configuration

### Environment Setup

#### Required Node Version
```json
"engines": {
  "node": ">=20.0.0"
}
```

#### Package Manager
- npm (recommended)
- pnpm or yarn also supported

### Build Process

#### Development
```bash
npm run dev
# Runs on http://localhost:3000
# With Turbopack for fast refresh
```

#### Production Build
```bash
npm run build
# Compiles TypeScript
# Runs ESLint
# Optimizes for production
# Generates static pages
```

#### Start Production Server
```bash
npm run start
# Serves optimized build
```

### Configuration Files

#### next.config.ts
```typescript
{
  eslint: {
    ignoreDuringBuilds: false  // ✓ Enabled
  },
  typescript: {
    ignoreBuildErrors: false    // ✓ Enabled
  },
  images: {
    remotePatterns: [...]       // Multiple CDN support
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  }
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Deployment Platforms

#### Recommended: Vercel
1. Connect GitHub repository
2. Auto-detects Next.js
3. Automatic deployments on push
4. Environment variables in dashboard
5. Edge functions support

#### Alternative: Netlify, AWS Amplify, etc.
- Build command: `npm run build`
- Output directory: `.next`
- Node version: 20.x

### Environment Variables

No environment variables currently required, but can add:
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ANALYTICS_ID=
DATABASE_URL=
```

---

## Replication Guide

### Step-by-Step Setup

#### 1. Prerequisites
```bash
# Install Node.js 20+
node --version  # Should be v20.0.0 or higher

# Install npm
npm --version
```

#### 2. Clone/Create Project
```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest portal-de-servicos --typescript --tailwind --app

# Or clone existing repository
git clone <repository-url>
cd portal-de-servicos
```

#### 3. Install Dependencies
```bash
npm install

# Core dependencies
npm install next@15.4.6 react@19.1.0 react-dom@19.1.0
npm install typescript @types/node @types/react @types/react-dom

# UI Components
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-tooltip
# ... (see package.json for complete list)

# Styling
npm install tailwindcss postcss autoprefixer
npm install tailwind-merge clsx class-variance-authority

# Fonts
npm install @fontsource/geist-sans @fontsource/geist-mono
npm install @fontsource/inter @fontsource/roboto

# Icons
npm install lucide-react

# Forms
npm install react-hook-form @hookform/resolvers zod

# Utilities
npm install date-fns recharts sonner

# Dev dependencies
npm install -D @tailwindcss/postcss eslint eslint-config-next
```

#### 4. Project Structure Setup
```bash
# Create directories
mkdir -p src/app/biblioteca-gatilhos
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p public
```

#### 5. Configuration Files

**Create next.config.ts:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      // Add more as needed
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
```

**Create tailwind.config.ts:**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... add all color tokens
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

#### 6. Core Files

**src/lib/utils.ts:**
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**src/lib/fonts.ts:**
```typescript
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'
// ... add more fonts
```

#### 7. Copy UI Components
Copy all component files from `src/components/ui/` directory. These are standard shadcn/ui components adapted for the project.

#### 8. Main Application Files

**src/app/layout.tsx:**
```typescript
import type { Metadata } from "next";
import "./globals.css";
import "../lib/fonts";

export const metadata: Metadata = {
  title: "Portal de Serviços",
  description: "Catálogo de serviços e pacotes de viagem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

**src/app/page.tsx:**
Copy the complete main portal page (2300+ lines). This contains:
- All type definitions
- Category data
- Product data
- Search and filter logic
- All view components
- Main Portal component

**src/app/biblioteca-gatilhos/page.tsx:**
Copy the trigger library page.

#### 9. Global Styles

**src/app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    /* ... all CSS variables */
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}
```

#### 10. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

#### 11. Build for Production
```bash
npm run build
npm run start
```

### Customization Guide

#### Adding New Products
In `src/app/page.tsx`, add to appropriate category:

```typescript
const categoriesData = {
  'category-key': {
    name: 'Category Name',
    icon: '🎯',
    products: [
      {
        id: 999,
        name: 'New Product',
        price: 'R$ 1.000,00',
        // ... all required fields
      }
    ]
  }
}
```

#### Adding New Categories
1. Add to `categoryColors` object
2. Add to `categoryDescriptions` object
3. Add to `categoryPageDescriptions` object
4. Add to `categoriesData` object with products
5. Optionally add to `packageCategories` if has pricing matrix

#### Changing Colors
Update in `categoryColors` object using Tailwind gradient classes:
```typescript
'new-category': 'from-color-400 to-color-500'
```

#### Adding New Triggers
In `src/app/biblioteca-gatilhos/page.tsx`:
```typescript
const triggersData = [
  {
    id: 8,
    name: 'New Trigger',
    description: 'Description',
    icon: IconName,
    link: 'https://example.com/trigger',
    color: 'from-color-100 to-color-200'
  }
]
```

### Data Migration

To connect to real API/Database:

1. **Create API routes:**
```typescript
// src/app/api/products/route.ts
export async function GET() {
  const data = await fetchFromDatabase();
  return Response.json(data);
}
```

2. **Replace static data with API calls:**
```typescript
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(setProducts);
}, []);
```

3. **Add loading states:**
```typescript
const [loading, setLoading] = useState(true);
```

4. **Error handling:**
```typescript
try {
  const data = await fetchData();
} catch (error) {
  console.error('Failed to fetch:', error);
}
```

---

## Best Practices & Maintenance

### Code Quality

1. **TypeScript Strict Mode**
   - All types defined
   - No `any` types (except where necessary)
   - Proper type inference

2. **ESLint Rules**
   - Follow Next.js recommended config
   - No console warnings in production
   - Consistent code style

3. **Component Organization**
   - One component per file
   - Reusable components in `components/ui/`
   - Page-specific components in page files

### Performance

1. **Image Optimization**
   - Use Next.js Image component
   - Define remote patterns
   - Lazy loading enabled

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting automatic

3. **Memoization**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for callbacks

### Security

1. **Input Sanitization**
   - Validate user inputs
   - Use zod for schema validation

2. **XSS Prevention**
   - React escapes by default
   - Be careful with `dangerouslySetInnerHTML`

3. **HTTPS Only**
   - All external resources over HTTPS
   - Enforce in production

### Testing

Add testing (not currently implemented):

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest
```

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import Page from './page';

test('renders portal title', () => {
  render(<Page />);
  expect(screen.getByText(/Portal de Serviços/i)).toBeInTheDocument();
});
```

### Monitoring

Add analytics:
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### Common Issues

#### Build Errors

**Issue**: TypeScript errors during build
```
Solution:
1. Check all types are defined
2. Run: npm run build
3. Fix reported errors
4. Ensure next.config.ts has ignoreBuildErrors: false
```

**Issue**: Module not found
```
Solution:
1. Check import paths
2. Verify package is installed
3. Check tsconfig.json paths config
4. Restart dev server
```

#### Runtime Errors

**Issue**: Hydration mismatch
```
Solution:
1. Ensure server and client render same content
2. Don't use random values or Date in initial render
3. Use useEffect for client-only code
```

**Issue**: useState not updating
```
Solution:
1. Don't mutate state directly
2. Use functional updates: setState(prev => ...)
3. Check for proper dependencies in useEffect
```

### Debug Mode

Enable debug logging:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

---

## Appendix

### Complete Product Example

```typescript
{
  id: 1,
  name: 'Jericoacoara 3 dias / 2 noites',
  price: 'R$ 850,00',
  costPrice: 'R$ 680,00',
  netValue: 'R$ 170,00',
  description: 'Pacote completo com hospedagem em pousada, café da manhã e transfer',
  duration: '3 dias',
  people: '2 pessoas',
  includes: [
    'Hospedagem',
    'Café da manhã',
    'Transfer ida/volta'
  ],
  notIncludes: [
    'Almoço e jantar',
    'Passeios opcionais',
    'Bebidas alcoólicas',
    'Seguro viagem'
  ],
  serviceDescription: 'Este pacote foi desenvolvido para quem deseja conhecer as belezas de Jericoacoara com conforto e praticidade...',
  aboutService: 'Pacote ideal para casais ou amigos que buscam uma experiência autêntica em Jeri...',
  highlights: [
    'Pousada no centro de Jeri',
    'Transfer em veículo 4x4',
    'Café da manhã regional',
    'Suporte 24h'
  ],
  importantNotes: [
    'Check-in a partir das 14h',
    'Check-out até 12h',
    'Documentos obrigatórios',
    'Confirmação 48h antes'
  ],
  rules: [
    'Não é permitido fumar nos quartos',
    'Animais não são permitidos',
    'Respeitar horário de silêncio (22h às 7h)',
    'Danos serão cobrados à parte'
  ],
  agenda: 'Dia 1: Chegada em Jericoacoara, check-in na pousada e tempo livre...',
  availableDays: [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
  ],
  specialistLibrary: {
    pdf: 'https://exemplo.com/jeri-3dias-detalhes.pdf',
    banner1: 'https://exemplo.com/banner-jeri-promocional.jpg',
    banner2: 'https://exemplo.com/banner-jeri-hospedagem.jpg',
    video1: 'https://exemplo.com/video-jeri-experiencia.mp4',
    bannerEnglish: 'https://exemplo.com/banner-jeri-english.jpg',
    bannerSpanish: 'https://exemplo.com/banner-jeri-spanish.jpg'
  },
  pricingDetails: {
    seasons: {
      high: {
        period: ['Janeiro', 'Fevereiro', '16 de junho a agosto', '16 de dezembro'],
        multiplier: 1.4
      },
      low: {
        period: ['Março', 'Abril', 'Maio', 'Até 15 de junho', 'Setembro', 'Outubro', 'Novembro', 'Até 15 de dezembro'],
        multiplier: 1.0
      }
    },
    accommodationTypes: {
      standard: { name: 'Padrão', basePrice: 850 },
      superior: { name: 'Superior', basePrice: 1200 },
      luxury: { name: 'Luxo', basePrice: 1800 }
    },
    occupancy: {
      single: { name: 'Single (1 pessoa)', multiplier: 1.6 },
      double: { name: 'A partir de 2 pessoas', multiplier: 1.0 }
    }
  }
}
```

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Package Management
npm install              # Install dependencies
npm update               # Update packages
npm outdated             # Check for outdated packages
npm audit                # Security audit
npm audit fix            # Fix vulnerabilities

# Git
git status               # Check status
git add .                # Stage changes
git commit -m "message"  # Commit
git push                 # Push to remote

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

### Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com
- **Lucide Icons**: https://lucide.dev
- **TypeScript**: https://www.typescriptlang.org

---

## Conclusion

This documentation provides a complete guide to understanding, maintaining, and replicating the Portal de Serviços application. The modular architecture, comprehensive type system, and well-organized component structure make it easy to extend and customize for specific business needs.

Key takeaways:
- ✅ Built with modern Next.js 15 and React 19
- ✅ Fully typed with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Comprehensive product catalog system
- ✅ Advanced pricing matrix for packages
- ✅ Marketing materials management
- ✅ Visual trigger library for sales
- ✅ Real-time search and filtering
- ✅ Copy-to-clipboard functionality throughout
- ✅ Optimized for production deployment

For questions or support, refer to the inline code comments and this documentation.

**Version**: 1.0.0
**Last Updated**: October 11, 2025
**Maintained By**: Development Team
