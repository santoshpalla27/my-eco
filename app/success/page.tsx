'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { CartItem } from '../context/CartContext';

interface OrderData {
  items: CartItem[];
  subtotal: number;
  orderNumber: string;
  email: string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('aura_order');
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
        // Clear so refreshing doesn't re-show a stale order
        sessionStorage.removeItem('aura_order');
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div className="flex-1 flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-black" strokeWidth={1.2} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
          {order ? (
            <p className="text-sm text-gray-500 font-medium">
              Thank you{order.email ? `, ${order.email.split('@')[0]}` : ''}! Your order{' '}
              <span className="text-black font-semibold">{order.orderNumber}</span> is being processed.
            </p>
          ) : (
            <p className="text-sm text-gray-500 font-medium">
              Your order has been placed successfully.
            </p>
          )}
        </div>

        {/* Order items */}
        {order && order.items.length > 0 && (
          <div className="border border-gray-100 rounded-xl p-5 mb-6 space-y-4">
            <h2 className="font-semibold text-sm text-gray-700 mb-3">Order Summary</h2>
            {order.items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3 text-sm">
                <div className="w-12 h-14 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
                </div>
                <div className="font-semibold pt-1 text-gray-900">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Shipping</span>
              <span className="text-sm font-medium text-gray-900">Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">Total</span>
              <span className="font-bold text-lg">${order.subtotal.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Link
          href="/products"
          className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
