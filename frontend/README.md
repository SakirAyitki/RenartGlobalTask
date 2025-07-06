# Engagement Ring Product Showcase

A modern, responsive React application for showcasing engagement rings with real-time pricing, interactive filtering, and carousel navigation.

## 🚀 Features

- **Real-time Product Display**: Dynamic product loading with live pricing
- **Interactive Carousel**: Smooth product navigation with Swiper.js
- **Advanced Filtering**: Filter by price range and popularity rating
- **Color Selection**: Interactive color picker for different gold types
- **Star Rating System**: Fractional star display for precise ratings
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Progress Bar Navigation**: Draggable progress indicator
- **Custom Typography**: Professional fonts (Avenir, Montserrat)
- **Loading States**: Elegant loading animations and error handling

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Carousel**: Swiper.js
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect, useRef)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will start on `http://localhost:5173`

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Design System

### Color Palette
- **Gold Colors**:
  - Yellow Gold: `#E6CA97`
  - White Gold: `#D9D9D9`
  - Rose Gold: `#E1A4A9`
- **UI Colors**:
  - Primary Text: `#000000`
  - Secondary Text: `#6B7280`
  - Background: `#FFFFFF`
  - Gray Tones: `#F3F4F6`, `#E5E7EB`, `#D1D5DB`

### Typography
- **Avenir Font Family**:
  - Title: Avenir Book 45pt (Desktop), Responsive scaling
  - Labels: Avenir Book 12pt
- **Montserrat Font Family**:
  - Product Names: Montserrat Medium 15pt
  - Prices: Montserrat Regular 15pt
  - Ratings: Montserrat Regular

### Responsive Breakpoints
- **Mobile**: < 640px (1 product per row)
- **Tablet**: 640px - 768px (2 products per row)
- **Laptop**: 768px - 1024px (3 products per row)
- **Desktop**: 1024px+ (4 products per row)

## 🧩 Component Architecture

### Core Components

#### `App.tsx`
- **Purpose**: Main application container and state management
- **Features**:
  - Product data fetching
  - Error and loading state handling
  - Filter state management
  - API integration

#### `ProductCarousel.tsx`
- **Purpose**: Product showcase with navigation
- **Features**:
  - Swiper.js integration
  - Responsive breakpoints
  - Progress bar with dragging
  - Navigation arrows (conditional display)
  - Smart navigation hiding

#### `ProductCard.tsx`
- **Purpose**: Individual product display
- **Features**:
  - Image gallery with color selection
  - Fractional star rating system
  - Responsive sizing
  - Color option buttons
  - Price display

#### `FilterPanel.tsx`
- **Purpose**: Advanced filtering interface
- **Features**:
  - Price range filtering
  - Popularity rating filtering
  - Clear filters functionality
  - Responsive layout

### Utility Components
- **API Service** (`services/api.ts`): HTTP client wrapper
- **Type Definitions** (`types/product.ts`): TypeScript interfaces

## 📱 Responsive Design

### Mobile (< 640px)
- Single column layout
- Compact spacing and typography
- Touch-optimized interactions
- Simplified navigation

### Tablet (640px - 1024px)
- Multi-column layouts (2-3 products)
- Optimized image sizing
- Tablet-specific spacing
- Enhanced touch targets

### Desktop (1024px+)
- Full 4-column layout
- Maximum visual impact
- Hover interactions
- Desktop-optimized spacing

## 🎯 Key Features Implementation

### Carousel Navigation
```typescript
// Smart navigation hiding based on content
const isNavigationNeeded = products.length > currentSlidesPerView;
```

### Fractional Star Rating
```typescript
// Precise star display with partial filling
const fillPercentage = (rating - Math.floor(rating)) * 100;
```

### Draggable Progress Bar
```typescript
// Real-time carousel synchronization
const updateProgress = (clientX: number) => {
  const progressPercent = (moveX / rect.width) * 100;
  setProgress(progressPercent);
};
```

### Color Selection System
```typescript
// Interactive color picker with image switching
const [selectedColor, setSelectedColor] = useState<ColorOption>('yellow');
```

## 🔄 State Management

### Global State (App.tsx)
- `products`: Product array with pricing
- `loading`: Loading state for API calls
- `error`: Error state with user-friendly messages
- `activeFilters`: Current filter configuration

### Local Component State
- `ProductCard`: Selected color option
- `ProductCarousel`: Progress bar position, dragging state
- `FilterPanel`: Filter form values

## 📊 API Integration

### Endpoints Used
- `GET /api/products` - Fetch all products
- `GET /api/products/filtered` - Fetch filtered products

### Error Handling
```typescript
// Graceful error handling with retry options
if (error) {
  return <ErrorComponent onRetry={fetchProducts} />;
}
```

### Loading States
```typescript
// Loading animation during API calls
if (loading) {
  return <LoadingSpinner />;
}
```

## 🎨 Styling Architecture

### Tailwind CSS v4
- Utility-first approach
- Custom font configurations
- Responsive design utilities
- Component-specific styles

### Custom CSS Classes
```css
/* Number input styling */
.appearance-none /* Remove browser arrows */

/* Font face declarations */
@font-face {
  font-family: 'Avenir';
  src: url('/fonts/avenir/Avenir-Book.ttf');
}
```

## 🔧 Performance Optimizations

### Carousel Performance
- `requestAnimationFrame` for smooth progress updates
- Throttled drag events
- Efficient slide synchronization

### Image Optimization
- Responsive image sizing
- `object-fit` optimization per breakpoint
- Lazy loading ready

### State Optimization
- Minimal re-renders
- Efficient filter debouncing
- Optimized event handlers

## 🎪 Interactive Features

### Draggable Progress Bar
- **Mouse Events**: Full drag support
- **Touch Events**: Mobile-friendly
- **Throttling**: Smooth performance
- **Synchronization**: Real-time carousel updates

### Color Selection
- **Visual Feedback**: Border highlighting
- **Instant Updates**: Immediate image switching
- **Accessibility**: Proper ARIA labels

### Filtering System
- **Real-time Updates**: Instant results
- **Clear Functionality**: Reset all filters
- **Validation**: Input range constraints

## 📐 Layout System

### Grid Layout
```typescript
// Responsive grid with Swiper
breakpoints={{
  320: { slidesPerView: 1, spaceBetween: 24 },
  640: { slidesPerView: 2, spaceBetween: 32 },
  768: { slidesPerView: 3, spaceBetween: 32 },
  1024: { slidesPerView: 4, spaceBetween: 48 }
}}
```

### Spacing System
- Consistent spacing scale
- Responsive margins and padding
- Component-specific spacing rules

## 🚨 Error Handling

### Error Types
- **API Errors**: Network and server failures
- **Gold Price Errors**: External API failures
- **Validation Errors**: Filter input validation

### User Experience
- Clear error messages
- Retry functionality
- Graceful degradation

## 🔍 Accessibility

### Features Implemented
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly

### Future Enhancements
- Focus management
- High contrast mode
- Reduced motion support

## 📱 Browser Support

### Supported Browsers
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Progressive Enhancement
- Core functionality works on older browsers
- Enhanced features for modern browsers

## 🔮 Future Enhancements

- [ ] Infinite scroll implementation
- [ ] Image zoom functionality
- [ ] Wishlist feature
- [ ] Product comparison
- [ ] Advanced animations (Framer Motion)
- [ ] PWA capabilities
- [ ] Virtual scrolling for performance
- [ ] A11y improvements
- [ ] E2E testing with Playwright
- [ ] Storybook component documentation
- [ ] Performance monitoring
- [ ] SEO optimization

## 🎯 Performance Metrics

### Target Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Strategies
- Code splitting
- Image optimization
- Bundle size optimization
- Critical CSS inlining

## 🧪 Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Hook testing for custom logic
- Utility function testing

### Integration Testing
- API integration tests
- User flow testing
- Cross-browser testing

### E2E Testing
- Critical user journeys
- Mobile device testing
- Performance testing

## 📁 Project Structure

```
frontend/
├── public/
│   ├── fonts/                   # Custom font files
│   │   ├── avenir/             # Avenir font family
│   │   └── montserat/          # Montserrat font family
│   └── vite.svg                # Vite logo
├── src/
│   ├── components/             # React components
│   │   ├── ProductCard.tsx     # Individual product display
│   │   ├── ProductCarousel.tsx # Product showcase
│   │   └── FilterPanel.tsx     # Filtering interface
│   ├── services/               # API services
│   │   └── api.ts             # HTTP client wrapper
│   ├── types/                  # TypeScript definitions
│   │   └── product.ts         # Product interfaces
│   ├── App.tsx                # Main application
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔧 Configuration Files

### Tailwind CSS (`tailwind.config.ts`)
```typescript
// Custom font family configurations
fontFamily: {
  'avenir': ['Avenir', 'sans-serif'],
  'montserrat': ['Montserrat', 'sans-serif']
}
```

### Vite (`vite.config.ts`)
```typescript
// Development server configuration
server: {
  port: 5173,
  host: true
}
```

## 📝 Usage Examples

### Basic Component Usage
```tsx
// Product display with filtering
<FilterPanel 
  onFilter={handleApplyFilters}
  onClearFilters={handleClearFilters}
  isLoading={loading}
  appliedFilters={activeFilters}
/>
<ProductCarousel products={products} title="Product List" />
```

### API Integration
```typescript
// Fetch products with error handling
const fetchProducts = async (filters?: FilterOptions) => {
  try {
    const response = await productApi.getAllProducts();
    setProducts(response.products);
  } catch (error) {
    setError('Failed to load products');
  }
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Fonts not loading**
   ```bash
   # Check font file paths in public/fonts
   # Verify CSS @font-face declarations
   ```

2. **Carousel not responsive**
   ```bash
   # Check Swiper breakpoint configuration
   # Verify container width settings
   ```

3. **API connection errors**
   ```bash
   # Ensure backend is running on localhost:3001
   # Check CORS configuration
   ```

## 📊 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

### Component Guidelines
- Single responsibility principle
- Props interface definitions
- Proper TypeScript typing
- Reusable component design

## 📄 License

This project is part of a full-stack development assignment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests for new features
5. Submit a pull request

## 📞 Support

For questions or issues, please contact the development team.

---

**Last Updated**: January 2025  
**React Version**: 18+  
**Node Version**: 16+  
**Build Tool**: Vite 5+
