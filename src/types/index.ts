export type Produce = {
  id: string;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  category: string;
  description: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  imageUrl: string;
  category: string;
  description: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  items: CartItem[];
  total: number;
};
