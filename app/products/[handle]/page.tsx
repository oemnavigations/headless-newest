import { getProduct } from '../../../lib/shopify';
import Image from 'next/image';
import AddToCartButton from '../../../components/AddToCartButton';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, description, images, variants } = product;
  const price = variants.edges[0].node.price;
  const mainImage = images.edges[0]?.node;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || title}
              width={mainImage.width || 500}
              height={mainImage.height || 500}
              className="rounded-lg"
            />
          ) : (
            <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-xl mb-4">{price.amount} {price.currencyCode}</p>
          <div className="mb-6" dangerouslySetInnerHTML={{ __html: description }} />
          <AddToCartButton productId={product.id} variantId={variants.edges[0].node.id} />
        </div>
      </div>
    </div>
  );
}

