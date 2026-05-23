'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="bg-white border-t border-gray-100 py-8 text-xs mt-auto">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-sm tracking-tighter">AURA</h3>
            <p className="text-gray-500">Premium quality basics, designed to last a lifetime.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="space-y-1 text-gray-500">
              <li><Link href="/products" className="hover:text-black transition-colors">All Products</Link></li>
              <li><Link href="/products?category=men" className="hover:text-black transition-colors">Men</Link></li>
              <li><Link href="/products?category=women" className="hover:text-black transition-colors">Women</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-black transition-colors">Accessories</Link></li>
              <li><Link href="/products?category=shoes" className="hover:text-black transition-colors">Footwear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-gray-500">
              <li><Link href="#" className="hover:text-black transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Shipping &amp; Returns</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Newsletter</h4>
            {subscribed ? (
              <p className="text-gray-500">Thanks for subscribing! 🎉</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex h-9">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 text-xs border border-gray-200 border-r-0 rounded-l-lg focus:outline-none focus:border-black transition-all"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="bg-black text-white px-3 font-medium border border-black rounded-r-lg hover:bg-gray-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© 2026 Aura.</p>
          <div className="flex space-x-3 mt-2 md:mt-0">
            <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
