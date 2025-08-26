'use client';

import Image from 'next/image';
import type { Produce } from '@/types';

interface ProduceCardProps {
  produce: Produce;
}

export default function ProduceCard({ produce }: ProduceCardProps) {
  return (
    <div className="group text-center">
      <div className="aspect-square relative rounded-lg overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
        <Image
          src={produce.imageUrl}
          alt={produce.name}
          fill
          className="object-cover"
          data-ai-hint={produce.name.split(' ')[1] ? `${produce.name.split(' ')[0]} ${produce.name.split(' ')[1]}`: produce.name.split(' ')[0]}
        />
      </div>
      <p className="mt-4 font-semibold text-lg">{produce.name}</p>
    </div>
  );
}
