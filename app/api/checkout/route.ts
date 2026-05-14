import { NextResponse } from 'next/server'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export async function POST(req: Request) {
  try {
    const { productId, productName, price, quantity = 1 } = await req.json()

    if (!stripeSecretKey) {
      // Demo mode: return a mock checkout URL
      return NextResponse.json({
        url: `/store/success?product=${productId}&demo=true`,
      })
    }

    const Stripe = await import('stripe')
    const stripe = new Stripe.default(stripeSecretKey)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(price * 100), // cents
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/store`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}