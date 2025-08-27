// API client for frontend-backend communication
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://farm-fresh-7kqppf5ej-knight-igris-projects.vercel.app/api'
  : 'http://localhost:9002/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      defaultHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Authentication methods
  async login(email: string, password: string) {
    const response = await this.request<{user: any, token: string}>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.data?.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
    }
    
    return response;
  }

  async register(name: string, email: string, password: string) {
    const response = await this.request<{user: any, token: string}>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (response.success && response.data?.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
    }
    
    return response;
  }

  async logout() {
    const response = await this.request('/auth/login', {
      method: 'DELETE',
    });
    
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    
    return response;
  }

  // Product methods
  async getProducts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const endpoint = queryParams.toString() ? `/products?${queryParams}` : '/products';
    return this.request(endpoint);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Order methods
  async getOrders(params?: { status?: string; userId?: string }) {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.userId) queryParams.append('userId', params.userId);
    
    const endpoint = queryParams.toString() ? `/orders?${queryParams}` : '/orders';
    return this.request(endpoint);
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Checkout method
  async processCheckout(checkoutData: any) {
    return this.request('/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types for use in components
export type { ApiResponse };
