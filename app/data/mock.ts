export interface SizeOption {
  label: string;
  priceAddon: number;
}

export interface MaterialOption {
  label: string;
  priceAddon: number;
}

export interface PersonalizationOptions {
  allowPhotoUpload: boolean;
  allowTextLine1?: boolean;
  textLine1Label?: string;
  allowTextLine2?: boolean;
  textLine2Label?: string;
  sizes?: SizeOption[];
  materials?: MaterialOption[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  isFeatured?: boolean;
  badge?: string; // e.g. "Bestseller", "New", "Bulk Available"
  isPersonalizable: boolean;
  personalizationOptions?: PersonalizationOptions;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'photo-frames',
    name: 'Photo Frames',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'uv-acrylic',
    name: 'UV Acrylic Prints',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'metal-prints',
    name: 'Metal Prints',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'home-decor',
    name: 'Home Décor',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'corporate-gifts',
    name: 'Corporate Gifts',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800',
  },
];

export const PRODUCTS: Product[] = [
  // ── Photo Frames ──────────────────────────────────────────────
  {
    id: 'pf1',
    name: 'Classic Wooden Photo Frame',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=800',
    category: 'photo-frames',
    description:
      'Handcrafted from premium oak wood, this timeless photo frame adds warmth to any space. Each frame is finished with a natural matte coat to preserve the beauty of your cherished memory.',
    isFeatured: true,
    badge: 'Bestseller',
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Name / Caption',
      allowTextLine2: true,
      textLine2Label: 'Date or Short Message',
      sizes: [
        { label: '4×6 in', priceAddon: 0 },
        { label: '5×7 in', priceAddon: 200 },
        { label: '8×10 in', priceAddon: 500 },
      ],
    },
  },
  {
    id: 'pf2',
    name: 'Rustic Collage Frame Set',
    price: 1099,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&q=80&w=800',
    category: 'photo-frames',
    description:
      'A beautifully arranged collage frame set that lets you display up to 6 of your favourite moments. Rustic wood finish with an antique feel — perfect as a living room centrepiece or gift.',
    isFeatured: false,
    badge: 'New',
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Family Name or Title',
      sizes: [
        { label: 'A4', priceAddon: 0 },
        { label: 'A3', priceAddon: 400 },
      ],
    },
  },

  // ── UV Acrylic Prints ─────────────────────────────────────────
  {
    id: 'uv1',
    name: 'UV Acrylic Portrait Print',
    price: 1499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800',
    category: 'uv-acrylic',
    description:
      'Vibrant UV-printed on premium 5mm acrylic glass. Colours pop with stunning depth and clarity. Comes with a wall-mount kit. Perfect for portraits, couples, and family memories.',
    isFeatured: true,
    badge: 'Bestseller',
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Name or Title',
      allowTextLine2: true,
      textLine2Label: 'Date / Quote',
      sizes: [
        { label: 'A4', priceAddon: 0 },
        { label: 'A3', priceAddon: 700 },
        { label: 'A2', priceAddon: 1500 },
      ],
      materials: [
        { label: 'Gloss', priceAddon: 0 },
        { label: 'Frosted', priceAddon: 200 },
      ],
    },
  },
  {
    id: 'uv2',
    name: 'UV Acrylic Couple Mosaic',
    price: 1799,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=800',
    category: 'uv-acrylic',
    description:
      'A mosaic-style dual photo acrylic print — ideal for couples, anniversaries, and weddings. Side-by-side or blended composition available. Arrives gift-ready in a premium box.',
    isFeatured: false,
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Names (e.g. Rahul & Priya)',
      allowTextLine2: true,
      textLine2Label: 'Special Date',
      sizes: [
        { label: 'A3', priceAddon: 0 },
        { label: 'A2', priceAddon: 800 },
      ],
      materials: [
        { label: 'Gloss', priceAddon: 0 },
        { label: 'Frosted', priceAddon: 200 },
      ],
    },
  },

  // ── Metal Prints ──────────────────────────────────────────────
  {
    id: 'mp1',
    name: 'Brushed Metal Wall Panel',
    price: 1999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800',
    category: 'metal-prints',
    description:
      'Printed directly onto high-grade aluminium with a brushed texture finish. Scratch-resistant, waterproof, and built to last a lifetime. A bold statement piece for any modern home.',
    isFeatured: true,
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Title or Name',
      sizes: [
        { label: 'A4', priceAddon: 0 },
        { label: 'A3', priceAddon: 600 },
        { label: 'A2', priceAddon: 1200 },
      ],
      materials: [
        { label: 'Silver', priceAddon: 0 },
        { label: 'Matte Black', priceAddon: 300 },
        { label: 'Gold', priceAddon: 500 },
      ],
    },
  },
  {
    id: 'mp2',
    name: 'Steel Anniversary Print',
    price: 1799,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800',
    category: 'metal-prints',
    description:
      'Celebrate love stories with a premium steel-base photo print. Sleek, modern, and deeply personal. A perfect anniversary or wedding gift that will never fade.',
    isFeatured: false,
    badge: 'New',
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Names',
      allowTextLine2: true,
      textLine2Label: 'Anniversary Date',
      sizes: [
        { label: 'A4', priceAddon: 0 },
        { label: 'A3', priceAddon: 500 },
      ],
      materials: [
        { label: 'Silver', priceAddon: 0 },
        { label: 'Matte Black', priceAddon: 300 },
      ],
    },
  },

  // ── Home Décor ────────────────────────────────────────────────
  {
    id: 'hd1',
    name: 'Custom LED Name Light',
    price: 999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    category: 'home-decor',
    description:
      'A warm glowing LED light personalised with any name or word in an elegant script font. USB-powered with a dimmer switch. Creates the perfect ambient mood — ideal for bedrooms and nurseries.',
    isFeatured: true,
    badge: 'Popular',
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: false,
      allowTextLine1: true,
      textLine1Label: 'Name or Word (max 12 chars)',
      sizes: [
        { label: 'Small (30cm)', priceAddon: 0 },
        { label: 'Medium (50cm)', priceAddon: 400 },
        { label: 'Large (70cm)', priceAddon: 800 },
      ],
    },
  },
  {
    id: 'hd2',
    name: 'Personalised Memory Cushion',
    price: 849,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
    category: 'home-decor',
    description:
      'A plush cushion with your favourite photo sublimation-printed on premium fabric. Soft, vibrant, and machine-washable. Comes with an inner pillow insert. A heartfelt and practical gift.',
    isFeatured: false,
    isPersonalizable: true,
    personalizationOptions: {
      allowPhotoUpload: true,
      allowTextLine1: true,
      textLine1Label: 'Name or Caption',
      allowTextLine2: true,
      textLine2Label: 'Date or Short Quote',
      sizes: [
        { label: '12×12 in', priceAddon: 0 },
        { label: '16×16 in', priceAddon: 250 },
      ],
    },
  },

  // ── Corporate Gifts ───────────────────────────────────────────
  {
    id: 'cg1',
    name: 'Premium Corporate Gift Hamper',
    price: 2999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800',
    category: 'corporate-gifts',
    description:
      'An elegantly curated hamper including a branded photo frame, premium stationery, artisan chocolates, and a handwritten card. Custom branding and bulk pricing available. GST invoice provided.',
    isFeatured: true,
    badge: 'Bulk Available',
    isPersonalizable: false,
  },
  {
    id: 'cg2',
    name: 'Executive Branded Desk Set',
    price: 1999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746bab22b3?auto=format&fit=crop&q=80&w=800',
    category: 'corporate-gifts',
    description:
      'A sophisticated desk set featuring a personalised metal nameplate, pen stand, and a custom photo frame — all branded with your company logo. Perfect for employee recognition and client gifts.',
    isFeatured: false,
    badge: 'Bulk Available',
    isPersonalizable: false,
  },
];
