'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Product } from '../data/mock';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, 1, 'M');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-gray-900 truncate" title={product.name}>
            {product.name}
          </h3>
          <p className="text-gray-900 font-semibold text-base mt-0.5">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          id={`quick-add-${product.id}`}
          aria-label={`Quick add ${product.name} to cart`}
          onClick={handleQuickAdd}
          className={`h-8 px-3 rounded text-xs font-semibold shadow border transition-colors flex items-center gap-1 ${
            added
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-100 hover:bg-gray-50'
          }`}
        >
          {added ? <><Check className="w-3 h-3" /> Added</> : 'Add'}
        </button>
      </div>
    </div>
  );
}
