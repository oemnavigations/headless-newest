import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Our Store
        </Link>
        <div>
          <Link href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2">
            Home
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-gray-800 px-3 py-2">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}

