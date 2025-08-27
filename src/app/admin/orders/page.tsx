'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
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
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      router.push('/admin/login');
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
    
    fetchOrders();
  }, [router, statusFilter]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/orders?status=${statusFilter}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data.orders);
      } else {
        setError('Failed to load orders');
      }
    } catch (error) {
      console.error('Orders error:', error);
      setError('An error occurred while loading orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchOrders(); // Refresh orders list
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus as any });
        }
      } else {
        setError(data.error || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Update order error:', error);
      setError('An error occurred while updating order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'default';
      case 'processing': return 'outline';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="outline">← Dashboard</Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/products">
                <Button variant="outline">Manage Products</Button>
              </Link>
              <Button onClick={handleLogout} variant="destructive">Logout</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <div className="text-sm text-gray-600">
              Total Orders: {orders.length}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Orders List</h2>
            {orders.map((order) => (
              <Card 
                key={order._id} 
                className={`cursor-pointer transition-colors ${
                  selectedOrder?._id === order._id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{order.totalAmount}</span>
                    <span className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No orders found for the selected filter
              </div>
            )}
          </div>

          {/* Order Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            {selectedOrder ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order #{selectedOrder.orderNumber}</span>
                    <Badge variant={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                      <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                      <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                      <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                      <p>{selectedOrder.shippingAddress.zipCode}, {selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.price * item.quantity}</p>
                            <p className="text-sm text-gray-600">₹{item.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="font-semibold mb-2">Payment Information</h3>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                      <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                      <p><strong>Status:</strong> {selectedOrder.paymentStatus}</p>
                      <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
                    </div>
                  </div>

                  {/* Update Status */}
                  <div>
                    <h3 className="font-semibold mb-2">Update Order Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <Button
                          key={status}
                          variant={selectedOrder.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateOrderStatus(selectedOrder._id, status)}
                          disabled={selectedOrder.status === status}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Select an order to view details
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
