import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "./data/mock";
import ProductCard from "./components/ProductCard";
import { Package, Pencil, Truck } from "lucide-react";

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <main className="flex-1 w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[320px] md:h-[460px] flex items-center justify-center text-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=2000"
          alt="Personalised gifts and photo frames"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
            Turn Moments into Memories
          </h1>
          <p className="text-base text-white/90 font-medium max-w-md mx-auto">
            Personalised photo frames, UV acrylic prints, metal prints & home décor — crafted with love.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/products"
              className="bg-white text-black h-10 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center text-sm shadow"
            >
              Start Personalising
            </Link>
            <Link
              href="/how-it-works"
              className="bg-transparent text-white border border-white/60 h-10 px-6 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center text-sm"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-b border-gray-100 py-3 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-xs font-medium text-gray-500">
            <span>✦ 5,000+ Orders Delivered</span>
            <span>✦ Dispatched in 3–5 Business Days</span>
            <span>✦ 100% Satisfaction Guarantee</span>
            <span>✦ GST Invoice Available</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-10 w-full">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Bestsellers</h2>
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

      {/* How It Works Strip */}
      <section className="py-10 bg-gray-50 w-full border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-xl font-bold tracking-tight mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                <Package className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-sm">1. Choose a Product</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Browse our collection of photo frames, acrylic prints, metal panels, and home décor pieces.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                <Pencil className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-sm">2. Personalise It</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Upload your photo, add custom names or messages, and choose your preferred size and finish.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-sm">3. We Craft & Deliver</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We handcraft your gift and deliver it safely to your door within 3–5 business days.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works" className="text-sm font-semibold text-gray-500 hover:text-black hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-10 w-full">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-xl font-bold tracking-tight mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative h-36 md:h-44 overflow-hidden rounded-lg shadow-sm border border-gray-100"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="text-white text-xs font-semibold tracking-tight leading-tight">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
