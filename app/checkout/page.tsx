import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '../data/mock';

export default function CheckoutPage() {
  const cartItems = PRODUCTS.slice(0, 2);
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="font-semibold mb-3 text-sm">Contact</h2>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" placeholder="Email" />
          </div>

          <div>
            <h2 className="font-semibold mb-3 text-sm">Shipping</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black" placeholder="First name" />
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black" placeholder="Last name" />
              <input type="text" className="col-span-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black" placeholder="Address" />
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black" placeholder="City" />
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black" placeholder="Zip code" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="space-y-4">
            {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-16 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0 mt-1">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                    <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">1</span>
                  </div>
                  <div className="flex-1 pr-2 pt-1 font-medium">
                    <h4 className="line-clamp-2 text-gray-800">{item.name}</h4>
                  </div>
                  <div className="font-semibold pt-1 text-gray-900">
                    ${item.price}
                  </div>
                </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-900 font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-900 font-medium">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-gray-900">
            <span className="font-semibold text-sm">Total</span>
            <span className="font-bold text-xl">${subtotal}</span>
          </div>

          <Link href="/success" className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow mt-4">
            Pay ${subtotal}
          </Link>
        </div>
      </div>
    </div>
  );
}
