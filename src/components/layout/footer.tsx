'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.svg?v=2"
                  alt="Farm Fresh Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold">Farm Fresh</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for fresh, organic produce delivered straight from local farms to your doorstep. 
              Quality guaranteed, freshness assured.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 9328797168</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>vivekvishwakarma21@outlook.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/recipes" className="block text-gray-300 hover:text-white transition-colors">
                Shop
              </Link>
              <Link href="/orders" className="block text-gray-300 hover:text-white transition-colors">
                My Orders
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <nav className="space-y-2">
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Delivery Info
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Returns Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Farm Fresh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
