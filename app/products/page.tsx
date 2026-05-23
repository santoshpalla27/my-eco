import { Suspense } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/mock';
import ProductsClient from '../components/ProductsClient';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category = '', sort = '', q = '' } = await searchParams;

  const categoryStr = Array.isArray(category) ? category[0] : category;
  const sortStr = Array.isArray(sort) ? sort[0] : sort;
  const queryStr = Array.isArray(q) ? q[0] : q;

  // Filter by category
  let filtered = categoryStr
    ? PRODUCTS.filter((p) => p.category === categoryStr)
    : [...PRODUCTS];

  // Filter by search query
  if (queryStr) {
    const lq = queryStr.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lq) ||
        p.category.toLowerCase().includes(lq)
    );
  }

  // Sort
  if (sortStr === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortStr === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortStr === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const categoryName = categoryStr
    ? CATEGORIES.find((c) => c.id === categoryStr)?.name ?? 'Products'
    : 'All Products';

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{categoryName}</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            {queryStr ? `Search results for "${queryStr}" — ` : ''}
            Showing {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="text-sm text-gray-400 py-8">Loading filters…</div>}>
        <ProductsClient
          products={filtered}
          selectedCategory={categoryStr}
          selectedSort={sortStr}
          totalCount={filtered.length}
        />
      </Suspense>
    </div>
  );
}
