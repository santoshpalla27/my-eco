'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Tag, FileText, Users, MessageCircle, Check } from 'lucide-react';
import { STORE_CONFIG } from '../data/config';

const FEATURES = [
  { icon: Package, title: 'Bulk Ordering', description: 'Order from 10 to 10,000+ units with consistent quality and faster turnaround.' },
  { icon: Tag, title: 'Custom Branding', description: 'Add your company logo, brand colours, and custom packaging to every gift.' },
  { icon: FileText, title: 'GST Invoice', description: 'We provide GST-compliant invoices for seamless business accounting.' },
  { icon: Users, title: 'Dedicated Account Manager', description: 'A single point of contact for end-to-end order management and support.' },
];

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  productType: string;
  quantity: string;
  deadline: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(d: FormData): FormErrors {
  const e: FormErrors = {};
  if (!d.company) e.company = 'Company name is required';
  if (!d.name) e.name = 'Your name is required';
  if (!d.email) e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Enter a valid email';
  if (!d.phone) e.phone = 'Phone number is required';
  if (!d.quantity) e.quantity = 'Approximate quantity is required';
  return e;
}

export default function CorporatePage() {
  const [form, setForm] = useState<FormData>({
    company: '', name: '', email: '', phone: '',
    productType: '', quantity: '', deadline: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const msg = [
      `Hi GiftCraft! 🏢 Corporate Inquiry`,
      ``,
      `Company: ${form.company}`,
      `Contact: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.productType ? `Product Type: ${form.productType}` : null,
      `Quantity: ${form.quantity}`,
      form.deadline ? `Deadline: ${form.deadline}` : null,
      form.message ? `Details: ${form.message}` : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  }

  function inputClass(field: keyof FormErrors) {
    return `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-black'
    }`;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-12 w-full flex-1">
      {/* Header */}
      <div className="mb-10 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Corporate Gifting</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Premium personalised gifts for employee recognition, client appreciation, festive gifting, and brand events.
          We handle everything — from design to delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Features + Products */}
        <div>
          <h2 className="font-semibold text-sm mb-5 uppercase tracking-wide text-gray-500">Why GiftCraft for Business</h2>
          <div className="space-y-5 mb-10">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Popular corporate products */}
          <div>
            <h2 className="font-semibold text-sm mb-4 uppercase tracking-wide text-gray-500">Popular for Business</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'Branded Photo Frames (desk + wall)',
                'UV Acrylic Recognition Plaques',
                'Metal Prints for Office Décor',
                'Premium Gift Hampers',
                'Festive Gifting Sets (Diwali, Christmas)',
                'Employee Welcome / Farewell Kits',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Inquiry Form */}
        <div>
          <h2 className="font-semibold text-sm mb-5">Get a Quote</h2>
          {submitted ? (
            <div className="border border-gray-100 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-semibold">Inquiry Sent!</h3>
              <p className="text-sm text-gray-500">
                Your inquiry has been sent via WhatsApp. Our team will respond within 24 hours with pricing and options.
              </p>
              <Link href="/products" className="text-sm font-semibold underline hover:text-gray-600 transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <input id="corp-company" type="text" placeholder="Company name *" value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)} className={inputClass('company')} />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input id="corp-name" type="text" placeholder="Your name *" value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)} className={inputClass('name')} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input id="corp-phone" type="tel" placeholder="Phone *" value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)} className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <input id="corp-email" type="email" placeholder="Work email *" value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)} className={inputClass('email')} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <select id="corp-product" value={form.productType}
                  onChange={(e) => handleChange('productType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-white text-gray-700">
                  <option value="">Product type (optional)</option>
                  <option>Photo Frames</option>
                  <option>UV Acrylic Prints</option>
                  <option>Metal Prints</option>
                  <option>Gift Hampers</option>
                  <option>Multiple / Not sure</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input id="corp-quantity" type="text" placeholder="Approx. quantity *" value={form.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)} className={inputClass('quantity')} />
                  {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                </div>
                <div>
                  <input id="corp-deadline" type="text" placeholder="Deadline (optional)" value={form.deadline}
                    onChange={(e) => handleChange('deadline', e.target.value)} className={inputClass('deadline')} />
                </div>
              </div>
              <div>
                <textarea id="corp-message" placeholder="Tell us more about your requirement…" value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)} rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none" />
              </div>
              <button id="corp-submit" type="submit"
                className="w-full bg-black text-white h-11 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm shadow">
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Send Inquiry via WhatsApp
              </button>
              <p className="text-xs text-gray-400 text-center">We respond within 24 hours on business days.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
