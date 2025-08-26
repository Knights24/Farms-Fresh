import { orders } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Truck, CheckCircle } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary-foreground tracking-tight">
          Your Orders
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Track your fresh deliveries and view your order history.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between bg-card/80 p-4">
              <div>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <CardDescription>Date: {order.date}</CardDescription>
              </div>
              <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'} className={order.status !== 'Delivered' ? 'bg-accent text-accent-foreground' : ''}>
                {order.status === 'Out for Delivery' && <Truck className="mr-2 h-4 w-4" />}
                {order.status === 'Delivered' && <CheckCircle className="mr-2 h-4 w-4" />}
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                     <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-md object-cover"
                      data-ai-hint="produce"
                    />
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                 <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-medium">Order Total</p>
                    <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
