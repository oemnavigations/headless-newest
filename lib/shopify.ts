const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

console.log('Environment Variables Check:');
console.log('Domain:', domain);
console.log('Token exists:', !!storefrontAccessToken);

async function ShopifyData(query: string, variables = {}) {
  const URL = `https://${domain}/api/2023-04/graphql.json`;

  const options = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  try {
    if (!domain || !storefrontAccessToken) {
      console.error('Missing environment variables:');
      console.error('Domain:', domain);
      console.error('Token exists:', !!storefrontAccessToken);
      throw new Error(`Shopify configuration missing - Domain: ${!!domain}, Token: ${!!storefrontAccessToken}`);
    }

    const response = await fetch(URL, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shopify API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.errors) {
      console.error('Shopify API Returned Errors:', JSON.stringify(data.errors, null, 2));
      throw new Error(JSON.stringify(data.errors));
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data from Shopify:', error);
    throw error;
  }
}

export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await ShopifyData(query);
    console.log('Shopify API Response:', JSON.stringify(response, null, 2));

    if (!response.data || !response.data.products || !response.data.products.edges) {
      console.error('Invalid Shopify API Response Structure:', JSON.stringify(response, null, 2));
      throw new Error("Invalid response structure from Shopify API");
    }

    const products = response.data.products.edges;
    return products.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
}

export async function getProduct(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await ShopifyData(query, { handle });

    if (!response.data || !response.data.product) {
      console.error('Product Not Found Response:', JSON.stringify(response, null, 2));
      throw new Error(`Product with handle ${handle} not found`);
    }

    return response.data.product;
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    throw error;
  }
}

