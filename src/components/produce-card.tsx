'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import type { Produce } from '@/types';

interface ProduceCardProps {
  produce: Produce;
}

export default function ProduceCard({ produce }: ProduceCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] relative">
          <Image
            src={produce.imageUrl}
            alt={produce.name}
            fill
            className="object-cover"
            data-ai-hint={produce.name.split(' ')[1] ? `${produce.name.split(' ')[0]} ${produce.name.split(' ')[1]}`: produce.name.split(' ')[0]}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline">{produce.name}</CardTitle>
        <CardDescription className="mt-1 text-sm">{produce.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <p className="text-lg font-semibold text-primary-foreground">
          ₹{produce.price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground"> / {produce.unit}</span>
        </p>
        <Button size="sm" onClick={() => addToCart(produce)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
}
