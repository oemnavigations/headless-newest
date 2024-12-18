'use client';

import { useState } from 'react';

export default function AddToCartButton({ productId, variantId }: { productId: string, variantId: string }) {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async () => {
    setIsAdding(true);
    // Here you would typically call your cart API to add the item
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
    setIsAdding(false);
    alert('Item added to cart!');
  };

  return (
    <button
      onClick={addToCart}
      disabled={isAdding}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

