import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../data/mock";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const cartItems = PRODUCTS.slice(0, 2);
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
            <div className="col-span-7">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="divide-y divide-gray-100">
            {cartItems.map(item => (
              <div key={item.id} className="py-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                <div className="col-span-7 w-full flex gap-4 items-center">
                  <div className="w-16 h-20 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm hover:underline"><Link href={`/products/${item.id}`}>{item.name}</Link></h3>
                    <p className="text-gray-500 text-xs mt-0.5 font-medium">Size: M</p>
                    <button className="text-gray-400 hover:text-red-600 text-xs font-semibold flex items-center mt-2 transition-colors">
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                    </button>
                  </div>
                </div>
                <div className="col-span-2 w-full sm:w-auto flex justify-between sm:justify-center">
                  <span className="sm:hidden text-gray-500 text-sm font-medium">Quantity</span>
                  <div className="flex items-center justify-between border border-gray-200 rounded px-2 h-8 w-20 bg-white">
                    <button className="text-gray-400 hover:text-black transition-colors">-</button>
                    <span className="font-semibold text-xs">1</span>
                    <button className="text-gray-400 hover:text-black transition-colors">+</button>
                  </div>
                </div>
                <div className="col-span-3 text-right w-full sm:w-auto flex justify-between sm:block">
                  <span className="sm:hidden text-gray-500 text-sm font-medium">Total</span>
                  <span className="font-semibold text-sm">${item.price}</span>
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
              <span>Subtotal</span>
              <span className="text-gray-900">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-900">Calculated</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center text-gray-900">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-xl">${subtotal}</span>
          </div>
          <Link href="/checkout" className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
