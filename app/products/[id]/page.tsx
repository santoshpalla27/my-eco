import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "../../data/mock";
import ProductCard from "../../components/ProductCard";
import PersonalizePanel from "../../components/PersonalizePanel";
import AddToCartButton from "../../components/AddToCartButton";
import { Star, Truck, Shield } from "lucide-react";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6 font-medium">
        <Link href="/" className="hover:text-black">Home</Link>{" "}
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black">Shop</Link>{" "}
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-black capitalize">
          {product.category.replace(/-/g, ' ')}
        </Link>{" "}
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
        {/* Image Gallery */}
        <div className="w-full lg:w-[45%] flex gap-4">
          <div className="hidden sm:flex flex-col gap-3 w-16 flex-shrink-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`relative border rounded-lg aspect-square cursor-pointer overflow-hidden ${
                  i === 1 ? "border-black" : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative aspect-square w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight mb-1">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-3">
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            <span>{product.rating}</span>
            {product.isPersonalizable && (
              <span className="ml-3 text-gray-400">· Fully Personalizable</span>
            )}
          </div>

          {/* Base Price */}
          {!product.isPersonalizable && (
            <p className="text-xl font-semibold mb-4">₹{product.price.toLocaleString('en-IN')}</p>
          )}

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Delivery info */}
          <div className="flex flex-col gap-2 mb-6 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
              Dispatched in 3–5 business days · Free delivery above ₹999
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
              100% satisfaction guarantee — we&apos;ll remake it if you&apos;re not happy
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            {product.isPersonalizable ? (
              <PersonalizePanel product={product} />
            ) : (
              <>
                <p className="text-xl font-semibold mb-6">₹{product.price.toLocaleString('en-IN')}</p>
                <AddToCartButton product={product} />
                <p className="text-xs text-gray-400 mt-3">
                  For bulk orders or custom branding,{' '}
                  <Link href="/corporate" className="underline hover:text-black transition-colors">
                    get in touch with us
                  </Link>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-8 border-t border-gray-100">
          <h2 className="text-xl font-bold tracking-tight mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
