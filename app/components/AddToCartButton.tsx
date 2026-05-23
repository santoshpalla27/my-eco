'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/mock';
import { ShoppingCart, Check } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, {
      quantity,
      size: 'Standard',
      material: 'Standard',
      sizeAddon: 0,
      materialAddon: 0,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex gap-3 mb-8">
      <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 w-28 h-11 bg-white">
        <button
          aria-label="Decrease quantity"
          className="text-gray-400 font-medium hover:text-black transition-colors"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span className="text-sm font-semibold">{quantity}</span>
        <button
          aria-label="Increase quantity"
          className="text-gray-400 font-medium hover:text-black transition-colors"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>

      <button
        id="add-to-cart-btn"
        onClick={handleAdd}
        className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-semibold h-11 text-sm shadow transition-all ${
          added ? 'bg-gray-800 text-white' : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
