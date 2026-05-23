import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../../data/mock";
import ProductCard from "../../components/ProductCard";
import { Star } from "lucide-react";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find(p => p.id === resolvedParams.id) || PRODUCTS[0];
  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      <nav className="text-xs text-gray-500 mb-6 font-medium">
        <Link href="/" className="hover:text-black">Home</Link> <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black">Products</Link> <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
        {/* Gallery - 40% */}
        <div className="w-full lg:w-[40%] flex gap-4 max-w-[450px]">
          <div className="hidden sm:flex flex-col gap-3 w-16 flex-shrink-0">
             {[1, 2, 3, 4].map(i => (
                <div key={i} className={`relative border rounded-lg aspect-[3/4] cursor-pointer overflow-hidden ${i === 1 ? 'border-black' : 'border-transparent hover:border-gray-300'}`}>
                   <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
             ))}
          </div>
          <div className="relative aspect-[3/4] w-full bg-accent rounded-lg overflow-hidden border border-gray-100">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>
        </div>

        {/* Details - 60% */}
        <div className="flex-1 flex flex-col pt-0 lg:pt-2">
          <h1 className="text-2xl font-bold tracking-tight mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-3">${product.price}</p>
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-6">
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            {product.rating} <span className="underline ml-1">128 Reviews</span>
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Size</h3>
              <button className="text-xs text-gray-500 underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
                <button key={size} className={`border h-10 text-sm font-medium rounded-lg ${i === 2 ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black text-gray-700'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-8">
             <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 w-28 h-11 bg-white">
               <button className="text-gray-400 font-medium hover:text-black">-</button>
               <span className="text-sm font-semibold">1</span>
               <button className="text-gray-400 font-medium hover:text-black">+</button>
             </div>
             <Link href="/cart" className="flex-1 bg-black text-white flex items-center justify-center rounded-lg font-semibold hover:bg-gray-800 transition-colors h-11 text-sm shadow">
               Add to Cart
             </Link>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="py-8 border-t border-gray-100">
           <h2 className="text-xl font-bold tracking-tight mb-6">You may also like</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarProducts.map(p => <ProductCard key={p.id} product={p} />)}
           </div>
        </section>
      )}
    </div>
  );
}
