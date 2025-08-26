import type { Produce, Order } from '@/types';

export const produce: Produce[] = [
  {
    id: '1',
    name: 'Organic Strawberries',
    price: 4.99,
    unit: 'lb',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Fruits',
    description: 'Sweet and juicy organic strawberries, perfect for desserts or a healthy snack.',
  },
  {
    id: '2',
    name: 'Heirloom Tomatoes',
    price: 3.49,
    unit: 'lb',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Vegetables',
    description: 'Flavorful heirloom tomatoes with a unique, rich taste. Ideal for salads and sauces.',
  },
  {
    id: '3',
    name: 'Hass Avocados',
    price: 1.99,
    unit: 'each',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Fruits',
    description: 'Creamy Hass avocados, great for toast, guacamole, or adding to salads.',
  },
  {
    id: '4',
    name: 'Leafy Spinach',
    price: 2.99,
    unit: 'bunch',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Vegetables',
    description: 'Tender and nutritious spinach, packed with vitamins and minerals.',
  },
  {
    id: '5',
    name: 'Sweet Corn',
    price: 0.79,
    unit: 'ear',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Vegetables',
    description: 'Crisp and sweet corn on the cob, a perfect side for any summer meal.',
  },
  {
    id: '6',
    name: 'Blueberries',
    price: 5.99,
    unit: 'pint',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Fruits',
    description: 'Plump and antioxidant-rich blueberries, delicious in smoothies or by the handful.',
  },
  {
    id: '7',
    name: 'Red Bell Peppers',
    price: 1.49,
    unit: 'each',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Vegetables',
    description: 'Sweet and crunchy red bell peppers, excellent for stir-fries, salads, or roasting.',
  },
  {
    id: '8',
    name: 'Zucchini Squash',
    price: 1.29,
    unit: 'lb',
    imageUrl: 'https://picsum.photos/400/300',
    category: 'Vegetables',
    description: 'Versatile zucchini squash, perfect for grilling, sautéing, or making zoodles.',
  },
];


export const orders: Order[] = [
  {
    id: 'FF1024',
    date: '2024-07-20',
    status: 'Out for Delivery',
    estimatedDelivery: 'Today, 4:30 PM',
    items: [
      { id: '1', name: 'Organic Strawberries', price: 4.99, quantity: 2, imageUrl: 'https://picsum.photos/400/300' },
      { id: '3', name: 'Hass Avocados', price: 1.99, quantity: 4, imageUrl: 'https://picsum.photos/400/300' },
    ],
    total: 17.94,
  },
  {
    id: 'FF1023',
    date: '2024-07-15',
    status: 'Delivered',
    estimatedDelivery: 'July 15, 2024',
    items: [
      { id: '2', name: 'Heirloom Tomatoes', price: 3.49, quantity: 3, imageUrl: 'https://picsum.photos/400/300' },
    ],
    total: 10.47,
  },
];
