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
  title: 'Farm Fresh - Portfolio Project | Vivek Vishwakarma',
  description: 'Full-Stack Agricultural E-Commerce Platform - A portfolio project demonstrating modern web development skills with Next.js, TypeScript, MongoDB, and Tailwind CSS.',
  keywords: 'portfolio, full-stack developer, nextjs, typescript, mongodb, tailwindcss, e-commerce, react, web development, vivek vishwakarma',
  authors: [{ name: 'Vivek Vishwakarma', url: 'https://github.com/Knights24' }],
  creator: 'Vivek Vishwakarma',
  openGraph: {
    title: 'Farm Fresh - Portfolio Project',
    description: 'Full-Stack Agricultural E-Commerce Platform showcasing modern web development skills.',
    type: 'website',
    siteName: 'Farm Fresh Portfolio',
    images: ['/images/logo.svg?v=2'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farm Fresh - Portfolio Project',
    description: 'Full-Stack E-Commerce Platform built with Next.js & TypeScript',
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
