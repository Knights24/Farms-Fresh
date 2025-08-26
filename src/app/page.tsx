import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { produce } from '@/lib/data';
import ProduceCard from '@/components/produce-card';

const featuredProducts = produce.slice(0, 3);
const categories = [
    { name: 'Fresh Vegetables', imageUrl: 'https://picsum.photos/400/302', hint: 'vegetables tomato' },
    { name: 'Dairy & Eggs', imageUrl: 'https://picsum.photos/400/303', hint: 'dairy cheese' },
    { name: 'Fruits', imageUrl: 'https://picsum.photos/400/301', hint: 'fruits pineapple' },
    { name: 'Pantry', imageUrl: 'https://picsum.photos/400/310', hint: 'pantry jars' },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image 
                src="https://picsum.photos/1200/400" 
                alt="Fresh vegetables banner"
                fill
                className="object-cover"
                data-ai-hint="vegetables banner"
            />
        </div>
        <div className="relative -mt-16 sm:-mt-8 w-full max-w-2xl mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for products" className="w-full pl-10 py-6 bg-accent border-none focus-visible:ring-primary" />
            </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((item) => (
            <ProduceCard key={item.id} produce={item} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="group text-center">
              <div className="aspect-square relative rounded-lg overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                  data-ai-hint={category.hint}
                />
              </div>
              <p className="mt-4 font-semibold text-lg">{category.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
