import { getProducts } from '../lib/shopify';
import ProductCard from '../components/ProductCard';

export default async function Home() {
  try {
    console.log('Fetching products...');
    const products = await getProducts();
    console.log('Products fetched successfully:', products.length);

    if (!Array.isArray(products) || products.length === 0) {
      console.error('No products returned from Shopify');
      throw new Error('No products returned from Shopify');
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to our Headless Shopify Store</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to our Headless Shopify Store</h1>
        <p className="text-center text-red-500">
          Error loading products. Please try again later.
          {error instanceof Error ? ` Error details: ${error.message}` : ''}
        </p>
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }
}

