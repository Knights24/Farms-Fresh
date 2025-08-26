import { produce } from '@/lib/data';
import ProduceCard from '@/components/produce-card';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary-foreground tracking-tight">
          Today's Harvest
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Freshly picked from local farms, delivered to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produce.map((item) => (
          <ProduceCard key={item.id} produce={item} />
        ))}
      </div>
    </div>
  );
}
