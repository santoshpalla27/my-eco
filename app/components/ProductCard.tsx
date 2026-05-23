import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../data/mock';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-gray-900 truncate" title={product.name}>
            {product.name}
          </h3>
          <p className="text-gray-900 font-semibold text-base mt-0.5">
            ${product.price}
          </p>
        </div>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-white text-black h-8 px-3 rounded text-xs font-semibold shadow border border-gray-100 hover:bg-gray-50 transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}
