import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-sm">
        <p className="text-7xl font-bold tracking-tighter text-gray-900 mb-4">404</p>
        <h1 className="text-xl font-semibold tracking-tight mb-2">Page not found</h1>
        <p className="text-sm text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/products"
          className="bg-black text-white px-6 h-10 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center text-sm shadow"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
