import mongoose, { Schema, Document } from 'mongoose';

// User Model
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'farmer';
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'farmer'],
    default: 'customer'
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
