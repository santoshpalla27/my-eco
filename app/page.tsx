import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "./data/mock";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <main className="flex-1 w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[320px] md:h-[440px] flex items-center justify-center text-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
            Redefine Your Everyday
          </h1>
          <p className="text-base text-white/90 font-medium">
            Discover our latest collection of premium basics.
          </p>
          <div className="flex justify-center pt-2">
            <Link
              href="/products"
              className="bg-white text-black h-10 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center text-sm shadow"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/products" className="text-sm font-semibold text-gray-500 hover:text-black hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="py-8 bg-gray-50 w-full border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-xl font-bold tracking-tight mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative h-40 md:h-52 overflow-hidden rounded-lg shadow-sm border border-gray-100"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="text-white text-sm font-semibold tracking-tight">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
