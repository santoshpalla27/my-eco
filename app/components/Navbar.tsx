'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/mock';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/corporate', label: 'Corporate Gifts' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold tracking-tighter" onClick={() => setMobileOpen(false)}>
                GiftCraft
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button
                id="search-toggle"
                aria-label="Open search"
                className="text-gray-700 hover:text-black hover:scale-105 transition-all"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <Link href="/cart" aria-label="Shopping cart" className="text-gray-700 hover:text-black hover:scale-105 transition-all relative">
                <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <button aria-label="Account" className="text-gray-700 hover:text-black hover:scale-105 transition-all hidden md:block">
                <User className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <button
                id="mobile-menu-toggle"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="text-gray-700 hover:text-black md:hidden"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-sm font-medium text-gray-700 hover:text-black py-2 border-b border-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center border-b border-gray-100 px-4">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" strokeWidth={1.5} />
              <input
                ref={searchRef}
                id="search-input"
                type="text"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false);
                  if (e.key === 'Enter' && query.trim()) {
                    setSearchOpen(false);
                    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
                  }
                }}
                className="flex-1 px-3 py-4 text-sm focus:outline-none bg-transparent"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-gray-400 hover:text-black transition-colors">
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {results.length > 0 && (
              <ul className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="text-xs text-gray-400 capitalize w-20 flex-shrink-0">{p.category}</div>
                      <div className="flex-1 text-sm font-medium text-gray-900">{p.name}</div>
                      <div className="text-sm font-semibold text-gray-900">${p.price.toLocaleString()}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query.trim() && results.length === 0 && (
              <p className="px-4 py-6 text-sm text-gray-400 text-center">No products found for &ldquo;{query}&rdquo;</p>
            )}

            {!query.trim() && (
              <p className="px-4 py-6 text-sm text-gray-400 text-center">Start typing to search…</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
