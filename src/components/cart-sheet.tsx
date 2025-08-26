'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <Sheet open={open} onOpen-change={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint={item.name.split(' ')[1] ? `${item.name.split(' ')[0]} ${item.name.split(' ')[1]}`: item.name.split(' ')[0]}
                    />
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                        className="h-8 w-16 text-center"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
                   <SheetClose asChild>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Checkout</Button>
                   </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some fresh produce to get started!</p>
            <SheetClose asChild>
                <Button className="mt-4" variant="outline">Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
