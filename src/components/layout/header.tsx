'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Leaf, ShoppingCart, Search, Menu, User, LogOut, Settings, Heart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartSheet from '@/components/cart-sheet';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/orders', label: 'Orders' },
  { href: '/technology', label: 'AI Technology' },
  { href: '/investors', label: 'Investors' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/logo.svg?v=2"
                    alt="Farms Fresh Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                Farms Fresh
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={`${link.href}-${link.label}`} 
                  href={link.href} 
                  className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white text-sm" 
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search (Mobile) */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden hover:bg-gray-100 rounded-lg"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* User Account - Portfolio Demo */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex hover:bg-gray-100 rounded-lg"
                title="User Account (Demo)"
              >
                <User className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCartOpen(true)} 
                className="relative hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-green-600 hover:bg-green-600">
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link 
                    key={`mobile-${link.href}-${link.label}`} 
                    href={link.href} 
                    className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white text-sm" 
                />
              </form>
            </div>
          )}
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
