import mongoose, { Schema, Document } from 'mongoose';

// User Model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
}, {
  timestamps: true
});

// Product Model
export interface IProduct extends Document {
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  category: string;
  description: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

// Order Model
export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface IOrder extends Document {
  orderId: string;
  userId?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
  estimatedDelivery: { type: Date },
}, {
  timestamps: true
});

// Category Model
export interface ICategory extends Document {
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  productCount: { type: Number, default: 0 },
}, {
  timestamps: true
});

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
