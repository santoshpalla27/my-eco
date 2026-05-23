'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Browse & Choose',
    description:
      'Explore our collection of photo frames, UV acrylic prints, metal panels, and home décor. Each product page shows sizes, materials, and starting prices so you can find your perfect gift.',
  },
  {
    number: '02',
    title: 'Personalise It',
    description:
      'Upload your photo directly on the product page. Add a name, date, or personal message. Choose your preferred size and finish. You\'ll see a preview of your selections before adding to cart.',
  },
  {
    number: '03',
    title: 'Place Your Order',
    description:
      'Complete checkout with your delivery details. Your order summary is sent to us via WhatsApp. We confirm your personalisation, arrange payment, and begin crafting your gift.',
  },
  {
    number: '04',
    title: 'We Craft with Care',
    description:
      'Every gift is handcrafted by our in-house team. We review your photo quality and personalisation before printing to ensure a flawless result. Quality checked before dispatch.',
  },
  {
    number: '05',
    title: 'Delivered to Your Door',
    description:
      'Packed securely in premium gift-ready packaging and delivered within 3–5 business days. We share tracking updates via WhatsApp throughout the journey.',
  },
];

const FAQS = [
  {
    q: 'What photo format and resolution should I upload?',
    a: 'For the best print quality, upload a high-resolution JPEG or PNG (at least 1200×1600 px). We\'ll let you know via WhatsApp if the resolution is too low before we print.',
  },
  {
    q: 'Can I preview my personalised gift before it\'s made?',
    a: 'Currently we review your photo and personalisation details manually and send you a digital proof on WhatsApp before printing. We\'ll get this approved before dispatching.',
  },
  {
    q: 'How long does it take to receive my order?',
    a: 'Most orders are dispatched within 3–5 business days of confirmation. Delivery typically takes an additional 2–3 days depending on your location.',
  },
  {
    q: 'Can I order in bulk for corporate or events?',
    a: 'Absolutely! We offer bulk pricing, custom branding, and GST invoices for corporate orders. Visit our Corporate Gifts page or message us directly on WhatsApp.',
  },
  {
    q: 'What if I\'m not happy with my order?',
    a: 'We offer a 100% satisfaction guarantee. If there\'s a quality issue or an error on our part, we\'ll remake it for free. Just send us a photo of the issue on WhatsApp.',
  },
  {
    q: 'How do I pay for my order?',
    a: 'After placing your order via WhatsApp, we\'ll share a payment link (UPI / bank transfer / Razorpay). Payment is confirmed before we begin crafting.',
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-12 w-full flex-1">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">How It Works</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          From choosing your product to holding it in your hands — here&apos;s every step of the GiftCraft experience.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-0 mb-14">
        {STEPS.map((step, i) => (
          <div key={step.number} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {step.number}
              </div>
              {i < STEPS.length - 1 && <div className="w-px flex-1 bg-gray-200 my-2" />}
            </div>
            <div className="pb-8">
              <h2 className="font-semibold text-sm mb-1">{step.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                id={`faq-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                className="w-full flex justify-between items-center py-4 text-left text-sm font-semibold hover:text-gray-600 transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>
              {openFaq === i && (
                <p className="pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center border-t border-gray-100 pt-10">
        <p className="text-sm text-gray-500 mb-4">Ready to create something special?</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/products" className="bg-black text-white px-6 h-10 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center">
            Start Personalising
          </Link>
          <Link href="/corporate" className="border border-gray-200 text-gray-700 px-6 h-10 rounded-lg text-sm font-semibold hover:border-black hover:text-black transition-colors flex items-center">
            Corporate Gifting
          </Link>
        </div>
      </div>
    </div>
  );
}
