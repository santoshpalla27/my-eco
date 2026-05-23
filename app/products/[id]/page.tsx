import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "../../data/mock";
import ProductCard from "../../components/ProductCard";
import AddToCartButton from "../../components/AddToCartButton";
import { Star } from "lucide-react";

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
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6 font-medium">
        <Link href="/" className="hover:text-black">Home</Link>{" "}
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black">Products</Link>{" "}
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
        {/* Gallery */}
        <div className="w-full lg:w-[40%] flex gap-4 max-w-[450px]">
          <div className="hidden sm:flex flex-col gap-3 w-16 flex-shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`relative border rounded-lg aspect-[3/4] cursor-pointer overflow-hidden ${
                  i === 1 ? "border-black" : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative aspect-[3/4] w-full bg-accent rounded-lg overflow-hidden border border-gray-100">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col pt-0 lg:pt-2">
          <h1 className="text-2xl font-bold tracking-tight mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-3">${product.price.toLocaleString()}</p>

          <div className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-6">
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            {product.rating}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Interactive: size + qty + add to cart (client component) */}
          <AddToCartButton product={product} />
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="py-8 border-t border-gray-100">
          <h2 className="text-xl font-bold tracking-tight mb-6">You may also like</h2>
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
