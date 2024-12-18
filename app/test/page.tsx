export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'not set'}{'\n'}
        NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: {process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'exists' : 'not set'}
      </pre>
    </div>
  );
}

