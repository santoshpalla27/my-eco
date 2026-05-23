'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../data/mock';

export interface CartItem extends Product {
  cartId: string;         // unique per cart entry
  quantity: number;
  size: string;
  material: string;
  sizeAddon: number;
  materialAddon: number;
  textLine1?: string;
  textLine2?: string;
  customPhotoName?: string;
  customPhotoThumbnail?: string; // base64 thumbnail (small, for display)
}

export interface AddItemOptions {
  quantity: number;
  size: string;
  material: string;
  sizeAddon: number;
  materialAddon: number;
  textLine1?: string;
  textLine2?: string;
  customPhotoName?: string;
  customPhotoThumbnail?: string;
}

interface CartState {
  items: CartItem[];
  version: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; cartId: string }
  | { type: 'UPDATE_QTY'; cartId: string; quantity: number }
  | { type: 'CLEAR' };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, options: AddItemOptions) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_VERSION = 2; // bump this if CartItem schema changes
const STORAGE_KEY = 'giftcraft_cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) };

    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case 'CLEAR':
      return { ...state, items: [] };

    default:
      return state;
  }
}

function loadCart(): CartState {
  if (typeof window === 'undefined') return { items: [], version: CART_VERSION };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartState;
      if (parsed.version !== CART_VERSION) {
        // Clear stale cart on schema version mismatch
        return { items: [], version: CART_VERSION };
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return { items: [], version: CART_VERSION };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], version: CART_VERSION }, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);

  // effective unit price = base price + size addon + material addon
  const subtotal = state.items.reduce(
    (acc, i) => acc + (i.price + i.sizeAddon + i.materialAddon) * i.quantity,
    0
  );

  function addItem(product: Product, options: AddItemOptions) {
    const cartId = `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const item: CartItem = { ...product, cartId, ...options };
    dispatch({ type: 'ADD_ITEM', item });
  }

  function removeItem(cartId: string) {
    dispatch({ type: 'REMOVE_ITEM', cartId });
  }

  function updateQty(cartId: string, quantity: number) {
    dispatch({ type: 'UPDATE_QTY', cartId, quantity });
  }

  function clear() {
    dispatch({ type: 'CLEAR' });
  }

  return (
    <CartContext.Provider value={{ items: state.items, totalItems, subtotal, addItem, removeItem, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
