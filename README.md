# 🚜 Farm Fresh - Professional Farm-to-Table Platform

**Professional farm-to-table e-commerce platform connecting consumers with fresh, organic produce through modern technology.**

## 🌐 Live Demo & Ports

### **Development Servers**
| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **Main Application** | `9002` | http://localhost:9002 | Main Next.js application |
| **Production Server** | `3000` | http://localhost:3000 | Production build server |

### **Important URLs & Endpoints**

#### **🏠 Main Application**
- **Homepage:** http://localhost:9002
- **Products Page:** http://localhost:9002/products
- **Admin Login:** http://localhost:9002/admin/login
- **Admin Dashboard:** http://localhost:9002/admin/dashboard

#### **🔧 Development & Testing Tools**
- **Database Seeder:** http://localhost:9002/seed-data.html
- **MongoDB Viewer:** http://localhost:9002/view-mongodb.html
- **Admin Debug:** http://localhost:9002/admin-debug.html
- **Login Test:** http://localhost:9002/login-test.html

#### **📡 API Endpoints**
| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/auth/register` | POST | User registration |
| `/api/products` | GET | Get all products |
| `/api/products/[id]` | GET | Get single product |
| `/api/admin/dashboard` | GET | Admin dashboard data |
| `/api/admin/products` | GET/POST | Manage products |
| `/api/admin/orders` | GET | Manage orders |
| `/api/seed-fake-data` | POST | Seed database with sample data |
| `/api/debug-users` | GET | View all users |
| `/api/view-mongodb` | GET | Complete database view |

## 🗄️ Database Configuration

### **MongoDB Atlas**
- **Cluster:** `farmsfresh.g2aokc0.mongodb.net`
- **Database:** `farmfresh`
- **Username:** `farmfresh`
- **Password:** `farmfresh123`
- **Connection String:** `mongodb+srv://farmfresh:farmfresh123@farmsfresh.g2aokc0.mongodb.net/farmfresh?retryWrites=true&w=majority`

### **Collections**
- **users** - User accounts (admin/customer)
- **products** - Product catalog
- **orders** - Order management

## 👤 Default Credentials

### **Admin Access**
- **Email:** `admin@farmfresh.com`
- **Password:** `admin123`
- **Role:** `admin`

### **Customer Access**
- **Email:** `customer@farmfresh.com`
- **Password:** `customer123`
- **Role:** `customer`

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- npm or yarn
- MongoDB Atlas account

### **Installation**
```bash
# Clone repository
git clone https://github.com/Knights24/Farms-Fresh.git
cd FreshFarm

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### **Environment Configuration**
Create `.env.local` file:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://farmfresh:farmfresh123@farmsfresh.g2aokc0.mongodb.net/farmfresh?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production-farmsfresh-2024
JWT_EXPIRES_IN=7d

# Optional configurations
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### **Development Commands**
```bash
# Start development server (Port 9002)
npm run dev

# Build for production
npm run build

# Start production server (Port 3000)
npm start

# Seed database with sample data
# Visit: http://localhost:9002/seed-data.html
```

## 🏗️ Technology Stack

### **Frontend**
- **Framework:** Next.js 15.3.3 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Context + Local Storage
- **Icons:** Lucide React
- **Build Tool:** Turbopack (development)

### **Backend**
- **Runtime:** Node.js with Next.js API Routes
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Authentication:** JWT + bcryptjs
- **File Upload:** (Ready for implementation)

### **AI Integration**
- **Platform:** Google Genkit
- **Features:** Image generation, recipe suggestions, ingredient substitution

### **Deployment**
- **Platform:** Vercel
- **Domain:** https://farm-fresh-fcl4l1gun-knight-igris-projects.vercel.app
- **CDN:** Vercel Edge Network

## 📱 Application Features

### **Customer Features**
- 🛍️ Product browsing and search
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📦 Order tracking
- 👤 User account management
- 🎨 AI-powered image generation

### **Admin Features**
- 📊 Dashboard analytics
- 📝 Product management (CRUD)
- 📋 Order management
- 👥 User management
- 🌱 Database seeding tools

### **AI Features**
- 🖼️ Product image generation
- 🍽️ Recipe suggestions
- 🔄 Ingredient substitutions
- 📈 Smart pricing (planned)

## 🔧 Development Tools

### **Database Management**
1. **Seed Database:** http://localhost:9002/seed-data.html
2. **View MongoDB Data:** http://localhost:9002/view-mongodb.html
3. **Debug Users:** http://localhost:9002/admin-debug.html

### **MongoDB Access**
1. **Web Interface:** [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Desktop App:** [MongoDB Compass](https://www.mongodb.com/try/download/compass)
3. **Connection String:** Use the MongoDB URI from environment variables

## 📊 Project Structure

```
FreshFarm/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin pages
│   │   └── (main pages)/      # Public pages
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── layout/           # Layout components
│   ├── lib/                   # Utilities
│   │   ├── mongodb.ts        # Database connection
│   │   ├── models.ts         # Mongoose models
│   │   └── auth.ts           # Authentication utilities
│   └── types/                 # TypeScript definitions
├── public/                    # Static files & tools
└── docs/                      # Documentation
```

## 🚀 Deployment

### **Development**
```bash
npm run dev  # http://localhost:9002
```

### **Production**
```bash
# Build application
npm run build

# Start production server
npm start  # http://localhost:3000

# Deploy to Vercel
vercel --prod
```

## 🔍 Troubleshooting

### **Common Port Issues**
- If port 9002 is busy: Change port in `package.json` dev script
- If port 3000 is busy: Use `npm start -- -p 3001`

### **Database Issues**
- Check MongoDB Atlas connectivity
- Verify environment variables
- Use debug tools: http://localhost:9002/view-mongodb.html

### **Authentication Issues**
- Seed admin user: http://localhost:9002/seed-data.html
- Test login: http://localhost:9002/login-test.html

## 🌟 Business Model

### **Market Opportunity**
- **₹4.6 Trillion** Indian agriculture market
- Growing demand for organic, traceable produce
- Technology gap in traditional supply chains

### **Revenue Streams**
- Commission on farmer sales (5-10%)
- Premium delivery services
- AI-powered consulting for farms
- White-label platform licensing

### **Target Markets**
- Urban consumers seeking quality produce
- Small-to-medium farms requiring market access
- Corporate clients needing bulk organic supplies

## 👥 Team

**Founding Team:**
- **Vivek Vishwakarma** - Founder & CEO
- **Simit Modi** - Co-Founder & CTO
- **Tejas Luhar** - Co-Founder & COO

## 📞 Contact & Support

- **Website:** https://farm-fresh-fcl4l1gun-knight-igris-projects.vercel.app
- **Investment Inquiries:** contact@farmsfresh.com
- **GitHub:** https://github.com/Knights24/Farms-Fresh
- **Development Server:** http://localhost:9002

---

*Professional agricultural technology platform ready for scale and investment.*
