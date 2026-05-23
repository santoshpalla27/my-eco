'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Check, Pencil } from 'lucide-react';
import { Product } from '../data/mock';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, {
      quantity: 1,
      size: 'Standard',
      material: 'Standard',
      sizeAddon: 0,
      materialAddon: 0,
    });
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
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-gray-900 truncate" title={product.name}>
            {product.name}
          </h3>
          {/* Personalizable chip */}
          {product.isPersonalizable && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 mt-0.5">
              <Pencil className="w-2.5 h-2.5" strokeWidth={2} />
              Personalizable
            </span>
          )}
          <p className="text-gray-900 font-semibold text-base mt-1">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </Link>

      {/* Quick action — only for non-personalizable items */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {product.isPersonalizable ? (
          <Link
            href={`/products/${product.id}`}
            className="bg-white text-black h-8 px-3 rounded text-xs font-semibold shadow border border-gray-100 hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" strokeWidth={2} />
            Customize
          </Link>
        ) : (
          <button
            id={`quick-add-${product.id}`}
            aria-label={`Quick add ${product.name} to cart`}
            onClick={handleQuickAdd}
            className={`h-8 px-3 rounded text-xs font-semibold shadow border transition-colors flex items-center gap-1 ${
              added ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100 hover:bg-gray-50'
            }`}
          >
            {added ? <><Check className="w-3 h-3" /> Added</> : 'Add'}
          </button>
        )}
      </div>
    </div>
  );
}
