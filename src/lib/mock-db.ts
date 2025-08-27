// Mock Database for Development Testing
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
  unit: string;
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  benefits: string[];
  createdAt: Date;
}

interface Order {
  _id: string;
  orderNumber: string;
  userId?: string;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

class MockDatabase {
  private users: User[] = [];
  private products: Product[] = [];
  private orders: Order[] = [];
  private initialized = false;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    if (this.initialized) return;
    
    // Create admin user
    this.users.push({
      _id: 'admin_001',
      name: 'Admin User',
      email: 'admin@farmfresh.com',
      password: '$2a$10$rOyPZHF/5DLZ9zRE9RQ9qOWKL.yEjYvOYL.5zQPqI7.7VPGy2QAC6', // admin123
      role: 'admin',
      phone: '+91-9876543210',
      isVerified: true,
      createdAt: new Date()
    });

    // Create sample products
    this.products = [
      {
        _id: 'prod_001',
        name: 'Organic Tomatoes',
        description: 'Fresh, juicy organic tomatoes grown without pesticides',
        price: 80,
        originalPrice: 100,
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=500&fit=crop',
        inStock: true,
        unit: 'kg',
        nutritionInfo: {
          calories: 18,
          protein: '0.9g',
          carbs: '3.9g',
          fat: '0.2g'
        },
        benefits: ['Rich in lycopene', 'High in vitamin C', 'Heart healthy'],
        createdAt: new Date()
      },
      {
        _id: 'prod_002',
        name: 'Fresh Spinach',
        description: 'Leafy green spinach packed with nutrients',
        price: 40,
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop',
        inStock: true,
        unit: 'bunch',
        nutritionInfo: {
          calories: 23,
          protein: '2.9g',
          carbs: '3.6g',
          fat: '0.4g'
        },
        benefits: ['High in iron', 'Rich in folate', 'Antioxidant properties'],
        createdAt: new Date()
      },
      {
        _id: 'prod_003',
        name: 'Organic Carrots',
        description: 'Sweet and crunchy organic carrots',
        price: 60,
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop',
        inStock: true,
        unit: 'kg',
        nutritionInfo: {
          calories: 41,
          protein: '0.9g',
          carbs: '9.6g',
          fat: '0.2g'
        },
        benefits: ['High in beta-carotene', 'Good for eye health', 'Rich in fiber'],
        createdAt: new Date()
      },
      {
        _id: 'prod_004',
        name: 'Fresh Apples',
        description: 'Crisp and sweet red apples',
        price: 120,
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop',
        inStock: true,
        unit: 'kg',
        nutritionInfo: {
          calories: 52,
          protein: '0.3g',
          carbs: '14g',
          fat: '0.2g'
        },
        benefits: ['High in fiber', 'Rich in antioxidants', 'Heart healthy'],
        createdAt: new Date()
      },
      {
        _id: 'prod_005',
        name: 'Organic Bananas',
        description: 'Sweet and nutritious organic bananas',
        price: 50,
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop',
        inStock: true,
        unit: 'dozen',
        nutritionInfo: {
          calories: 89,
          protein: '1.1g',
          carbs: '23g',
          fat: '0.3g'
        },
        benefits: ['High in potassium', 'Natural energy boost', 'Rich in vitamin B6'],
        createdAt: new Date()
      }
    ];

    // Create sample orders
    this.orders = [
      {
        _id: 'order_001',
        orderNumber: 'FF2024001',
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91-9876543210'
        },
        items: [
          {
            productId: 'prod_001',
            productName: 'Organic Tomatoes',
            quantity: 2,
            price: 80
          },
          {
            productId: 'prod_002',
            productName: 'Fresh Spinach',
            quantity: 1,
            price: 40
          }
        ],
        totalAmount: 200,
        status: 'pending',
        shippingAddress: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India'
        },
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'order_002',
        orderNumber: 'FF2024002',
        customerInfo: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91-9876543211'
        },
        items: [
          {
            productId: 'prod_004',
            productName: 'Fresh Apples',
            quantity: 1,
            price: 120
          }
        ],
        totalAmount: 120,
        status: 'delivered',
        shippingAddress: {
          street: '456 Oak Avenue',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India'
        },
        paymentMethod: 'Online Payment',
        paymentStatus: 'completed',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        updatedAt: new Date()
      }
    ];

    this.initialized = true;
  }

  // User methods
  async findUser(query: any): Promise<User | null> {
    return this.users.find(user => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    }) || null;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      _id: `user_${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password || '',
      role: userData.role || 'customer',
      phone: userData.phone,
      isVerified: userData.isVerified || false,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Product methods
  async findProducts(query: any = {}): Promise<Product[]> {
    let results = [...this.products];
    
    if (query.category && query.category !== 'all') {
      results = results.filter(product => product.category === query.category);
    }
    
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return results;
  }

  async findProductById(id: string): Promise<Product | null> {
    return this.products.find(product => product._id === id) || null;
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const newProduct: Product = {
      _id: `prod_${Date.now()}`,
      name: productData.name || '',
      description: productData.description || '',
      price: productData.price || 0,
      originalPrice: productData.originalPrice,
      category: productData.category || '',
      image: productData.image || '',
      inStock: productData.inStock !== false,
      unit: productData.unit || '',
      nutritionInfo: productData.nutritionInfo || {
        calories: 0,
        protein: '0g',
        carbs: '0g',
        fat: '0g'
      },
      benefits: productData.benefits || [],
      createdAt: new Date()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updateData: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex(product => product._id === id);
    if (index === -1) return null;
    
    this.products[index] = { ...this.products[index], ...updateData };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const index = this.products.findIndex(product => product._id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }

  // Order methods
  async findOrders(query: any = {}): Promise<Order[]> {
    let results = [...this.orders];
    
    if (query.status && query.status !== 'all') {
      results = results.filter(order => order.status === query.status);
    }
    
    return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.orders.find(order => order._id === id) || null;
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const newOrder: Order = {
      _id: `order_${Date.now()}`,
      orderNumber: `FF${Date.now()}`,
      userId: orderData.userId,
      customerInfo: orderData.customerInfo,
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      status: orderData.status || 'pending',
      shippingAddress: orderData.shippingAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
      },
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      paymentStatus: orderData.paymentStatus || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async updateOrder(id: string, updateData: Partial<Order>): Promise<Order | null> {
    const index = this.orders.findIndex(order => order._id === id);
    if (index === -1) return null;
    
    this.orders[index] = { 
      ...this.orders[index], 
      ...updateData, 
      updatedAt: new Date() 
    };
    return this.orders[index];
  }

  // Statistics methods
  async getStatistics() {
    const totalProducts = this.products.length;
    const totalOrders = this.orders.length;
    const totalUsers = this.users.filter(user => user.role === 'customer').length;
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const recentOrders = this.orders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(order => ({
        id: order._id,
        customerName: order.customerInfo?.name || 'Unknown',
        total: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt.toISOString()
      }));

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders
    };
  }
}

export const mockDB = new MockDatabase();
