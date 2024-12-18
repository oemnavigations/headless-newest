import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  if (!product) {
    console.error('ProductCard received undefined product');
    return null;
  }

  const { title, handle, images, priceRange } = product;
  const price = priceRange?.minVariantPrice;

  if (!handle) {
    console.error('ProductCard received product without handle', product);
    return null;
  }

  const image = images?.edges[0]?.node;

  return (
    <Link href={`/products/${handle}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || title || 'Product image'}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
            No image
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title || 'Untitled Product'}</h3>
      {price && (
        <p className="mt-1 text-lg font-medium text-gray-900">{price.amount} {price.currencyCode}</p>
      )}
    </Link>
  );
}

