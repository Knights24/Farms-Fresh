import type { Produce, Order } from '@/types';

export const produce: Produce[] = [
  {
    id: '1',
    name: 'Fresh Mangoes',
    price: 150,
    unit: 'kg',
    imageUrl: 'https://picsum.photos/400/301',
    category: 'Fruits',
    description: 'Juicy and sweet Alphonso mangoes, perfect for a summer treat.',
  },
  {
    id: '2',
    name: 'Okra (Bhindi)',
    price: 60,
    unit: 'kg',
    imageUrl: 'https://picsum.photos/400/302',
    category: 'Vegetables',
    description: 'Tender and fresh okra, ideal for making classic Indian dishes.',
  },
  {
    id: '3',
    name: 'Paneer',
    price: 400,
    unit: 'kg',
    imageUrl: 'https://picsum.photos/400/303',
    category: 'Dairy',
    description: 'Creamy and fresh paneer (cottage cheese), a staple in Indian cuisine.',
  },
  {
    id: '4',
    name: 'Spinach (Palak)',
    price: 40,
    unit: 'bunch',
    imageUrl: 'https://picsum.photos/400/304',
    category: 'Vegetables',
    description: 'Nutritious and tender spinach leaves, great for Palak Paneer.',
  },
  {
    id: '5',
    name: 'Onions',
    price: 30,
    unit: 'kg',
    imageUrl: 'https://picsum.photos/400/305',
    category: 'Vegetables',
    description: 'Crisp and pungent onions, the base for many Indian curries.',
  },
  {
    id: '6',
    name: 'Bananas',
    price: 50,
    unit: 'dozen',
    imageUrl: 'https://picsum.photos/400/306',
    category: 'Fruits',
    description: 'Ripe and sweet bananas, a great source of energy.',
  },
  {
    id: '7',
    name: 'Tomatoes',
    price: 40,
    unit: 'kg',
    imageUrl: 'https://picsum.photos/400/307',
    category: 'Vegetables',
    description: 'Juicy red tomatoes, essential for sauces, salads, and curries.',
  },
  {
    id: '8',
    name: 'Potatoes',
    price: 35,
    unit: 'kg',
    imageUrl: 'https://picsum.photos/400/308',
    category: 'Vegetables',
    description: 'Versatile potatoes, perfect for curries, fries, and sabzis.',
  },
];


export const orders: Order[] = [
  {
    id: 'FF1024',
    date: '2024-07-20',
    status: 'Out for Delivery',
    estimatedDelivery: 'Today, 4:30 PM',
    items: [
      { id: '1', name: 'Fresh Mangoes', price: 150, quantity: 2, imageUrl: 'https://picsum.photos/400/301' },
      { id: '3', name: 'Paneer', price: 400, quantity: 1, imageUrl: 'https://picsum.photos/400/303' },
    ],
    total: 700,
  },
  {
    id: 'FF1023',
    date: '2024-07-15',
    status: 'Delivered',
    estimatedDelivery: 'July 15, 2024',
    items: [
      { id: '2', name: 'Okra (Bhindi)', price: 60, quantity: 1, imageUrl: 'https://picsum.photos/400/302' },
    ],
    total: 60,
  },
];
