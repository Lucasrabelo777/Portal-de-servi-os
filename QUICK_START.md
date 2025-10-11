# Quick Start Guide - Portal de Serviços

## 🚀 Get Running in 5 Minutes

### Prerequisites
```bash
node --version  # Must be v20.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

### Installation

```bash
# 1. Clone or navigate to project
cd Portal-de-servi-os

# 2. Install dependencies (one time)
npm install

# 3. Run development server
npm run dev
```

Visit: **http://localhost:3000** 🎉

---

## 📖 First Time Setup

If starting from scratch:

```bash
# Create new Next.js project
npx create-next-app@latest portal-de-servicos --typescript --tailwind --app

# Navigate to project
cd portal-de-servicos

# Install all dependencies
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select lucide-react class-variance-authority \
  clsx tailwind-merge @fontsource/geist-sans @fontsource/geist-mono \
  react-hook-form zod date-fns recharts sonner

# Copy project files
# - src/app/page.tsx
# - src/app/biblioteca-gatilhos/page.tsx
# - src/components/ui/* (all UI components)
# - next.config.ts
# - DOCUMENTATION.md

# Run development server
npm run dev
```

---

## 🗂️ Project Overview

### Main Pages
- **`/`** - Home page with category browser
- **`/biblioteca-gatilhos`** - Sales trigger library

### Key Files
- **`src/app/page.tsx`** - Main portal (2300+ lines)
- **`src/components/ui/`** - 40+ reusable components
- **`next.config.ts`** - Next.js configuration
- **`DOCUMENTATION.md`** - Complete documentation

---

## 🎯 Common Tasks

### Add New Product

Edit `src/app/page.tsx`:

```typescript
const categoriesData = {
  'category-key': {
    products: [
      {
        id: 999,
        name: 'New Product Name',
        price: 'R$ 1.000,00',
        costPrice: 'R$ 800,00',
        netValue: 'R$ 200,00',
        description: 'Short description',
        duration: '3 dias',
        people: '2 pessoas',
        includes: ['Item 1', 'Item 2'],
        notIncludes: ['Item 3', 'Item 4'],
        // ... other required fields
      }
    ]
  }
}
```

### Change Category Colors

```typescript
const categoryColors = {
  'category-key': 'from-blue-400 to-blue-500'
}
```

### Add New Trigger

Edit `src/app/biblioteca-gatilhos/page.tsx`:

```typescript
const triggersData = [
  {
    id: 8,
    name: 'New Trigger',
    description: 'Description here',
    icon: IconName,
    link: 'https://example.com',
    color: 'from-blue-100 to-blue-200'
  }
]
```

---

## 🏗️ Build Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📊 Project Stats

- **Framework**: Next.js 15.4.6
- **React**: 19.1.0
- **TypeScript**: Strict mode enabled
- **Components**: 40+ UI components
- **Lines of Code**: 2,300+ in main page
- **Bundle Size**: ~119 KB (First Load JS)
- **Build Time**: ~13 seconds
- **Pages**: 3 static pages

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Build to see all errors
npm run build
```

### Styles Not Applying
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

---

## 📚 Learn More

- **Full Documentation**: See `DOCUMENTATION.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org

---

## 🎓 Key Concepts

### Navigation Flow
```
Home → Category → Product
       ↓
  Trigger Library
```

### Data Structure
```
Categories → Products → Pricing Details
                     → Specialist Library
```

### State Management
```typescript
currentView: 'home' | 'category' | 'product'
selectedCategory: string | null
selectedProduct: Product | null
```

---

## ✅ Checklist for New Developers

- [ ] Node.js 20+ installed
- [ ] npm packages installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Read `DOCUMENTATION.md`
- [ ] Understand category structure
- [ ] Know how to add products
- [ ] Can build successfully (`npm run build`)

---

## 🎨 Customization Tips

### Change Primary Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
}
```

### Update Fonts
Edit `src/lib/fonts.ts`:
```typescript
import '@fontsource/your-font/400.css'
```

### Modify Spacing
Use Tailwind classes:
- `p-4` (16px padding)
- `m-6` (24px margin)
- `gap-3` (12px gap)

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository at https://vercel.com

---

## 📞 Need Help?

1. Check `DOCUMENTATION.md` for detailed info
2. Review inline code comments
3. Inspect working examples in the code
4. Contact the development team

---

**Happy Coding! 🎉**

Version: 1.0.0
Last Updated: October 11, 2025
