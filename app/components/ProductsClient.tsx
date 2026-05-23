'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Product, CATEGORIES } from '../data/mock';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  selectedCategory: string;
  selectedSort: string;
  totalCount: number;
}

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductsClient({ products, selectedCategory, selectedSort, totalCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      return params.toString();
    },
    [searchParams]
  );

  function handleCategory(categoryId: string) {
    const qs = createQueryString({ category: categoryId });
    router.push(`${pathname}?${qs}`);
  }

  function handleSort(value: string) {
    const qs = createQueryString({ sort: value });
    router.push(`${pathname}?${qs}`);
  }

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === selectedSort)?.label ?? 'Sort';

  return (
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
            <li>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={!selectedCategory}
                  onChange={() => handleCategory('')}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-sm font-medium text-gray-900">All</span>
              </label>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === c.id}
                    onChange={() => handleCategory(c.id)}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm text-gray-600">{c.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Sort (sidebar on mobile) */}
        <div className="lg:hidden">
          <h3 className="font-semibold text-sm mb-3">Sort By</h3>
          <ul className="space-y-2">
            {SORT_OPTIONS.map((o) => (
              <li key={o.value}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedSort === o.value}
                    onChange={() => handleSort(o.value)}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm text-gray-600">{o.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        {/* Sort row (desktop) */}
        <div className="hidden lg:flex justify-end mb-4">
          <div className="relative">
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none flex items-center text-sm font-medium border border-gray-200 pl-3 pr-8 h-9 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:border-black bg-white cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-400 text-sm font-medium mb-4">No products found in this category.</p>
            <button
              onClick={() => handleCategory('')}
              className="text-sm font-semibold underline hover:text-gray-600 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
