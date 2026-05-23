'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ImageIcon } from 'lucide-react';
import { STORE_CONFIG } from '../data/config';

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email';
  if (!data.phone) errors.phone = 'Phone number is required';
  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.lastName) errors.lastName = 'Last name is required';
  if (!data.address) errors.address = 'Address is required';
  if (!data.city) errors.city = 'City is required';
  if (!data.zip) errors.zip = 'Pin code is required';
  return errors;
}

export default function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const shippingCost = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shippingCost;

  const [form, setForm] = useState<FormData>({
    email: '', phone: '', firstName: '', lastName: '',
    address: '', city: '', zip: '', notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" strokeWidth={1} />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <Link href="/products" className="bg-black text-white px-6 h-10 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center mt-4">
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);

    const orderNumber = `#GC-${Math.floor(10000 + Math.random() * 90000)}`;

    // Build WhatsApp message
    const itemLines = items.map((item) => {
      const unitPrice = item.price + item.sizeAddon + item.materialAddon;
      let line = `• ${item.name} x${item.quantity} — ₹${(unitPrice * item.quantity).toLocaleString('en-IN')}`;
      if (item.size !== 'Standard') line += ` | Size: ${item.size}`;
      if (item.material !== 'Standard') line += ` | Finish: ${item.material}`;
      if (item.textLine1) line += ` | Text: "${item.textLine1}"`;
      if (item.textLine2) line += ` / "${item.textLine2}"`;
      if (item.customPhotoName) line += ` | Photo: ${item.customPhotoName}`;
      return line;
    }).join('\n');

    const msg = [
      `Hi GiftCraft! 🎁 New Order ${orderNumber}`,
      ``,
      `*Items:*`,
      itemLines,
      ``,
      `*Order Total:* ₹${total.toLocaleString('en-IN')}`,
      `*Shipping:* ${shippingCost === 0 ? 'Free' : `₹${shippingCost}`}`,
      ``,
      `*Delivery Details:*`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}, ${form.city} - ${form.zip}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join('\n');

    // Save for success page
    sessionStorage.setItem('giftcraft_order', JSON.stringify({
      items, subtotal, total, orderNumber, email: form.email,
    }));

    clear();

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');

    // Navigate to success
    window.location.href = '/success';
  }

  function inputClass(field: keyof FormErrors) {
    return `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-black'
    }`;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 space-y-8">
        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-3 text-sm">Contact</h2>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <input id="checkout-email" type="email" placeholder="Email address" value={form.email}
                onChange={(e) => handleChange('email', e.target.value)} className={inputClass('email')} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <input id="checkout-phone" type="tel" placeholder="Phone number (for order updates)" value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)} className={inputClass('phone')} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h2 className="font-semibold mb-3 text-sm">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <input id="checkout-first-name" type="text" placeholder="First name" value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)} className={inputClass('firstName')} />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input id="checkout-last-name" type="text" placeholder="Last name" value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)} className={inputClass('lastName')} />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div className="col-span-2">
              <input id="checkout-address" type="text" placeholder="Full address" value={form.address}
                onChange={(e) => handleChange('address', e.target.value)} className={inputClass('address')} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <input id="checkout-city" type="text" placeholder="City" value={form.city}
                onChange={(e) => handleChange('city', e.target.value)} className={inputClass('city')} />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <input id="checkout-zip" type="text" placeholder="PIN code" value={form.zip}
                onChange={(e) => handleChange('zip', e.target.value)} className={inputClass('zip')} />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
            </div>
          </div>
        </div>

        {/* Order Notes */}
        <div>
          <h2 className="font-semibold mb-3 text-sm">Order Notes <span className="text-gray-400 font-normal">(optional)</span></h2>
          <textarea
            id="checkout-notes"
            placeholder="Any special instructions, gift messages, or packaging requests…"
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        {/* Mobile submit */}
        <button onClick={submitOrder} disabled={submitting}
          className="lg:hidden w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow disabled:opacity-60">
          {submitting ? 'Processing…' : `Place Order via WhatsApp — ₹${total.toLocaleString('en-IN')}`}
        </button>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="space-y-4">
          {items.map((item) => {
            const unitPrice = item.price + item.sizeAddon + item.materialAddon;
            return (
              <div key={item.cartId} className="flex gap-3 text-sm">
                <div className="w-12 h-14 relative rounded bg-gray-50 border border-gray-100 flex-shrink-0 mt-1 overflow-hidden">
                  {item.customPhotoThumbnail ? (
                    <Image src={item.customPhotoThumbnail} alt="Your photo" fill className="object-cover" unoptimized />
                  ) : (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  )}
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 pr-2 pt-1">
                  <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                  {item.size !== 'Standard' && <p className="text-xs text-gray-400">{item.size}</p>}
                  {item.customPhotoName && (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <ImageIcon className="w-2.5 h-2.5" /> {item.customPhotoName}
                    </p>
                  )}
                </div>
                <div className="font-semibold pt-1 text-gray-900 whitespace-nowrap">
                  ₹{(unitPrice * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-gray-900 font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-gray-900 font-medium">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-gray-900">
          <span className="font-semibold text-sm">Total</span>
          <span className="font-bold text-xl">₹{total.toLocaleString('en-IN')}</span>
        </div>

        {/* Desktop submit */}
        <button onClick={submitOrder} disabled={submitting}
          className="hidden lg:flex w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors items-center justify-center text-sm shadow disabled:opacity-60">
          {submitting ? 'Processing…' : `Place Order via WhatsApp`}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Clicking &ldquo;Place Order&rdquo; opens WhatsApp with your order details. We&apos;ll confirm and arrange payment.
        </p>
      </div>
    </div>
  );
}
