import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-sm">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white shadow-md">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
        <p className="text-sm text-gray-500 mb-8 font-medium">
          Thank you for your purchase. Your order <span className="text-black font-semibold">#AURA-98745</span> is processing.
        </p>
        <Link href="/products" className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
