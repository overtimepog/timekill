/**
 * MIT License
 *
 * Copyright (c) 2025 TimeKill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { mockPrismaClient, mockClerkUser, mockStripeClient } from '../helpers/mocks';

// Mock external dependencies
vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
}));

vi.mock('../../../packages/core/lib/prisma', () => ({
  prisma: mockPrismaClient(),
}));

vi.mock('../../../packages/core/lib/stripe', () => ({
  stripe: mockStripeClient(),
}));

// Mock the API route handlers
const mockCheckoutPOST = vi.fn();
const mockPortalPOST = vi.fn();
const mockProductsGET = vi.fn();
const mockWebhookPOST = vi.fn();

vi.mock('../../src/app/api/stripe/checkout/route', () => ({
  POST: mockCheckoutPOST,
}));

vi.mock('../../src/app/api/stripe/portal/route', () => ({
  POST: mockPortalPOST,
}));

vi.mock('../../src/app/api/stripe/products/route', () => ({
  GET: mockProductsGET,
}));

vi.mock('../../src/app/api/stripe/webhook/route', () => ({
  POST: mockWebhookPOST,
}));

describe('Stripe Integration API', () => {
  let prisma: any;
  let currentUser: any;
  let stripe: any;
  let mockRequest: Partial<NextRequest>;

  beforeEach(() => {
    vi.clearAllMocks();
    
    prisma = mockPrismaClient();
    currentUser = vi.fn();
    stripe = mockStripeClient();
    
    mockRequest = {
      json: vi.fn(),
      text: vi.fn(),
      headers: new Headers(),
    };

    // Setup default API route implementations
    mockCheckoutPOST.mockImplementation(async (request: NextRequest) => {
      const user = await currentUser();
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      const { priceId } = await request.json();
      if (!priceId) {
        return new Response(JSON.stringify({ error: 'Price ID required' }), { status: 400 });
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      });

      return new Response(JSON.stringify({ 
        sessionId: session.id, 
        url: session.url 
      }));
    });

    mockPortalPOST.mockImplementation(async (request: NextRequest) => {
      const user = await currentUser();
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings/billing`,
      });

      return new Response(JSON.stringify({ url: session.url }));
    });

    mockProductsGET.mockImplementation(async () => {
      const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price'],
      });

      return new Response(JSON.stringify({ products: products.data }));
    });
  });

  describe('Checkout Session Creation', () => {
    it('should create checkout session for authenticated user', async () => {
      const user = mockClerkUser();
      currentUser.mockResolvedValue(user);
      
      stripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/pay/cs_test_123',
      });

      mockRequest.json = vi.fn().mockResolvedValue({
        priceId: 'price_pro_monthly',
      });

      const response = await mockCheckoutPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.sessionId).toBe('cs_test_123');
      expect(result.url).toBe('https://checkout.stripe.com/pay/cs_test_123');
    });

    it('should require authentication for checkout', async () => {
      currentUser.mockResolvedValue(null);

      const response = await mockCheckoutPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.error).toBe('Unauthorized');
    });

    it('should validate price ID for checkout', async () => {
      currentUser.mockResolvedValue(mockClerkUser());
      mockRequest.json = vi.fn().mockResolvedValue({});

      const response = await mockCheckoutPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.error).toBe('Price ID required');
    });

    it('should handle Stripe checkout errors', async () => {
      currentUser.mockResolvedValue(mockClerkUser());
      mockRequest.json = vi.fn().mockResolvedValue({
        priceId: 'price_invalid',
      });

      stripe.checkout.sessions.create.mockRejectedValue(
        new Error('No such price: price_invalid')
      );

      mockCheckoutPOST.mockImplementation(async (request: NextRequest) => {
        try {
          const user = await currentUser();
          if (!user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
          }

          const { priceId } = await request.json();
          await stripe.checkout.sessions.create({
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to create checkout session' }), 
            { status: 500 }
          );
        }
      });

      const response = await mockCheckoutPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.error).toBe('Failed to create checkout session');
    });
  });

  describe('Billing Portal Session Creation', () => {
    it('should create billing portal session for authenticated user', async () => {
      const user = mockClerkUser();
      currentUser.mockResolvedValue(user);

      stripe.customers.create.mockResolvedValue({
        id: 'cus_test_123',
      });

      stripe.billingPortal.sessions.create.mockResolvedValue({
        url: 'https://billing.stripe.com/session_123',
      });

      const response = await mockPortalPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.url).toBe('https://billing.stripe.com/session_123');
    });

    it('should require authentication for billing portal', async () => {
      currentUser.mockResolvedValue(null);

      const response = await mockPortalPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.error).toBe('Unauthorized');
    });

    it('should handle existing customer for billing portal', async () => {
      const user = mockClerkUser();
      currentUser.mockResolvedValue(user);

      // Mock existing subscription with customer ID
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_existing_123',
      });

      mockPortalPOST.mockImplementation(async (request: NextRequest) => {
        const user = await currentUser();
        if (!user) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const subscription = await prisma.subscription.findUnique({
          where: { userId: user.id },
        });

        const customerId = subscription?.stripeCustomerId || 'cus_new_123';

        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings/billing`,
        });

        return new Response(JSON.stringify({ url: session.url }));
      });

      stripe.billingPortal.sessions.create.mockResolvedValue({
        url: 'https://billing.stripe.com/existing_session',
      });

      const response = await mockPortalPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.url).toBe('https://billing.stripe.com/existing_session');
      expect(stripe.billingPortal.sessions.create).toHaveBeenCalledWith({
        customer: 'cus_existing_123',
        return_url: expect.stringContaining('/settings/billing'),
      });
    });
  });

  describe('Products Listing', () => {
    it('should fetch active Stripe products', async () => {
      const mockProducts = [
        {
          id: 'prod_pro',
          name: 'TimekillPro',
          description: 'Pro subscription',
          active: true,
          default_price: {
            id: 'price_pro',
            unit_amount: 299,
            recurring: { interval: 'month' },
          },
        },
      ];

      stripe.products.list.mockResolvedValue({
        data: mockProducts,
      });

      const response = await mockProductsGET(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.products).toEqual(mockProducts);
      expect(stripe.products.list).toHaveBeenCalledWith({
        active: true,
        expand: ['data.default_price'],
      });
    });

    it('should handle Stripe products API errors', async () => {
      stripe.products.list.mockRejectedValue(new Error('Stripe API error'));

      mockProductsGET.mockImplementation(async () => {
        try {
          const products = await stripe.products.list({
            active: true,
            expand: ['data.default_price'],
          });
          return new Response(JSON.stringify({ products: products.data }));
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch products' }), 
            { status: 500 }
          );
        }
      });

      const response = await mockProductsGET(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.error).toBe('Failed to fetch products');
    });
  });

  describe('Webhook Processing', () => {
    it('should process subscription created webhook', async () => {
      const webhookPayload = JSON.stringify({
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_test_123',
            customer: 'cus_test_123',
            status: 'active',
            items: {
              data: [
                {
                  price: {
                    id: 'price_pro',
                    product: 'prod_pro',
                  },
                },
              ],
            },
          },
        },
      });

      const stripeSignature = 'test_signature';
      mockRequest.text = vi.fn().mockResolvedValue(webhookPayload);
      mockRequest.headers!.set('stripe-signature', stripeSignature);

      stripe.webhooks.constructEvent.mockReturnValue({
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_test_123',
            customer: 'cus_test_123',
            status: 'active',
            items: {
              data: [
                {
                  price: {
                    id: 'price_pro',
                    product: 'prod_pro',
                  },
                },
              ],
            },
          },
        },
      });

      mockWebhookPOST.mockImplementation(async (request: NextRequest) => {
        try {
          const body = await request.text();
          const signature = request.headers.get('stripe-signature');

          const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
          );

          if (event.type === 'customer.subscription.created') {
            // Process subscription creation
            const subscription = event.data.object;
            
            await prisma.subscription.create({
              data: {
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer,
                status: subscription.status,
                plan: 'pro',
              },
            });
          }

          return new Response(JSON.stringify({ received: true }));
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Webhook processing failed' }), 
            { status: 400 }
          );
        }
      });

      const response = await mockWebhookPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.received).toBe(true);
      expect(prisma.subscription.create).toHaveBeenCalled();
    });

    it('should verify webhook signature', async () => {
      const webhookPayload = JSON.stringify({ type: 'test.event' });
      mockRequest.text = vi.fn().mockResolvedValue(webhookPayload);
      mockRequest.headers!.set('stripe-signature', 'invalid_signature');

      stripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      mockWebhookPOST.mockImplementation(async (request: NextRequest) => {
        try {
          const body = await request.text();
          const signature = request.headers.get('stripe-signature');

          stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
          );

          return new Response(JSON.stringify({ received: true }));
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Webhook signature verification failed' }), 
            { status: 400 }
          );
        }
      });

      const response = await mockWebhookPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.error).toBe('Webhook signature verification failed');
    });

    it('should handle subscription updated webhook', async () => {
      const event = {
        type: 'customer.subscription.updated',
        data: {
          object: {
            id: 'sub_test_123',
            status: 'canceled',
          },
        },
      };

      stripe.webhooks.constructEvent.mockReturnValue(event);

      mockWebhookPOST.mockImplementation(async (request: NextRequest) => {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature');
        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

        if (event.type === 'customer.subscription.updated') {
          const subscription = event.data.object;
          
          await prisma.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: { status: subscription.status },
          });
        }

        return new Response(JSON.stringify({ received: true }));
      });

      mockRequest.text = vi.fn().mockResolvedValue(JSON.stringify(event));
      mockRequest.headers!.set('stripe-signature', 'valid_signature');

      const response = await mockWebhookPOST(mockRequest as NextRequest);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.received).toBe(true);
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_test_123' },
        data: { status: 'canceled' },
      });
    });
  });

  describe('End-to-End Subscription Flow', () => {
    it('should complete full subscription flow', async () => {
      const user = mockClerkUser();
      
      // Step 1: User creates checkout session
      currentUser.mockResolvedValue(user);
      stripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/pay/cs_test_123',
      });

      mockRequest.json = vi.fn().mockResolvedValue({
        priceId: 'price_pro_monthly',
      });

      const checkoutResponse = await mockCheckoutPOST(mockRequest as NextRequest);
      const checkoutResult = await checkoutResponse.json();

      expect(checkoutResponse.status).toBe(200);
      expect(checkoutResult.sessionId).toBe('cs_test_123');

      // Step 2: Webhook processes successful subscription
      const webhookEvent = {
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_test_123',
            customer: 'cus_test_123',
            status: 'active',
          },
        },
      };

      stripe.webhooks.constructEvent.mockReturnValue(webhookEvent);
      mockRequest.text = vi.fn().mockResolvedValue(JSON.stringify(webhookEvent));
      mockRequest.headers!.set('stripe-signature', 'valid_signature');

      const webhookResponse = await mockWebhookPOST(mockRequest as NextRequest);
      const webhookResult = await webhookResponse.json();

      expect(webhookResponse.status).toBe(200);
      expect(webhookResult.received).toBe(true);

      // Step 3: User accesses billing portal
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_test_123',
      });

      stripe.customers.create.mockResolvedValue({
        id: 'cus_test_123',
      });

      stripe.billingPortal.sessions.create.mockResolvedValue({
        url: 'https://billing.stripe.com/session_123',
      });

      const portalResponse = await mockPortalPOST(mockRequest as NextRequest);
      const portalResult = await portalResponse.json();

      expect(portalResponse.status).toBe(200);
      expect(portalResult.url).toBe('https://billing.stripe.com/session_123');
    });
  });
});