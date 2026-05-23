import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              AURA
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Shop
            </Link>
            <Link href="/products?category=women" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Women
            </Link>
            <Link href="/products?category=men" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Men
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-black hover:scale-105 transition-all">
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <Link href="/cart" className="text-gray-700 hover:text-black hover:scale-105 transition-all relative">
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
            <button className="text-gray-700 hover:text-black hover:scale-105 transition-all hidden md:block">
              <User className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button className="text-gray-700 hover:text-black md:hidden">
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
