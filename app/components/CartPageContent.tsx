'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ImageIcon } from 'lucide-react';
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
          Start Shopping
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
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-3 text-right">Total</div>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const unitPrice = item.price + item.sizeAddon + item.materialAddon;
            const hasPersonalization = item.isPersonalizable && (
              item.customPhotoName || item.textLine1 || item.textLine2
            );

            return (
              <div key={item.cartId} className="py-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start">
                <div className="col-span-7 w-full flex gap-4 items-start">
                  {/* Product image or photo thumbnail */}
                  <div className="w-16 h-20 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                    {item.customPhotoThumbnail ? (
                      <Image
                        src={item.customPhotoThumbnail}
                        alt="Your photo"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm hover:underline">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>

                    {/* Size / Material */}
                    <div className="flex flex-wrap gap-x-3 mt-1">
                      {item.size && item.size !== 'Standard' && (
                        <p className="text-gray-500 text-xs font-medium">Size: {item.size}</p>
                      )}
                      {item.material && item.material !== 'Standard' && (
                        <p className="text-gray-500 text-xs font-medium">Finish: {item.material}</p>
                      )}
                    </div>

                    {/* Personalization summary */}
                    {hasPersonalization && (
                      <div className="mt-2 space-y-0.5">
                        {item.customPhotoName && (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 flex-shrink-0" />
                            {item.customPhotoName}
                          </p>
                        )}
                        {item.textLine1 && (
                          <p className="text-xs text-gray-400">✏ &ldquo;{item.textLine1}&rdquo;</p>
                        )}
                        {item.textLine2 && (
                          <p className="text-xs text-gray-400">✏ &ldquo;{item.textLine2}&rdquo;</p>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 font-medium mt-1">₹{unitPrice.toLocaleString('en-IN')} each</p>

                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => removeItem(item.cartId)}
                      className="text-gray-400 hover:text-red-600 text-xs font-semibold flex items-center mt-2 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-2 w-full sm:w-auto flex justify-between sm:justify-center items-center">
                  <span className="sm:hidden text-gray-500 text-sm font-medium">Qty</span>
                  <div className="flex items-center justify-between border border-gray-200 rounded px-2 h-8 w-20 bg-white">
                    <button
                      aria-label="Decrease quantity"
                      className="text-gray-400 hover:text-black transition-colors"
                      onClick={() => updateQty(item.cartId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="font-semibold text-xs">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      className="text-gray-400 hover:text-black transition-colors"
                      onClick={() => updateQty(item.cartId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-span-3 text-right w-full sm:w-auto flex justify-between sm:block items-center">
                  <span className="sm:hidden text-gray-500 text-sm font-medium">Total</span>
                  <span className="font-semibold text-sm">₹{(unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="w-full lg:w-80 bg-gray-50 rounded-lg p-6 h-fit border border-gray-100 text-sm">
        <h2 className="text-lg font-bold tracking-tight mb-4">Order Summary</h2>
        <div className="space-y-3 mb-4 font-medium text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
            <span className="text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-gray-900">{subtotal >= 999 ? 'Free' : '₹99'}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center text-gray-900">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">
            ₹{(subtotal >= 999 ? subtotal : subtotal + 99).toLocaleString('en-IN')}
          </span>
        </div>
        {subtotal > 0 && subtotal < 999 && (
          <p className="text-xs text-gray-400 mb-4">
            Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for free shipping.
          </p>
        )}
        <Link
          href="/checkout"
          className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow"
        >
          Proceed to Checkout
        </Link>
        <p className="text-xs text-gray-400 text-center mt-3">
          We&apos;ll confirm your personalized order via WhatsApp
        </p>
      </div>
    </div>
  );
}
