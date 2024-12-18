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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {images.edges[0] && (
            <Image
              src={images.edges[0].node.url}
              alt={images.edges[0].node.altText || title}
              width={500}
              height={500}
              className="rounded-lg"
            />
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

