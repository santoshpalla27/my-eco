import { PRODUCTS, CATEGORIES } from "../data/mock";
import ProductCard from "../components/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Showing {PRODUCTS.length} results</p>
        </div>
        <div>
          <button className="flex items-center text-sm font-medium border border-gray-200 px-3 h-9 rounded-lg hover:bg-gray-50 transition-colors">
            Sort <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-3 flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Categories
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
                <span className="text-sm font-medium text-gray-900">All Apparel</span>
              </li>
              {CATEGORIES.map(c => (
                <li key={c.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
                  <span className="text-sm text-gray-600">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
             <h3 className="font-semibold text-sm mb-3">Price</h3>
             <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black" min="0" max="500" defaultValue="500" />
             <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                <span>$0</span>
                <span>$500+</span>
             </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 space-x-1">
             <button className="h-9 w-9 rounded border border-black bg-black text-white text-sm font-medium">1</button>
             <button className="h-9 w-9 rounded border border-gray-200 text-gray-600 text-sm font-medium hover:border-black">2</button>
             <button className="h-9 px-3 rounded border border-gray-200 text-gray-600 text-sm font-medium hover:border-black">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
