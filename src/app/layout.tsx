import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { CartProvider } from '@/context/cart-context';
import Footer from '@/components/layout/footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Farm Fresh',
  description: 'Fresh, organic produce delivered straight from trusted local farms to your doorstep. Quality guaranteed, freshness assured.',
  keywords: 'organic produce, fresh vegetables, farm fresh, organic fruits, local farms, grocery delivery',
  authors: [{ name: 'Farm Fresh Team' }],
  openGraph: {
    title: 'Farm Fresh',
    description: 'Fresh, organic produce delivered straight from trusted local farms to your doorstep.',
    type: 'website',
    images: ['/images/logo.svg?v=2'],
  },
  icons: {
    icon: '/images/logo.svg?v=2',
    apple: '/images/logo.svg?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-body antialiased`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
