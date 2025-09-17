import Stripe from 'stripe'

export const config = {
  path: "/api/stripe/webhook"
}

export default async (event: any) => {
  try {
    const sig = event.headers['stripe-signature']
    if (!sig) return { statusCode: 400, body: 'Missing Stripe signature' }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

    const isBase64 = event.isBase64Encoded
    const body = isBase64 ? Buffer.from(event.body, 'base64') : Buffer.from(event.body)

    const secret = process.env.STRIPE_WEBHOOK_SECRET
    if (!secret) return { statusCode: 400, body: 'Missing STRIPE_WEBHOOK_SECRET' }

    let evt: Stripe.Event
    try {
      evt = stripe.webhooks.constructEvent(body, sig, secret)
    } catch (err: any) {
      return { statusCode: 400, body: `Webhook Error: ${err.message}` }
    }

    // TODO: update Subscription in DB based on evt.type

    return { statusCode: 200, body: JSON.stringify({ received: true }) }
  } catch (e: any) {
    return { statusCode: 500, body: e?.message || 'Server error' }
  }
}
