'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { CartItem } from '../context/CartContext';
import { STORE_CONFIG } from '../data/config';

interface OrderData {
  items: CartItem[];
  subtotal: number;
  total: number;
  orderNumber: string;
  email: string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('giftcraft_order');
    if (raw) {
      try { setOrder(JSON.parse(raw)); sessionStorage.removeItem('giftcraft_order'); }
      catch { /* ignore */ }
    }
  }, []);

  return (
    <div className="flex-1 flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-black" strokeWidth={1.2} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Order Placed!</h1>
          <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">
            {order
              ? <>Your gift is being crafted with love! Order <span className="text-black font-semibold">{order.orderNumber}</span> has been received.</>
              : 'Your gift is being crafted with love! We\'ll be in touch shortly.'}
          </p>
        </div>

        {/* WhatsApp follow-up */}
        <div className="border border-gray-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-600" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-semibold text-gray-800">What happens next?</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Your order details have been shared with us on WhatsApp. We&apos;ll confirm your personalized items,
              arrange payment, and keep you updated throughout crafting and delivery.
            </p>
          </div>
        </div>

        {/* Order items */}
        {order && order.items.length > 0 && (
          <div className="border border-gray-100 rounded-xl p-5 mb-6 space-y-4">
            <h2 className="font-semibold text-sm text-gray-700">Order Summary</h2>
            {order.items.map((item) => {
              const unitPrice = item.price + item.sizeAddon + item.materialAddon;
              return (
                <div key={item.cartId} className="flex gap-3 text-sm">
                  <div className="w-12 h-14 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                    {item.customPhotoThumbnail ? (
                      <Image src={item.customPhotoThumbnail} alt="Your photo" fill className="object-cover" unoptimized />
                    ) : (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                    <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    {item.size !== 'Standard' && <p className="text-xs text-gray-400">{item.size}</p>}
                    {item.textLine1 && <p className="text-xs text-gray-400">&ldquo;{item.textLine1}&rdquo;</p>}
                  </div>
                  <div className="font-semibold pt-1 whitespace-nowrap">₹{(unitPrice * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              );
            })}
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="text-sm font-semibold">Total Paid</span>
              <span className="font-bold">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm shadow"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
            Chat with Us on WhatsApp
          </a>
          <Link href="/products" className="w-full border border-gray-200 text-gray-700 h-11 rounded-lg font-semibold hover:border-black hover:text-black transition-colors flex items-center justify-center text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
