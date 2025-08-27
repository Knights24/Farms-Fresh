import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// JWT token operations
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Generate unique order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FF${timestamp.slice(-6)}${random}`;
};

// Calculate delivery date
export const calculateEstimatedDelivery = (orderDate: Date = new Date()): Date => {
  const delivery = new Date(orderDate);
  delivery.setDate(delivery.getDate() + 1); // Next day delivery
  return delivery;
};

// Price calculations
export const calculateOrderTotals = (items: any[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery above ₹500
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax;
  
  return {
    subtotal: Math.round(subtotal),
    deliveryFee,
    tax,
    total: Math.round(total)
  };
};

// Validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(pincode);
};

// Product validation
export const validateProduct = (productData: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!productData.name || productData.name.trim().length < 2) {
    errors.push('Product name must be at least 2 characters long');
  }
  
  if (!productData.description || productData.description.trim().length < 10) {
    errors.push('Product description must be at least 10 characters long');
  }
  
  if (!productData.price || productData.price <= 0) {
    errors.push('Product price must be greater than 0');
  }
  
  if (!productData.category || productData.category.trim().length === 0) {
    errors.push('Product category is required');
  }
  
  if (!productData.unit || productData.unit.trim().length === 0) {
    errors.push('Product unit is required');
  }
  
  if (!productData.image || productData.image.trim().length === 0) {
    errors.push('Product image is required');
  }
  
  if (productData.stockQuantity !== undefined && productData.stockQuantity < 0) {
    errors.push('Stock quantity cannot be negative');
  }
  
  if (productData.rating !== undefined && (productData.rating < 0 || productData.rating > 5)) {
    errors.push('Rating must be between 0 and 5');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// API response helpers
export const successResponse = (data: any, message?: string) => ({
  success: true,
  data,
  message
});

export const errorResponse = (error: string, statusCode: number = 400) => ({
  success: false,
  error,
  statusCode
});

// Pagination helper
export const getPaginationParams = (searchParams: URLSearchParams) => {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

// Search and filter helpers
export const buildProductFilter = (searchParams: URLSearchParams) => {
  const filter: any = { isActive: true };
  
  const category = searchParams.get('category');
  if (category && category !== 'all') {
    filter.category = category;
  }
  
  const search = searchParams.get('search');
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }
  
  const inStock = searchParams.get('inStock');
  if (inStock === 'true') {
    filter.inStock = true;
    filter.stockQuantity = { $gt: 0 };
  }
  
  const organic = searchParams.get('organic');
  if (organic === 'true') {
    filter.organic = true;
  }
  
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  
  return filter;
};

export const buildOrderFilter = (searchParams: URLSearchParams, userId?: string) => {
  const filter: any = {};
  
  if (userId) {
    filter.userId = userId;
  }
  
  const status = searchParams.get('status');
  if (status) {
    filter.status = status;
  }
  
  const paymentStatus = searchParams.get('paymentStatus');
  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }
  
  const email = searchParams.get('email');
  if (email) {
    filter['customerInfo.email'] = email;
  }
  
  return filter;
};
