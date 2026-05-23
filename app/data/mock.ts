export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: 'men', name: 'Menswear', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800' },
  { id: 'women', name: 'Womenswear', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=800' },
  { id: 'shoes', name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Essential Oversized Tee',
    price: 45,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'men',
    description: 'A premium heavyweight cotton oversized t-shirt designed for everyday comfort. Minimalist aesthetic with a relaxed fit that pairs perfectly with any bottom.',
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Sneaker',
    price: 180,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'shoes',
    description: 'Handcrafted from Italian leather, these pristine white sneakers offer a low-profile silhouette and unmatched durability for any occasion.',
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'Everyday Tote Bag',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    category: 'accessories',
    description: 'Constructed from durable canvas with leather trims, this tote is spacious enough for a laptop and all daily essentials.',
    isFeatured: true,
  },
  {
    id: 'p4',
    name: 'Structured Wool Coat',
    price: 295,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
    category: 'men',
    description: 'A sharp, tailored wool coat featuring a subtle herringbone pattern. It keeps you warm without compromising on a sleek silhouette.',
    isFeatured: true,
  },
  {
    id: 'p5',
    name: 'Silk Slip Dress',
    price: 155,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
    category: 'women',
    description: 'Pure mulberry silk slip dress with a cowl neckline. Elegant, timeless, and drapes beautifully on the body.',
    isFeatured: false,
  },
  {
    id: 'p6',
    name: 'Classic Chronograph Watch',
    price: 220,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
    category: 'accessories',
    description: 'Matte black stainless steel chronograph watch. A minimalist face with sub-dials adds complexity without the clutter.',
    isFeatured: false,
  },
  {
    id: 'p7',
    name: 'Chunky Knit Sweater',
    price: 110,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800',
    category: 'women',
    description: 'Soft merino wool chunky knit sweater. Keeps you cozy while maintaining a premium high-street fashion look.',
    isFeatured: false,
  },
  {
    id: 'p8',
    name: 'High-Top Canvas Trainers',
    price: 85,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    category: 'shoes',
    description: 'Vintage-inspired high tops with a modern cushioned sole. Perfect for an everyday casual streetwear fit.',
    isFeatured: false,
  }
];
