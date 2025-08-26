# 🌱 Farm Fresh

![Farm Fresh Logo](./public/images/logo.svg)

**Farm Fresh** is a modern e-commerce platform dedicated to delivering the finest selection of farm-fresh, organic produce straight from trusted local farms to your doorstep. Experience quality, taste, and nutrition like never before.

## 🎯 Features

### 🏪 **Complete E-commerce Platform**
- **Product Catalog**: Browse 20+ premium organic products across 4 categories
- **Smart Search & Filtering**: Find products quickly with real-time search and category filters
- **Shopping Cart**: Seamless cart management with quantity updates and item removal
- **Order Management**: Track orders with professional status indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 **Professional UI/UX**
- **Minimal Design**: Clean, modern interface with consistent styling
- **Professional Product Cards**: High-quality product displays with ratings and quick actions
- **Interactive Elements**: Smooth animations, hover effects, and loading states
- **User-Friendly Navigation**: Intuitive menu structure and search functionality

### 🤖 **AI-Powered Features**
- **Image Generation**: AI-generated product images using Google's Genkit
- **Recipe Suggestions**: Smart recipe recommendations based on cart items
- **Ingredient Substitution**: AI-powered ingredient alternatives

### 🛒 **Product Categories**
- **🥬 Fresh Vegetables**: Organic tomatoes, spinach, cucumbers, bell peppers, and more
- **🍎 Fresh Fruits**: Premium avocados, strawberries, apples, berries, and seasonal fruits
- **🥛 Dairy & Eggs**: Farm-fresh eggs, organic milk, Greek yogurt, and artisan cheese
- **🏺 Pantry Essentials**: Organic honey, olive oil, quinoa, almonds, and more

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Next.js 15+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Knights24/FreshFarm.git
   cd FreshFarm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables for Genkit AI integration.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### **AI & Backend**
- **Google Genkit** - AI integration for image generation and recipes
- **Firebase** - Authentication and data storage
- **Context API** - State management for cart and user data

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page with hero and featured products
│   ├── recipes/           # Products/Shop page
│   ├── orders/            # Order management
│   └── image-generator/   # AI image generation
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Header, footer, navigation
│   ├── produce-card.tsx  # Product card component
│   └── cart-sheet.tsx    # Shopping cart sidebar
├── context/              # React Context providers
│   └── cart-context.tsx  # Cart state management
├── lib/                  # Utilities and data
│   ├── data.ts          # Product data and mock orders
│   └── utils.ts         # Helper functions
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared types
└── ai/                  # AI integration
    ├── genkit.ts        # Genkit configuration
    └── flows/           # AI flow definitions
```

## 🎨 Design System

### **Colors**
- **Primary Green**: `#2d7d32` - Trust, growth, nature
- **Background**: Clean whites and subtle grays
- **Accents**: Green tones for call-to-actions and highlights

### **Typography**
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, accessible font sizes
- **UI Elements**: Consistent spacing and sizing

### **Components**
- **Cards**: Elevated design with subtle shadows
- **Buttons**: Rounded corners with hover states
- **Inputs**: Clean borders with focus indicators

## 🌟 Key Pages

### **🏠 Home Page**
- Hero section with company messaging
- Featured products showcase
- Category browsing with product counts
- Trust indicators and statistics

### **🛍️ Shop/Products Page**
- Complete product catalog
- Advanced filtering and sorting
- Grid/List view options
- Category sidebar navigation

### **📦 Orders Page**
- Order history and tracking
- Status indicators with color coding
- Detailed order information
- Reorder functionality

## 🔧 Customization

### **Adding New Products**
Edit `src/lib/data.ts` to add new products:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 100,
  unit: 'kg',
  imageUrl: '/api/genkit/image?prompt=your-prompt',
  category: 'Category',
  description: 'Product description'
}
```

### **Modifying Styles**
- Update `src/app/globals.css` for global styles
- Modify Tailwind classes in components for specific styling
- Configure `tailwind.config.ts` for theme customization

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px+): Full feature set with sidebar navigation
- **Tablet** (768px-1023px): Adapted layouts with collapsible elements
- **Mobile** (320px-767px): Touch-friendly interface with hamburger menu

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **Firebase Hosting**
```bash
npm run build
firebase deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Local Farmers** - For providing fresh, quality produce
- **Next.js Team** - For the amazing React framework
- **Vercel** - For the excellent deployment platform
- **Google** - For Genkit AI capabilities
- **Shadcn** - For beautiful, accessible UI components

## 📞 Support

For support, email hello@farmfresh.com or create an issue in this repository.

---

**Built with ❤️ by the Farm Fresh team**

*Bringing fresh, organic produce from farm to table with modern technology.*
