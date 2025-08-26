'use client';

import Link from 'next/link';
import { Leaf, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartSheet from '@/components/cart-sheet';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/orders', label: 'Track Orders' },
  { href: '/recipes', label: 'Recipes' },
];

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-xl font-headline font-semibold text-primary-foreground">
                <Leaf className="h-6 w-6 text-accent" />
                Farm Fresh
              </Link>
            </div>
            <nav className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
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
