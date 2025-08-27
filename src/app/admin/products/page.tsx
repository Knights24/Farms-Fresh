'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
  unit: string;
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  benefits: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    unit: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    benefits: '',
    inStock: true
  });

  const categories = ['vegetables', 'fruits', 'herbs', 'grains', 'dairy'];

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
    
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/products?search=${searchTerm}&category=${selectedCategory}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.products);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Products error:', error);
      setError('An error occurred while loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct._id}` 
        : '/api/admin/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        category: formData.category,
        image: formData.image,
        unit: formData.unit,
        inStock: formData.inStock,
        nutritionInfo: {
          calories: parseInt(formData.calories),
          protein: formData.protein,
          carbs: formData.carbs,
          fat: formData.fat
        },
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b)
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowAddForm(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        setError(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Save product error:', error);
      setError('An error occurred while saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchProducts();
      } else {
        setError(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      setError('An error occurred while deleting product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      image: '',
      unit: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      benefits: '',
      inStock: true
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      image: product.image,
      unit: product.unit,
      calories: product.nutritionInfo.calories.toString(),
      protein: product.nutritionInfo.protein,
      carbs: product.nutritionInfo.carbs,
      fat: product.nutritionInfo.fat,
      benefits: product.benefits.join(', '),
      inStock: product.inStock
    });
    setShowAddForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
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
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowAddForm(true)}>Add Product</Button>
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
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:w-64"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <Button onClick={fetchProducts}>Search</Button>
        </div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      placeholder="e.g., kg, piece, bunch"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={formData.calories}
                      onChange={(e) => setFormData({...formData, calories: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="protein">Protein</Label>
                    <Input
                      id="protein"
                      value={formData.protein}
                      onChange={(e) => setFormData({...formData, protein: e.target.value})}
                      placeholder="e.g., 2.5g"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="carbs">Carbs</Label>
                    <Input
                      id="carbs"
                      value={formData.carbs}
                      onChange={(e) => setFormData({...formData, carbs: e.target.value})}
                      placeholder="e.g., 15g"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat">Fat</Label>
                    <Input
                      id="fat"
                      value={formData.fat}
                      onChange={(e) => setFormData({...formData, fat: e.target.value})}
                      placeholder="e.g., 0.5g"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                  <Input
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    placeholder="Rich in Vitamin C, High in fiber, Antioxidant properties"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProduct(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">per {product.unit}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(product)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product._id)}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <Button onClick={() => setShowAddForm(true)} className="mt-4">
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
