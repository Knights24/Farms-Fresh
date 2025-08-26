import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { CartProvider } from '@/context/cart-context';

export const metadata: Metadata = {
  title: 'Farm Fresh',
  description: 'Seasonal fruits and vegetables sourced directly from local farms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="bg-secondary/50 py-4">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-secondary-foreground">
                <p>&copy; {new Date().getFullYear()} Farm Fresh. All rights reserved.</p>
              </div>
            </footer>
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
