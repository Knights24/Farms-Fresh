import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy' | 'Pantry';
  imageUrl: string;
  images?: string[];
  inStock: boolean;
  stockQuantity: number;
  farmerId?: string;
  farmerName?: string;
  origin?: string;
  harvestDate?: Date;
  organic: boolean;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  tags?: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['kg', 'gram', 'piece', 'bunch', 'dozen', 'liter', 'ml', 'jar', 'bottle', 'pack']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Vegetables', 'Fruits', 'Dairy', 'Pantry']
  },
  imageUrl: {
    type: String,
    required: [true, 'Main image is required']
  },
  images: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  farmerId: {
    type: String
  },
  farmerName: {
    type: String,
    trim: true
  },
  origin: {
    type: String,
    trim: true
  },
  harvestDate: {
    type: Date
  },
  organic: {
    type: Boolean,
    default: true
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  tags: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create indexes
ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ isActive: 1, inStock: 1 });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
