# Portal de Serviços - SIM7 Travel Agency

A comprehensive service catalog and booking platform for travel packages, accommodations, and services in Ceará, Brazil.

## 🚀 Features

- **Multi-Category Service Browser** - 9 distinct service categories with color-coded cards
- **Advanced Search & Filters** - Global search, category search, price range, and day filters
- **Dynamic Pricing Matrix** - Seasonal pricing with accommodation types and occupancy variations
- **Marketing Materials Library** - PDF, banners, videos in multiple languages
- **Visual Triggers Library** - 7 psychological sales triggers with copy-to-clipboard
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Real-time Feedback** - Instant copy confirmations and state updates

## 🛠️ Tech Stack

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type-safe development
- **Tailwind CSS 4.x** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Main portal (2300+ lines)
│   ├── biblioteca-gatilhos/      # Trigger library
│   └── layout.tsx                # Root layout
├── components/
│   └── ui/                       # 40+ reusable components
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
└── lib/
    ├── fonts.ts
    └── utils.ts
```

## 🎯 Key Pages

### Home Page (`/`)
- 9 service categories
- Global search functionality
- Notifications popup
- Category navigation

### Category Pages
- Filtered product listings
- Price range filter
- Day-of-week filter
- Real-time search

### Product Details
- Complete service information
- Pricing matrix (for packages)
- Specialist library materials
- Copy-to-clipboard links

### Trigger Library (`/biblioteca-gatilhos`)
- 7 sales triggers
- One-click link copying
- Usage instructions

## 📊 Data Structure

### Categories
1. **Pacotes Jericoacoara** 🏖️ - Blue gradient
2. **Pacotes Fortaleza x Jericoacoara** 🌊 - Yellow gradient
3. **Pacotes Fortaleza** 🏙️ - Orange gradient
4. **Serviços Regulares** 🚌 - Green gradient
5. **Ingressos e Atividades** 🎢 - Purple gradient
6. **Transfers Privativos** 🚗 - Pink gradient
7. **Passeios Privativos** 🗺️ - Amber gradient
8. **Apenas Hospedagens** 🏨 - Teal gradient
9. **Outros Serviços** ✨ - Gray gradient

### Product Schema
```typescript
{
  id: number
  name: string
  price: string
  description: string
  includes: string[]
  notIncludes: string[]
  highlights: string[]
  pricingDetails?: {
    seasons: { high, low }
    accommodationTypes: { standard, superior, luxury }
    occupancy: { single, double }
  }
  specialistLibrary: {
    pdf, banner1, banner2, video1
    bannerEnglish, bannerSpanish
  }
}
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradients
- **Success**: Green
- **Warning**: Yellow/Amber
- **Error**: Red
- **Neutral**: Gray

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Responsive**: Scales from mobile to desktop

### Spacing
- Mobile: `p-3`, `p-4`
- Tablet: `sm:p-6`
- Desktop: `md:p-8`

## 🔧 Configuration

### Next.js (next.config.ts)
```typescript
{
  eslint: { ignoreDuringBuilds: false },      // ✓ Enabled
  typescript: { ignoreBuildErrors: false },    // ✓ Enabled
  images: { remotePatterns: [...] },           // Multiple CDN support
  experimental: { optimizePackageImports }     // Performance optimization
}
```

### TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "strict": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

## 📈 Build Status

✅ **TypeScript**: Strict mode enabled, all types defined
✅ **ESLint**: All checks passing
✅ **Build**: Successful compilation
✅ **Bundle Size**: Main page ~119 KB (First Load JS)

## 🚀 Deployment

### Recommended: Vercel
```bash
vercel
```

### Alternative Platforms
- Netlify
- AWS Amplify
- Railway
- Render

Build command: `npm run build`
Output directory: `.next`

## 📚 Documentation

For comprehensive documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

Topics covered:
- Complete architecture overview
- Data structure details
- Business logic explanation
- UI/UX patterns
- Component breakdown
- User flow diagrams
- Replication guide

## 🛡️ Best Practices

- ✅ Type-safe with TypeScript
- ✅ Responsive design
- ✅ Accessible UI components
- ✅ Optimized images
- ✅ Code splitting
- ✅ Memoized calculations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is proprietary software for SIM7 Travel Agency.

## 👥 Contact

For questions or support, please contact the development team.

---

**Version**: 1.0.0
**Last Updated**: October 11, 2025
**Node Version**: ≥20.0.0
