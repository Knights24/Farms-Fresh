'use client';

import Link from 'next/link';
import { Leaf, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartSheet from '@/components/cart-sheet';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { Input } from '../ui/input';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'Categories' },
  { href: '#', label: 'Deals' },
  { href: '#', label: 'Contact' },
];

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
                <Leaf className="h-7 w-7 text-primary" />
                Farms Fresh
              </Link>
            </div>
            <nav className="hidden lg:flex lg:space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
               <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="w-full pl-9 bg-accent border-none" />
               </div>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative bg-accent">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
