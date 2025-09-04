'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Leaf, ShoppingCart, Star, Camera, TrendingUp, Truck, Sprout, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { produce } from '@/lib/data';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';

const categories = [
  { 
    name: 'Fresh Vegetables', 
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=300&h=300',
    count: 20
  },
  { 
    name: 'Dairy & Eggs', 
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300&h=300',
    count: 15
  },
  { 
    name: 'Fresh Fruits', 
    image: 'https://images.unsplash.com/photo-1553575604-75c3e73ce8b4?auto=format&fit=crop&q=80&w=300&h=300',
    count: 18
  },
  { 
    name: 'Pantry Essentials', 
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=300&h=300',
    count: 17
  }
];

const stats = [
  { label: 'AI Technologies', value: '4+' },
  { label: 'Market Size', value: '₹850B+' },
  { label: 'Growth Rate', value: '75-100%' },
];

export default function Home() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<typeof produce>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      // Save to localStorage for search history (optional)
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const updatedHistory = [trimmedSearch, ...searchHistory.filter((item: string) => item !== trimmedSearch)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      
      router.push(`/products?search=${encodeURIComponent(trimmedSearch)}`);
    } else {
      router.push('/products');
    }
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Show suggestions when typing
    if (value.trim().length > 0) {
      const suggestions = produce.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (productName: string) => {
    setSearchTerm(productName);
    setShowSuggestions(false);
    router.push(`/products?search=${encodeURIComponent(productName)}`);
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setSearchSuggestions([]);
  };

  const handleQuickSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-20">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Leaf className="w-3 h-3 mr-1" />
                  100% Fresh & Organic
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Farms Fresh
                  <span className="text-green-600"> Goodness</span>
                  <br />Delivered Daily
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  AI-powered agricultural platform connecting farmers directly with consumers. 
                  Early-stage startup revolutionizing food supply chains with cutting-edge technology.
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <form onSubmit={handleSearch}>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input 
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder="Search for products..." 
                    className="pl-12 pr-20 py-4 text-base border-2 border-gray-200 rounded-full focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                  {searchTerm && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={clearSearch}
                      className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-0 hover:bg-gray-100 z-10"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </Button>
                  )}
                  <Button 
                    type="submit"
                    size="sm" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-green-700 z-10"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchSuggestions.length > 0 ? (
                      <>
                        <div className="p-2 border-b bg-gray-50 text-xs text-gray-600 font-medium">
                          Search Suggestions
                        </div>
                        {searchSuggestions.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSuggestionClick(item.name)}
                            className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer border-b last:border-b-0 transition-colors"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleSuggestionClick(item.name);
                              }
                            }}
                          >
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-green-700">{item.category.slice(0, 2).toUpperCase()}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">₹{item.price}/{item.unit} • {item.category}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        <div className="text-sm">No products found matching "{searchTerm}"</div>
                        <div className="text-xs mt-1">Try searching for something else</div>
                      </div>
                    )}
                    
                    {searchTerm && (
                      <div 
                        onClick={() => handleSuggestionClick(searchTerm)}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-t bg-gray-50 transition-colors"
                        role="button"
                        tabIndex={0}
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Search className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Search for "{searchTerm}"</div>
                          <div className="text-sm text-gray-500">View all results</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>



              {/* Stats */}
              <div className="flex gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=500&fit=crop&auto=format"
                  alt="Fresh produce display"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">100% Organic</div>
                    <div className="text-sm text-gray-600">Farm Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of fresh produce organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link href="/products" key={category.name} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">100% Organic</h3>
              <p className="text-gray-600">Certified organic produce grown without harmful pesticides or chemicals</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Same Day Delivery</h3>
              <p className="text-gray-600">Fresh products delivered to your doorstep within hours of harvest</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guarantee or your money back, no questions asked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Product Showcase */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional AgriTech Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farms Fresh combines cutting-edge AI technology with agricultural expertise 
              to deliver premium organic produce with complete transparency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Quality Assurance</h3>
                  <p className="text-gray-600">Every product is scanned with 99.5% accuracy using computer vision technology to ensure premium quality standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Logistics</h3>
                  <p className="text-gray-600">AI-optimized delivery routes ensure your produce reaches you fresh, reducing delivery time by 25%.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Direct from Farmers</h3>
                  <p className="text-gray-600">Supporting local farmers with fair pricing and sustainable practices. 60-70% of revenue goes directly to farmers.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">FF</span>
                      </div>
                      <span className="font-bold text-gray-900">Farms Fresh</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Premium Quality</Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">Fresh Organic Vegetables</div>
                  <div className="text-gray-600 mb-4">Farm-to-table delivery in 24 hours</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">₹299 / kg</div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Order Now
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">99.5%</div>
                    <div className="text-sm text-gray-600">Quality Score</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">24h</div>
                    <div className="text-sm text-gray-600">Delivery</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">500+</div>
                    <div className="text-sm text-gray-600">Farmers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Showcase */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-600 hover:bg-green-700">
              Early Stage Startup
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Early-stage AgriTech startup combining artificial intelligence with farming expertise 
              to revolutionize the agricultural supply chain and empower farmers across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">AI Freshness Detection</h3>
              <p className="text-gray-600 text-center text-sm">99.5% accuracy in quality assessment using computer vision</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Smart Pricing Engine</h3>
              <p className="text-gray-600 text-center text-sm">Dynamic pricing based on 8+ factors for maximum farmer value</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Logistics AI</h3>
              <p className="text-gray-600 text-center text-sm">25% delivery time reduction through route optimization</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Farmer Support AI</h3>
              <p className="text-gray-600 text-center text-sm">80% accuracy improvement in yield prediction</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">₹850B+</div>
                <div className="text-gray-600">Indian Fresh Food Market</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">60-70%</div>
                <div className="text-gray-600">Farmer Revenue Share</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">75-100%</div>
                <div className="text-gray-600">Quick Commerce Growth</div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link href="/technology">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Explore AI Technology →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Local Farms to Your Table
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with a passion for fresh, organic produce, Farms Fresh connects you directly with local farmers who share our commitment to quality and sustainability.
              </p>
              <p className="text-gray-600 mb-8">
                We work exclusively with certified organic farms, ensuring that every product meets our high standards for freshness, taste, and nutritional value. Our mission is simple: to make premium organic produce accessible and affordable for everyone.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">AI-powered freshness detection with 99.5% accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Direct farmer-to-consumer platform development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Sustainable supply chain optimization technology</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop&auto=format"
                  alt="Local farm with fresh produce"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Fresh with Our Newsletter
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get weekly updates on new arrivals, seasonal produce, exclusive offers, and healthy recipes straight to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button className="bg-green-600 hover:bg-green-700">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                No spam, unsubscribe at any time. Privacy policy applies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
