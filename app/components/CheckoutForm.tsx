'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email';
  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.lastName) errors.lastName = 'Last name is required';
  if (!data.address) errors.address = 'Address is required';
  if (!data.city) errors.city = 'City is required';
  if (!data.zip) errors.zip = 'Zip code is required';
  else if (!/^\d{4,10}$/.test(data.zip.replace(/\s/g, '')))
    errors.zip = 'Enter a valid zip code';
  return errors;
}

export default function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" strokeWidth={1} />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <Link
          href="/products"
          className="bg-black text-white px-6 h-10 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center mt-4"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function submitOrder() {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const orderNumber = `#AURA-${Math.floor(10000 + Math.random() * 90000)}`;
    sessionStorage.setItem(
      'aura_order',
      JSON.stringify({ items, subtotal, orderNumber, email: form.email })
    );
    clear();
    router.push('/success');
  }

  function inputClass(field: keyof FormErrors) {
    return `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-300 focus:border-black'
    }`;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 space-y-8">
        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-3 text-sm">Contact</h2>
          <div>
            <input
              id="checkout-email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h2 className="font-semibold mb-3 text-sm">Shipping</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <input
                id="checkout-first-name"
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={inputClass('firstName')}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input
                id="checkout-last-name"
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={inputClass('lastName')}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div className="col-span-2">
              <input
                id="checkout-address"
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={inputClass('address')}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <input
                id="checkout-city"
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className={inputClass('city')}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <input
                id="checkout-zip"
                type="text"
                placeholder="Zip code"
                value={form.zip}
                onChange={(e) => handleChange('zip', e.target.value)}
                className={inputClass('zip')}
              />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
            </div>
          </div>
        </div>

        {/* Mobile submit */}
        <button
          id="place-order-btn"
          onClick={submitOrder}
          disabled={submitting}
          className="lg:hidden w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow disabled:opacity-60"
        >
          {submitting ? 'Processing…' : `Pay $${subtotal.toLocaleString()}`}
        </button>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-3 text-sm">
              <div className="w-12 h-16 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0 mt-1">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 pr-2 pt-1 font-medium">
                <h4 className="line-clamp-2 text-gray-800">{item.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
              </div>
              <div className="font-semibold pt-1 text-gray-900">
                ${(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-gray-900 font-medium">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-gray-900 font-medium">Free</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-gray-900">
          <span className="font-semibold text-sm">Total</span>
          <span className="font-bold text-xl">${subtotal.toLocaleString()}</span>
        </div>

        {/* Desktop submit */}
        <button
          id="place-order-btn-desktop"
          onClick={submitOrder}
          disabled={submitting}
          className="hidden lg:flex w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors items-center justify-center text-sm shadow disabled:opacity-60"
        >
          {submitting ? 'Processing…' : `Pay $${subtotal.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}
