import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')

  if (!webhookSecret || !signature) {
    return NextResponse.json(
      { error: 'Missing webhook secret or signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event
  const buf = Buffer.from(await request.arrayBuffer());

  try {
    event = stripe.webhooks.constructEvent(buf, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      const cartId = session.metadata?.cartId

      if (!cartId) {
        console.error('No cart id found in session')
        return NextResponse.json({ error: 'No cart id found in session' }, { status: 400 })
      }

      const cart = await prisma.cart.findUnique({
        where: {
          id: cartId
        },
        include: {
          items: true
        }
      })

      if (!cart || !cart.userId) {
        console.error('No cart found for id:', cartId)
        return NextResponse.json({ error: 'No cart found for id' }, { status: 400 })
      }

      const userId = cart.userId;

      cart.items.forEach(async (item) => {
        await prisma.userCourse.create({
          data: {
            user: { connect: { id: userId } },
            course: { connect: { id: item.id } },
          }
        })
      })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
      break
  }

  return NextResponse.json({ success: true }, { status: 200 });
}