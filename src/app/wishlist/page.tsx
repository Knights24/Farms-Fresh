'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-local-storage';
import Image from 'next/image';
import { produce } from '@/lib/data';
import type { Produce } from '@/types';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Produce[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { wishlistIds, removeFromWishlist: removeFromWishlistHook, isLoaded } = useWishlist();

  // Update wishlist items when wishlist IDs change
  useEffect(() => {
    if (isLoaded) {
      const items = produce.filter(item => wishlistIds.includes(item.id));
      setWishlistItems(items);
    }
  }, [wishlistIds, isLoaded]);

  const removeFromWishlist = (itemId: string) => {
    removeFromWishlistHook(itemId);
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const addToCartFromWishlist = (item: Produce) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 mx-auto text-green-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep track of your favorite products and add them to your cart when you're ready.
          </p>
        </div>

        {!isLoaded ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Browse our products and add your favorites to your wishlist to keep track of them.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href="/products">Start Shopping</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                        data-ai-hint={item.name.split(' ')[1] ? `${item.name.split(' ')[0]} ${item.name.split(' ')[1]}`: item.name.split(' ')[0]}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-green-600">₹{item.price}</span>
                          <span className="text-sm text-gray-500">/{item.unit}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => addToCartFromWishlist(item)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
