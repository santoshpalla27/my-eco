import CartPageContent from '../components/CartPageContent';

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      <CartPageContent />
    </div>
  );
}
