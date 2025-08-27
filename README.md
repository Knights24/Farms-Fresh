# 🌱 Farm Fresh - Professional Agricultural E-Commerce Platform

<div align="center">

![Farm Fresh Logo](https://img.shields.io/badge/Farm_Fresh-Agricultural_Technology-green?style=for-the-badge&logo=leaf&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-success?style=for-the-badge)](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app)
[![Admin Panel](https://img.shields.io/badge/🔧_Admin_Panel-Management-blue?style=for-the-badge)](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app/admin/login)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Knights24/Farms-Fresh)

**Transforming Agriculture Through Technology**

*A professional farm-to-table e-commerce platform connecting consumers with fresh, organic produce through modern web technology and AI-powered solutions.*

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🌐 Live Deployment](#-live-deployment)
- [⚡ Quick Start](#-quick-start)
- [🏗️ Technology Stack](#️-technology-stack)
- [🚀 Features](#-features)
- [🗄️ Database Architecture](#️-database-architecture)
- [📡 API Documentation](#-api-documentation)
- [🔧 Development Setup](#-development-setup)
- [🌍 Environment Configuration](#-environment-configuration)
- [📱 Application Structure](#-application-structure)
- [🔒 Security Features](#-security-features)
- [📊 Business Model](#-business-model)
- [🚀 Deployment Guide](#-deployment-guide)
- [👥 Team](#-team)
- [📞 Contact](#-contact)

---

## 🎯 Project Overview

**Farm Fresh** is an enterprise-grade agricultural e-commerce platform designed to revolutionize the farm-to-consumer supply chain. Built with modern web technologies and AI integration, it provides a comprehensive solution for farmers, consumers, and agricultural businesses.

### 🎪 **Key Value Propositions**

- **🚜 Direct Farm-to-Consumer Sales** - Eliminating intermediaries for better farmer margins
- **🤖 AI-Powered Operations** - Smart pricing, inventory management, and product recommendations  
- **🏢 Professional Marketplace** - Enterprise-ready platform for organic produce trading
- **📈 Scalable Architecture** - Built to handle millions of transactions and users
- **💰 Investor-Ready Solution** - Complete business model with multiple revenue streams

---

## 🌐 Live Deployment

### **🔗 Production URLs**

| Service | URL | Description |
|---------|-----|-------------|
| **🏠 Main Website** | [farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app) | Customer-facing e-commerce platform |
| **🔧 Admin Panel** | [admin/login](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app/admin/login) | Administrative dashboard |
| **🛍️ Product Catalog** | [products](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app/products) | Browse fresh produce |
| **📊 Analytics Dashboard** | [admin/dashboard](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app/admin/dashboard) | Business intelligence |

### **🔐 Demo Credentials**

```bash
# Admin Access (Full Management Rights)
Email: admin@farmfresh.com
Password: admin123

# Customer Access (Shopping Experience)
Email: customer@farmfresh.com  
Password: customer123
```

---

## ⚡ Quick Start

### **🚀 One-Click Setup**

```bash
# Clone the repository
git clone https://github.com/Knights24/Farms-Fresh.git
cd FreshFarm

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Start development server
npm run dev
```

**🌐 Access Application:** [http://localhost:9002](http://localhost:9002)

### **🗄️ Initialize Database**

Visit the database seeder: [http://localhost:9002/seed-data.html](http://localhost:9002/seed-data.html)

Click **"🌱 Seed Database"** to create:
- ✅ Admin and customer accounts
- ✅ Sample product catalog (50+ items)
- ✅ Category structure
- ✅ Initial inventory data

---

## 🏗️ Technology Stack

### **🎨 Frontend Architecture**
```yaml
Framework: Next.js 15.3.3 (App Router)
Language: TypeScript
Styling: Tailwind CSS + shadcn/ui
State Management: React Context + Custom Hooks
Icons: Lucide React (1000+ icons)
Build Tool: Turbopack (50% faster builds)
Deployment: Vercel (Edge Network CDN)
```

### **⚙️ Backend Infrastructure**  
```yaml
Runtime: Node.js (Serverless Functions)
Database: MongoDB Atlas (Cloud)
ODM: Mongoose (Type Safety)
Authentication: JWT + bcryptjs
File Storage: Ready for AWS S3/Cloudinary
API Architecture: RESTful with Next.js API Routes
```

### **🤖 AI & Intelligence**
```yaml
Platform: Google Genkit
Image Generation: AI Product Photography
Recipe Engine: Ingredient-based suggestions
Smart Recommendations: Machine learning ready
Price Optimization: Dynamic pricing algorithms
```

### **☁️ Cloud & DevOps**
```yaml
Hosting: Vercel (Global CDN)
Database: MongoDB Atlas (Multi-region)
CI/CD: GitHub Actions + Vercel
Monitoring: Built-in analytics ready
Security: Environment-based secrets
```

---

## 🚀 Features

### **👤 Customer Experience**
- 🛍️ **Product Browsing** - Advanced search, filtering, and categorization
- 🛒 **Smart Shopping Cart** - Persistent cart with quantity management
- ❤️ **Wishlist Management** - Save favorite products for later
- 📦 **Order Tracking** - Real-time order status and delivery updates
- 👨‍💼 **Account Management** - Profile, order history, and preferences
- 🎨 **AI Image Generation** - Custom product visualization
- 📱 **Responsive Design** - Seamless mobile and desktop experience

### **🔧 Administrative Dashboard**
- 📊 **Business Analytics** - Revenue, orders, customer insights
- 📝 **Product Management** - CRUD operations with bulk actions
- 📋 **Order Processing** - Status management and fulfillment tracking
- 👥 **User Management** - Customer accounts and role management
- 📈 **Inventory Control** - Stock levels and reorder alerts
- 🌱 **Data Seeding** - Development and testing utilities
- 🔍 **Advanced Search** - Multi-parameter filtering and sorting

### **🤖 AI-Powered Features**
- 🖼️ **Product Image Generation** - AI-created product photography
- 🍽️ **Recipe Suggestions** - Personalized cooking recommendations  
- 🔄 **Ingredient Substitutions** - Alternative product suggestions
- 📊 **Demand Forecasting** - Predictive inventory management
- 💰 **Dynamic Pricing** - Market-based price optimization

---

## 🗄️ Database Architecture

### **📊 MongoDB Atlas Configuration**
```yaml
Cluster: farmsfresh.g2aokc0.mongodb.net
Database: farmfresh
Region: Multi-region deployment
Backup: Automated daily snapshots
Security: IP whitelist + authentication
Scaling: Auto-scaling enabled
```

### **📋 Collection Structure**

#### **👤 Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: Enum['admin', 'customer'],
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### **🛍️ Products Collection**
```javascript
{
  _id: ObjectId,
  name: String (indexed),
  price: Number,
  unit: String,
  imageUrl: String,
  category: String (indexed),
  description: String,
  stock: Number,
  isActive: Boolean,
  supplier: {
    name: String,
    contact: String,
    location: String
  },
  nutritionInfo: Object,
  createdAt: Date,
  updatedAt: Date
}
```

#### **📦 Orders Collection**
```javascript
{
  _id: ObjectId,
  orderId: String (unique, indexed),
  userId: ObjectId (ref: 'User'),
  items: [{
    productId: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number,
    name: String
  }],
  totalAmount: Number,
  status: Enum['pending', 'processing', 'shipped', 'delivered'],
  paymentStatus: Enum['pending', 'paid', 'failed'],
  deliveryAddress: Object,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📡 API Documentation

### **🔐 Authentication Endpoints**
```bash
POST /api/auth/login       # User authentication
POST /api/auth/register    # User registration
POST /api/auth/logout      # Session termination
```

### **🛍️ Product Management**
```bash
GET    /api/products           # List all products
GET    /api/products/[id]      # Get single product
POST   /api/admin/products     # Create product (admin)
PUT    /api/admin/products/[id] # Update product (admin)
DELETE /api/admin/products/[id] # Delete product (admin)
```

### **📦 Order Processing**
```bash
GET  /api/orders              # User orders
POST /api/checkout            # Create new order
GET  /api/admin/orders        # All orders (admin)
PUT  /api/admin/orders/[id]   # Update order status (admin)
```

### **📊 Analytics & Dashboard**
```bash
GET /api/admin/dashboard      # Business metrics
GET /api/admin/analytics      # Detailed analytics
GET /api/reports/sales        # Sales reports
GET /api/reports/inventory    # Inventory reports
```

### **🔧 Development Utilities**
```bash
POST /api/seed-fake-data      # Seed sample data
GET  /api/debug-users         # View users (debug)
GET  /api/view-mongodb        # Database overview
GET  /api/test-db            # Connection test
```

---

## 🔧 Development Setup

### **📋 Prerequisites**
- **Node.js:** 18.0.0 or higher
- **npm:** 9.0.0 or higher  
- **MongoDB Atlas:** Account and cluster
- **Git:** Version control

### **⚙️ Local Development**

1. **Clone Repository**
```bash
git clone https://github.com/Knights24/Farms-Fresh.git
cd FreshFarm
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
# Configure your MongoDB URI and JWT secret
```

4. **Database Seeding**
```bash
# Start development server
npm run dev

# Visit seeder (in browser)
http://localhost:9002/seed-data.html
```

5. **Access Application**
```bash
# Main app
http://localhost:9002

# Admin panel  
http://localhost:9002/admin/login
```

### **🔨 Available Scripts**
```bash
npm run dev          # Start development server (port 9002)
npm run build        # Build for production
npm run start        # Start production server (port 3000)
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

---

## 🌍 Environment Configuration

### **📝 Required Environment Variables**

Create `.env.local` file:

```bash
# MongoDB Configuration (Required)
MONGODB_URI=mongodb+srv://farmfresh:farmfresh123@farmsfresh.g2aokc0.mongodb.net/farmfresh?retryWrites=true&w=majority

# Authentication (Required)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-farmsfresh-2024
JWT_EXPIRES_IN=7d

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway (Optional)  
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# AI Services (Optional)
GENKIT_API_KEY=your-genkit-api-key
OPENAI_API_KEY=your-openai-api-key

# File Storage (Optional)
AWS_S3_BUCKET=your-s3-bucket
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### **☁️ Production Environment (Vercel)**
```bash
# Set via Vercel CLI
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production

# Or via Vercel Dashboard
https://vercel.com/your-project/settings/environment-variables
```

---

## 📱 Application Structure

```
FreshFarm/
├── 📁 src/
│   ├── 📁 app/                     # Next.js App Router
│   │   ├── 📁 (main)/              # Public pages
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── products/page.tsx   # Product catalog
│   │   │   ├── checkout/page.tsx   # Checkout process
│   │   │   └── orders/page.tsx     # Order tracking
│   │   ├── 📁 admin/               # Admin dashboard
│   │   │   ├── login/page.tsx      # Admin authentication
│   │   │   ├── dashboard/page.tsx  # Analytics dashboard
│   │   │   ├── products/page.tsx   # Product management
│   │   │   └── orders/page.tsx     # Order management
│   │   └── 📁 api/                 # API endpoints
│   │       ├── 📁 auth/            # Authentication APIs
│   │       ├── 📁 products/        # Product APIs
│   │       ├── 📁 orders/          # Order APIs
│   │       └── 📁 admin/           # Admin APIs
│   ├── 📁 components/              # Reusable components
│   │   ├── 📁 ui/                  # shadcn/ui components
│   │   ├── 📁 layout/              # Layout components
│   │   ├── produce-card.tsx        # Product display
│   │   ├── cart-sheet.tsx          # Shopping cart
│   │   └── recipe-generator.tsx    # AI features
│   ├── 📁 lib/                     # Utility libraries
│   │   ├── mongodb.ts              # Database connection
│   │   ├── models.ts               # Mongoose schemas
│   │   ├── auth.ts                 # Authentication utils
│   │   └── utils.ts                # Helper functions
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── use-cart.ts             # Shopping cart logic
│   │   └── use-auth.ts             # Authentication state
│   └── 📁 types/                   # TypeScript definitions
│       └── index.ts                # Type declarations
├── 📁 public/                      # Static assets & tools
│   ├── 📁 images/                  # Product images
│   ├── seed-data.html              # Database seeder
│   ├── view-mongodb.html           # Database viewer
│   └── admin-debug.html            # Debug utilities
├── 📁 docs/                        # Documentation
│   └── BACKEND_SETUP.md            # Setup guide
├── .env.example                    # Environment template
├── .env.local                      # Local environment
├── package.json                    # Dependencies & scripts
├── tailwind.config.ts              # Styling configuration
├── next.config.ts                  # Next.js configuration
└── README.md                       # This file
```

---

## 🔒 Security Features

### **🛡️ Authentication & Authorization**
- **JWT Tokens** - Secure session management
- **Password Hashing** - bcrypt with 12 salt rounds
- **Role-Based Access** - Admin and customer permissions
- **Session Validation** - Automatic token verification

### **🔐 Data Protection**
- **Environment Variables** - Secure credential storage
- **MongoDB Security** - IP whitelisting and authentication
- **Input Validation** - Server-side data sanitization  
- **CORS Protection** - Cross-origin request filtering

### **🚨 Security Best Practices**
- **HTTPS Enforcement** - SSL/TLS encryption
- **Rate Limiting** - API abuse prevention
- **Data Encryption** - Sensitive information protection
- **Audit Logging** - User action tracking

---

## 📊 Business Model

### **💰 Revenue Streams**

1. **Commission-Based Sales (5-10%)**
   - Transaction fees from farmer sales
   - Scalable with platform growth
   - Estimated: ₹50L+ annually at 1000 farmers

2. **Premium Services**
   - Express delivery (₹50-100 per order)
   - Quality certification (₹500/month per farmer)
   - Analytics dashboard (₹1000/month)

3. **B2B Solutions**
   - Corporate bulk orders
   - Restaurant supply chains
   - Institutional catering

4. **Technology Licensing**
   - White-label platform for other regions
   - API access for third-party developers
   - AI services for agricultural businesses

### **🎯 Market Opportunity**

| Metric | Current | 3-Year Target |
|--------|---------|---------------|
| **Market Size** | ₹4.6T (India Agriculture) | ₹6.2T (Growing 8% CAGR) |
| **Target Farmers** | 1,000 | 50,000+ |
| **Daily Orders** | 100 | 10,000+ |
| **Revenue** | ₹10L/year | ₹100Cr+/year |
| **Users** | 5,000 | 1M+ |

### **🚀 Growth Strategy**
- **Phase 1:** Regional expansion (Maharashtra, Gujarat)
- **Phase 2:** National rollout with logistics partners
- **Phase 3:** International markets (Middle East, Southeast Asia)
- **Phase 4:** AI-powered agricultural consulting services

---

## 🚀 Deployment Guide

### **☁️ Vercel Deployment (Recommended)**

1. **Connect GitHub Repository**
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

2. **Configure Environment Variables**
```bash
# Add required variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET

# Deploy with environment
vercel --prod
```

3. **Custom Domain (Optional)**
```bash
# Add custom domain
vercel domains add yourdomain.com
```

### **🐳 Docker Deployment**

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **☁️ AWS/Google Cloud**

1. **Build Application**
```bash
npm run build
```

2. **Deploy to Cloud Provider**
- Upload build files to S3/Cloud Storage
- Configure serverless functions
- Set environment variables
- Configure domain and SSL

---

## 🛠️ Development Tools

### **🔍 Debug Utilities**

| Tool | URL | Purpose |
|------|-----|---------|
| **Database Seeder** | `/seed-data.html` | Initialize sample data |
| **MongoDB Viewer** | `/view-mongodb.html` | Browse database contents |
| **User Debug** | `/admin-debug.html` | User management tools |
| **API Tester** | `/login-test.html` | Test authentication |

### **📊 MongoDB Management**

1. **Atlas Web Interface**
   - Visit: [MongoDB Atlas](https://cloud.mongodb.com/)
   - Navigate to your cluster
   - Browse collections and documents

2. **MongoDB Compass (Desktop)**
   - Download: [MongoDB Compass](https://www.mongodb.com/try/download/compass)
   - Connection string: `mongodb+srv://farmfresh:farmfresh123@farmsfresh.g2aokc0.mongodb.net/farmfresh`

3. **VS Code Extension**
   - Install: MongoDB for VS Code
   - Connect to your cluster
   - Query and manage data directly

---

## 🔧 Troubleshooting

### **🚨 Common Issues & Solutions**

#### **Database Connection Failed**
```bash
# Check environment variables
echo $MONGODB_URI

# Test connection
curl http://localhost:9002/api/test-db

# Verify Atlas IP whitelist
# Add 0.0.0.0/0 for development
```

#### **Authentication Errors**
```bash
# Seed admin user
curl -X POST http://localhost:9002/api/seed-fake-data

# Test login
curl -X POST http://localhost:9002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@farmfresh.com","password":"admin123"}'
```

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### **Deployment Issues**
```bash
# Check Vercel logs
vercel logs

# Verify environment variables
vercel env ls

# Redeploy
vercel --prod --force
```

---

## 👥 Team

### **🏢 Founding Team**

<div align="center">

| Role | Name | LinkedIn | Expertise |
|------|------|----------|-----------|
| **👨‍💼 Founder & CEO** | **Vivek Vishwakarma** | [LinkedIn](https://linkedin.com/in/vivek-vishwakarma) | Business Strategy, Product Vision |
| **👨‍💻 Co-Founder & CTO** | **Simit Modi** | [LinkedIn](https://linkedin.com/in/simit-modi) | Technology Architecture, AI/ML |  
| **👨‍🔬 Co-Founder & COO** | **Tejas Luhar** | [LinkedIn](https://linkedin.com/in/tejas-luhar) | Operations, Supply Chain |

</div>

### **🎯 Advisory Board**
- **Agricultural Expert** - Dr. Rajesh Sharma (IIT Agriculture)
- **Technology Advisor** - Priya Patel (Ex-Microsoft Senior Director)
- **Business Mentor** - Amit Kumar (Serial Entrepreneur, 3 Exits)

---

## 📞 Contact

### **🏢 Business Inquiries**

<div align="center">

[![Email](https://img.shields.io/badge/📧_Email-contact@farmsfresh.com-blue?style=for-the-badge)](mailto:contact@farmsfresh.com)
[![Website](https://img.shields.io/badge/🌐_Website-farmsfresh.com-green?style=for-the-badge)](https://farm-fresh-io2dp8qqy-knight-igris-projects.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Farm_Fresh-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/company/farm-fresh-platform)

</div>

### **💼 Investment & Partnership**
- **Email:** investors@farmsfresh.com
- **Phone:** +91-9876543210
- **Address:** Tech Park, Bangalore, Karnataka, India

### **🔧 Technical Support**
- **Developer Email:** developers@farmsfresh.com
- **GitHub Issues:** [Submit Issue](https://github.com/Knights24/Farms-Fresh/issues)
- **Documentation:** [Wiki](https://github.com/Knights24/Farms-Fresh/wiki)

---

<div align="center">

## 🌟 **Ready for Scale & Investment**

**Farm Fresh is a professionally developed, investor-ready agricultural technology platform with proven market demand, scalable architecture, and a clear path to profitability.**

[![Invest Now](https://img.shields.io/badge/💼_Schedule_Demo-Investor_Presentation-gold?style=for-the-badge)](mailto:investors@farmsfresh.com)

---

*© 2025 Farm Fresh Platform. All rights reserved. Built with ❤️ for farmers and consumers.*

**🌱 Cultivating the future of agriculture through technology.**

</div>
