'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary/50 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-secondary-foreground">
        {year && <p>&copy; {year} Farm Fresh. All rights reserved.</p>}
      </div>
    </footer>
  );
}
