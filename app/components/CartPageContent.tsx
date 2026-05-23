'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPageContent() {
  const { items, subtotal, updateQty, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" strokeWidth={1} />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-400 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="bg-black text-white px-6 h-10 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Items */}
      <div className="flex-1">
        <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-7">Product</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-3 text-right">Total</div>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="py-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
            >
              <div className="col-span-7 w-full flex gap-4 items-center">
                <div className="w-16 h-20 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm hover:underline">
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5 font-medium">Size: {item.size}</p>
                  <button
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-gray-400 hover:text-red-600 text-xs font-semibold flex items-center mt-2 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                  </button>
                </div>
              </div>

              <div className="col-span-2 w-full sm:w-auto flex justify-between sm:justify-center">
                <span className="sm:hidden text-gray-500 text-sm font-medium">Quantity</span>
                <div className="flex items-center justify-between border border-gray-200 rounded px-2 h-8 w-20 bg-white">
                  <button
                    aria-label="Decrease quantity"
                    className="text-gray-400 hover:text-black transition-colors"
                    onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="font-semibold text-xs">{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="text-gray-400 hover:text-black transition-colors"
                    onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-3 text-right w-full sm:w-auto flex justify-between sm:block">
                <span className="sm:hidden text-gray-500 text-sm font-medium">Total</span>
                <span className="font-semibold text-sm">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="w-full lg:w-80 bg-gray-50 rounded-lg p-6 h-fit border border-gray-100 text-sm">
        <h2 className="text-lg font-bold tracking-tight mb-4">Summary</h2>
        <div className="space-y-3 mb-4 font-medium text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
            <span className="text-gray-900">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-gray-900">Free</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center text-gray-900">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">${subtotal.toLocaleString()}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
