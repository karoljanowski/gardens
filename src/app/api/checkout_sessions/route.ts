import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { stripe } from '../../../lib/stripe';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;

    if (!cartId) {
      return NextResponse.json({ error: 'No cart ID found' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    if (cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 404 });
    }

    if (!cart.userId) {
      return NextResponse.json({ error: 'Cart is not associated with a user' }, { status: 404 });
    }

    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.description,
          images: [`${origin}/courses/${item.image}`],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        cartId
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
