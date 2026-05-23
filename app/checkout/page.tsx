import CheckoutForm from '../components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8 w-full flex-1">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
