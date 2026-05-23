'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/mock';
import { ShoppingCart, Check } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      {/* Size selector */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Size</h3>
          <button className="text-xs text-gray-500 underline">Size Guide</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              id={`size-${size}`}
              aria-label={`Select size ${size}`}
              aria-pressed={selectedSize === size}
              onClick={() => setSelectedSize(size)}
              className={`border h-10 text-sm font-medium rounded-lg transition-colors ${
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-black text-gray-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart */}
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
            added
              ? 'bg-gray-800 text-white'
              : 'bg-black text-white hover:bg-gray-800'
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
    </div>
  );
}
