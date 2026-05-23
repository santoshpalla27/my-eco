'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../data/mock';

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number; size: string }
  | { type: 'REMOVE_ITEM'; id: string; size: string }
  | { type: 'UPDATE_QTY'; id: string; size: string; quantity: number }
  | { type: 'CLEAR' };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, quantity: number, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.product.id}-${action.size}`;
      const existing = state.items.find(
        (i) => i.id === action.product.id && i.size === action.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id && i.size === action.size
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.product, quantity: action.quantity, size: action.size },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) => !(i.id === action.id && i.size === action.size)
        ),
      };
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.id === action.id && i.size === action.size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = 'aura_cart';

function loadCart(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    // ignore
  }
  return { items: [] };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = state.items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const addItem = (product: Product, quantity: number, size: string) =>
    dispatch({ type: 'ADD_ITEM', product, quantity, size });

  const removeItem = (id: string, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', id, size });

  const updateQty = (id: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', id, size, quantity });

  const clear = () => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, subtotal, addItem, removeItem, updateQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
