import { useState, useEffect } from 'react';
import { apiClient, type ApiResponse } from '@/lib/api-client';
import { useToast } from './use-toast';
import type { Produce, Order } from '@/types';

// Define API response types
interface ProductsResponse {
  products: Produce[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    productsPerPage: number;
  };
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
  expiresIn: string;
}

interface CheckoutResponse {
  orderId: string;
  transactionId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  timestamp: string;
}

// Hook for fetching products with loading and error states
export function useProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const [products, setProducts] = useState<Produce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProductsResponse['pagination'] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.getProducts(params);
        
        if (response.success && response.data) {
          const data = response.data as ProductsResponse;
          setProducts(data.products || []);
          setPagination(data.pagination || null);
        } else {
          setError(response.error || 'Failed to fetch products');
          toast({
            title: "Error",
            description: response.error || 'Failed to fetch products',
            variant: "destructive",
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [params?.category, params?.search, params?.page, params?.limit]);

  const refetch = () => {
    setLoading(true);
    // Re-trigger useEffect
  };

  return {
    products,
    loading,
    error,
    pagination,
    refetch
  };
}

// Hook for fetching a single product
export function useProduct(id: string) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.getProduct(id);
        
        if (response.success) {
          setProduct(response.data);
        } else {
          setError(response.error || 'Product not found');
          toast({
            title: "Error",
            description: response.error || 'Product not found',
            variant: "destructive",
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error
  };
}

// Hook for fetching orders
export function useOrders(params?: { status?: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.getOrders(params);
        
        if (response.success && response.data) {
          setOrders(Array.isArray(response.data) ? response.data : []);
        } else {
          setError(response.error || 'Failed to fetch orders');
          toast({
            title: "Error",
            description: response.error || 'Failed to fetch orders',
            variant: "destructive",
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [params?.status]);

  const refetch = () => {
    setLoading(true);
    // Re-trigger useEffect
  };

  return {
    orders,
    loading,
    error,
    refetch
  };
}

// Hook for authentication
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.login(email, password);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        return true;
      } else {
        setError(response.error || 'Login failed');
        toast({
          title: "Login Failed",
          description: response.error || 'Invalid credentials',
          variant: "destructive",
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.register(name, email, password);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        return true;
      } else {
        setError(response.error || 'Registration failed');
        toast({
          title: "Registration Failed",
          description: response.error || 'Unable to create account',
          variant: "destructive",
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await apiClient.logout();
      setUser(null);
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return apiClient.isAuthenticated() && user !== null;
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated
  };
}

// Hook for checkout process
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const processCheckout = async (checkoutData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.processCheckout(checkoutData);
      
      if (response.success && response.data) {
        const checkoutData = response.data as CheckoutResponse;
        toast({
          title: "Payment Successful",
          description: `Order ${checkoutData.orderId} has been placed successfully`,
        });
        return checkoutData;
      } else {
        setError(response.error || 'Payment failed');
        toast({
          title: "Payment Failed",
          description: response.error || 'Unable to process payment',
          variant: "destructive",
        });
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    processCheckout,
    loading,
    error
  };
}
