# Engagement Ring Product Showcase - Full Stack Application

A modern full-stack web application for showcasing engagement rings with real-time gold pricing, interactive filtering, and responsive design. Built as part of a full-stack developer role assignment.

## 🎯 Project Overview

This application demonstrates a complete product showcase solution featuring:
- **Real-time pricing** based on current gold market rates
- **Interactive product carousel** with advanced navigation
- **Advanced filtering system** by price and popularity
- **Responsive design** optimized for all devices
- **Professional UI/UX** matching provided design specifications

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│ React Frontend  │◄──►│  Express API    │◄──►│  MetalpriceAPI  │
│  (Port 5173)    │    │  (Port 3001)    │    │  (External)     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Full Setup (Both Backend & Frontend)

1. **Clone the repository**
```bash
git clone <repository-url>
cd engagement-ring-showcase
```

2. **Backend Setup**
```bash
cd backend
npm install
npm run dev  # Starts on http://localhost:3001
```

3. **Frontend Setup** (In a new terminal)
```bash
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

## 📊 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **External API**: MetalpriceAPI
- **Development**: Nodemon

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Carousel**: Swiper.js
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 🎨 Features Implemented

### ✅ Core Requirements
- [x] **Product Display**: 8 engagement rings with images
- [x] **Dynamic Pricing**: Real-time gold price integration
- [x] **Price Formula**: `(popularityScore + 1) × weight × goldPrice`
- [x] **Color Selection**: Yellow, Rose, White gold variants
- [x] **Star Ratings**: Popularity scoring (0-5 scale)
- [x] **API Integration**: RESTful backend with JSON data
- [x] **Responsive Design**: Mobile, tablet, desktop optimized

### ✅ Bonus Features
- [x] **Advanced Filtering**: Price range + popularity filters
- [x] **Interactive Carousel**: Swiper.js with navigation
- [x] **Progress Bar**: Draggable carousel indicator
- [x] **Smart Navigation**: Conditional display based on content
- [x] **Error Handling**: Comprehensive error states
- [x] **Loading States**: Elegant loading animations
- [x] **TypeScript**: Full type safety throughout

### ✅ Design Specifications
- [x] **Exact Fonts**: Avenir + Montserrat implementation
- [x] **Color Accuracy**: Matching PDF color specifications
- [x] **Layout Precision**: Pixel-perfect design implementation
- [x] **Responsive Breakpoints**: 4 different screen sizes
- [x] **Interactive Elements**: Hover states and transitions

## 💰 Pricing System

### Dynamic Price Calculation
```typescript
Price = (popularityScore + 1) × weight × goldPrice
```

**Example:**
- Product: Engagement Ring 1
- Popularity Score: 0.85 (displays as 4.3/5)
- Weight: 2.1 grams
- Current Gold Price: $107.28/gram
- **Final Price**: (0.85 + 1) × 2.1 × 107.28 = **$416.78**

### Real-time Gold Integration
- **Provider**: MetalpriceAPI
- **Update Frequency**: On each API request
- **Conversion**: Troy ounce → Grams (31.1035)
- **Fallback**: Comprehensive error handling

## 📊 API Endpoints

### Products
```http
GET /api/products
# Returns all products with current pricing

GET /api/products/filtered?minPrice=100&maxPrice=500&minPopularity=3
# Returns filtered products based on criteria
```

### Response Format
```json
{
  "products": [...],
  "goldPrice": 107.28,
  "timestamp": "2025-01-07T12:00:00.000Z"
}
```

## 📁 Project Structure

```
engagement-ring-showcase/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── routes/
│   │   │   └── products.ts    # Product API routes
│   │   └── server.ts          # Express server setup
│   ├── products.json          # Product data
│   ├── package.json
│   └── README.md             # Backend documentation
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   ├── types/            # TypeScript definitions
│   │   └── App.tsx           # Main application
│   ├── public/fonts/         # Custom fonts
│   ├── package.json
│   └── README.md            # Frontend documentation
├── Fonts/                     # Font assets
├── Assignment Brief.pdf       # Original requirements
├── page design.pdf           # Design specifications
└── README.md                 # This file
```

## 🎯 Assignment Compliance

### ✅ Required Features
- **Backend API**: ✅ Express.js with TypeScript
- **Frontend**: ✅ React with TypeScript  
- **Real-time Pricing**: ✅ MetalpriceAPI integration
- **Product Management**: ✅ JSON-based data storage
- **Responsive Design**: ✅ Mobile-first approach
- **Design Matching**: ✅ PDF specifications implemented

### ✅ Technical Requirements
- **RESTful API**: ✅ Proper HTTP methods and status codes
- **TypeScript**: ✅ Full type safety across stack
- **Modern React**: ✅ Hooks, functional components
- **Error Handling**: ✅ Comprehensive error states
- **Code Quality**: ✅ Clean, maintainable code

## 🌟 Standout Features

### Advanced UI/UX
- **Fractional Star Ratings**: Precise rating display (e.g., 4.7 stars)
- **Draggable Progress Bar**: Real-time carousel synchronization
- **Smart Navigation**: Hides when not needed (filtered results)
- **Color Selection**: Interactive gold variant picker
- **Responsive Images**: Optimized for each breakpoint

### Performance Optimizations
- **Efficient Rendering**: Minimal re-renders with proper state management
- **Smooth Animations**: RequestAnimationFrame for progress updates
- **Responsive Images**: Breakpoint-specific sizing
- **Error Recovery**: Graceful fallbacks and retry mechanisms

### Professional Polish
- **Loading States**: Elegant spinners and transitions
- **Error Messages**: User-friendly error handling
- **Accessibility**: ARIA labels and keyboard navigation
- **Code Documentation**: Comprehensive README files

## 📱 Responsive Design

### Breakpoints
- **Mobile** (< 640px): 1 product per row
- **Tablet** (640px - 768px): 2 products per row
- **Laptop** (768px - 1024px): 3 products per row
- **Desktop** (1024px+): 4 products per row

### Responsive Features
- Adaptive font sizes
- Flexible image containers
- Conditional navigation display
- Mobile-optimized touch interactions

## 🔧 Development

### Available Scripts

**Backend:**
```bash
cd backend
npm run dev    # Development server
npm run build  # Build for production
npm start      # Production server
```

**Frontend:**
```bash
cd frontend
npm run dev     # Development server
npm run build   # Build for production
npm run preview # Preview build
```

### Development Workflow
1. Start backend development server (`npm run dev`)
2. Start frontend development server (separate terminal)
3. Both servers support hot reload
4. API calls automatically proxy to backend

## 🚀 Deployment

### Backend Deployment
- **Platform**: Node.js hosting (Heroku, Railway, Render)
- **Environment**: Production build required
- **Dependencies**: All in package.json

### Frontend Deployment
- **Platform**: Static hosting (Vercel, Netlify, GitHub Pages)
- **Build**: Vite production build
- **Environment**: Configure API base URL

### Full-Stack Deployment
- Deploy backend to Node.js platform
- Deploy frontend to static hosting
- Update frontend API configuration

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**
```bash
# Check if port 3001 is available
lsof -ti:3001 | xargs kill -9
cd backend && npm run dev
```

2. **Frontend API errors**
```bash
# Ensure backend is running first
# Check browser console for CORS errors
```

3. **Font loading issues**
```bash
# Verify font files in frontend/public/fonts/
# Check browser network tab for 404s
```

### Optimization Strategies
- Efficient React rendering
- Optimized image loading
- Minimal bundle size
- CDN-ready static assets

## 📈 Business Value

### For Customers
- **Real-time Pricing**: Always current market rates
- **Interactive Experience**: Engaging product exploration
- **Mobile-first**: Shopping on any device
- **Professional Design**: Trust and credibility

### For Business
- **Scalable Architecture**: Easy to extend and maintain
- **Modern Tech Stack**: Future-proof technology choices
- **Professional Quality**: Enterprise-ready codebase
- **Documentation**: Comprehensive developer resources

## 🎓 Learning Outcomes

This project demonstrates:
- **Full-stack Development**: End-to-end application building
- **API Integration**: External service consumption
- **Responsive Design**: Modern CSS techniques
- **TypeScript Mastery**: Type-safe development practices
- **React Expertise**: Modern React patterns and hooks
- **Professional Development**: Code quality and documentation

## 📄 Assignment Brief

This project was built according to the specifications in `Assignment Brief for Full-Stack Developer Role.pdf`, implementing all required features plus additional bonus functionality for an enhanced user experience.

## 📞 Support

For questions about implementation details:
- Check component-specific README files
- Review code comments and documentation
- Examine TypeScript interfaces for data structures

---

**Development Time**: 2-3 days  
**Assignment**: Full-Stack Developer Role  
**Status**: Complete ✅  
**Last Updated**: January 2025 