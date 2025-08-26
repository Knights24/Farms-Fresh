'use client';

import Image from 'next/image';
import { ShoppingCart, Heart, Star, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-local-storage';
import type { Produce } from '@/types';

interface ProduceCardProps {
  produce: Produce;
  variant?: 'default' | 'compact';
}

export default function ProduceCard({ produce, variant = 'default' }: ProduceCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isInWishlist, toggleWishlist, isLoaded } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  // Use the wishlist hook to determine if item is liked
  const isLiked = isInWishlist(produce.id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(produce);
      toast({
        title: "Added to cart",
        description: `${produce.name} has been added to your cart.`,
      });
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = () => {
    if (!isLoaded) return; // Prevent action before localStorage is loaded
    
    toggleWishlist(produce.id);
    
    if (isLiked) {
      toast({
        title: "Removed from wishlist",
        description: `${produce.name} has been removed from your wishlist.`,
      });
    } else {
      toast({
        title: "Added to wishlist",
        description: `${produce.name} has been added to your wishlist.`,
      });
    }
  };

  if (variant === 'compact') {
    return (
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="relative aspect-square">
          <Image
            src={produce.imageUrl}
            alt={produce.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs">
            {produce.category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{produce.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-green-600">
              ₹{produce.price}
              <span className="text-xs font-normal text-gray-600">/{produce.unit}</span>
            </div>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={isLoading}
              className="rounded-full h-8 w-8 p-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative aspect-square">
        <Image
          src={produce.imageUrl}
          alt={produce.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700">
          {produce.category}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="rounded-full shadow-lg"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Quick Add
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{produce.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{produce.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            ₹{produce.price}
            <span className="text-sm font-normal text-gray-600">/{produce.unit}</span>
          </div>
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="rounded-full"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
