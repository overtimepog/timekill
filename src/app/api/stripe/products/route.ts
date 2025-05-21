import { NextResponse } from 'next/server';
import { stripe } from '../../../../../packages/core/lib/stripe';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  try {
    // Get the current user
    const user = await currentUser();
    
    // Require authentication for this endpoint
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // User ID available for future operations
    // const userId = user.id;

    // Fetch products with prices from Stripe
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // Format the products for the frontend
    const formattedProducts = products.data.map(product => {
      const price = product.default_price as {
        id: string;
        unit_amount: number;
        currency: string;
        recurring?: {
          interval: string;
          interval_count: number;
        };
      };
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
        limitations: product.metadata.limitations ? JSON.parse(product.metadata.limitations) : [],
        highlight: product.metadata.highlight === 'true',
        price: price ? {
          id: price.id,
          amount: price.unit_amount,
          currency: price.currency,
          interval: price.recurring?.interval,
          intervalCount: price.recurring?.interval_count,
        } : null,
      };
    });

    // Sort products by price (free first, then ascending)
    formattedProducts.sort((a, b) => {
      if (!a.price?.amount) return -1;
      if (!b.price?.amount) return 1;
      return a.price.amount - b.price.amount;
    });

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
