import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

export interface IOrder extends Document {
  _id: string;
  orderId: string;
  userId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
  };
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  deliveryPartner?: {
    name: string;
    phone: string;
    vehicleNumber?: string;
  };
  notes?: string;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    required: true
  },
  imageUrl: String
});

const OrderSchema = new Schema<IOrder>({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  customerInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      }
    }
  },
  items: [OrderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    default: 0,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'upi', 'card', 'wallet']
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  transactionId: String,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  deliveryPartner: {
    name: String,
    phone: String,
    vehicleNumber: String
  },
  notes: String,
  cancelReason: String
}, {
  timestamps: true
});

// Create indexes
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'customerInfo.email': 1 });

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
