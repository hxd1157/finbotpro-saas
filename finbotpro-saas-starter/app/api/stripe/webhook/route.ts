import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse('Missing Stripe config', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } }
