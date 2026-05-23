'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Check, Upload, X, ShoppingCart } from 'lucide-react';
import { Product } from '../data/mock';
import { useCart } from '../context/CartContext';

async function createThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 240;
        const ratio = Math.min(MAX / img.width, MAX / img.height);
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function PersonalizePanel({ product }: { product: Product }) {
  const opts = product.personalizationOptions!;
  const sizes = opts.sizes ?? [];
  const materials = opts.materials ?? [];

  const [selectedSize, setSelectedSize] = useState(sizes[0]?.label ?? '');
  const [selectedSizeAddon, setSelectedSizeAddon] = useState(sizes[0]?.priceAddon ?? 0);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]?.label ?? '');
  const [selectedMaterialAddon, setSelectedMaterialAddon] = useState(materials[0]?.priceAddon ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [textLine1, setTextLine1] = useState('');
  const [textLine2, setTextLine2] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoThumbnail, setPhotoThumbnail] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  const effectivePrice = product.price + selectedSizeAddon + selectedMaterialAddon;

  async function processFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    const thumb = await createThumbnail(file);
    setPhotoThumbnail(thumb);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function removePhoto() {
    setPhotoFile(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setPhotoThumbnail(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleSizeSelect(label: string, addon: number) {
    setSelectedSize(label);
    setSelectedSizeAddon(addon);
  }

  function handleMaterialSelect(label: string, addon: number) {
    setSelectedMaterial(label);
    setSelectedMaterialAddon(addon);
  }

  function handleAdd() {
    addItem(product, {
      quantity,
      size: selectedSize || 'Standard',
      material: selectedMaterial || 'Standard',
      sizeAddon: selectedSizeAddon,
      materialAddon: selectedMaterialAddon,
      textLine1: textLine1.trim() || undefined,
      textLine2: textLine2.trim() || undefined,
      customPhotoName: photoFile?.name,
      customPhotoThumbnail: photoThumbnail ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      {opts.allowPhotoUpload && (
        <div>
          <h3 className="font-semibold text-sm mb-3">Upload Your Photo</h3>
          {photoPreview ? (
            <div className="relative w-full aspect-video max-h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <Image src={photoPreview} alt="Your photo" fill className="object-contain" unoptimized />
              <button
                onClick={removePhoto}
                aria-label="Remove photo"
                className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-600" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                {photoFile?.name}
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragOver ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Upload className="w-6 h-6 text-gray-400 mb-2" strokeWidth={1.5} />
              <p className="text-sm font-medium text-gray-700">Click or drag to upload</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — max 10 MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload-input"
          />
        </div>
      )}

      {/* Text Line 1 */}
      {opts.allowTextLine1 && (
        <div>
          <label htmlFor="textLine1" className="block font-semibold text-sm mb-2">
            {opts.textLine1Label ?? 'Custom Text'}
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="textLine1"
            type="text"
            maxLength={30}
            placeholder={`e.g. ${opts.textLine1Label ?? 'Your Name'}`}
            value={textLine1}
            onChange={(e) => setTextLine1(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{textLine1.length}/30</p>
        </div>
      )}

      {/* Text Line 2 */}
      {opts.allowTextLine2 && (
        <div>
          <label htmlFor="textLine2" className="block font-semibold text-sm mb-2">
            {opts.textLine2Label ?? 'Second Line'}
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="textLine2"
            type="text"
            maxLength={40}
            placeholder={`e.g. ${opts.textLine2Label ?? 'Your message'}`}
            value={textLine2}
            onChange={(e) => setTextLine2(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{textLine2.length}/40</p>
        </div>
      )}

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s.label}
                id={`size-${s.label.replace(/\s/g, '-')}`}
                aria-label={`Select size ${s.label}`}
                aria-pressed={selectedSize === s.label}
                onClick={() => handleSizeSelect(s.label, s.priceAddon)}
                className={`border h-10 px-4 text-sm font-medium rounded-lg transition-colors ${
                  selectedSize === s.label
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black text-gray-700'
                }`}
              >
                {s.label}
                {s.priceAddon > 0 && (
                  <span className={`ml-1 text-xs ${selectedSize === s.label ? 'text-gray-300' : 'text-gray-400'}`}>
                    +₹{s.priceAddon}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Material Selector */}
      {materials.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3">Finish</h3>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => (
              <button
                key={m.label}
                id={`material-${m.label.replace(/\s/g, '-')}`}
                aria-label={`Select finish ${m.label}`}
                aria-pressed={selectedMaterial === m.label}
                onClick={() => handleMaterialSelect(m.label, m.priceAddon)}
                className={`border h-10 px-4 text-sm font-medium rounded-lg transition-colors ${
                  selectedMaterial === m.label
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black text-gray-700'
                }`}
              >
                {m.label}
                {m.priceAddon > 0 && (
                  <span className={`ml-1 text-xs ${selectedMaterial === m.label ? 'text-gray-300' : 'text-gray-400'}`}>
                    +₹{m.priceAddon}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Price + Add */}
      <div>
        {/* Dynamic price */}
        <p className="text-lg font-bold mb-4">
          ₹{effectivePrice.toLocaleString('en-IN')}
          {(selectedSizeAddon > 0 || selectedMaterialAddon > 0) && (
            <span className="text-sm font-normal text-gray-400 ml-2">
              (Base ₹{product.price.toLocaleString('en-IN')} + options)
            </span>
          )}
        </p>

        <div className="flex gap-3">
          <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 w-28 h-11 bg-white">
            <button
              aria-label="Decrease quantity"
              className="text-gray-400 font-medium hover:text-black transition-colors"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              aria-label="Increase quantity"
              className="text-gray-400 font-medium hover:text-black transition-colors"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <button
            id="personalize-add-to-cart"
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-semibold h-11 text-sm shadow transition-all ${
              added ? 'bg-gray-800 text-white' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                Add to Cart — ₹{(effectivePrice * quantity).toLocaleString('en-IN')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
