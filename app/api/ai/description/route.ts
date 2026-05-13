import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productName, category, targetAudience, tone, features } = body

    if (!productName) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      )
    }

    // Build an enhanced AI prompt that produces compelling, conversion-focused copy
    const prompt = `You are an expert e-commerce copywriter for a dropshipping store called DropAI. Your specialty is writing product descriptions that convert browsers into buyers.

PRODUCT: ${productName}
CATEGORY: ${category || 'General'}
KEY FEATURES: ${features || 'Not specified'}
TARGET AUDIENCE: ${targetAudience || 'Online shoppers looking for quality products'}
DESIRED TONE: ${tone || 'Persuasive and benefit-driven'}

Write a compelling product description following these principles:

1. **Hook**: Open with a pain point or desire that resonates with the target audience
2. **Benefits over features**: Always translate features into emotional benefits
3. **Social proof**: Include subtle trust signals (e.g., "loved by 10,000+ customers")
4. **Scarcity/urgency**: Include a natural reason to buy now (limited stock, trending product)
5. **SEO-friendly**: Naturally include relevant keywords
6. **Clear CTA**: End with a call to action

Format your response as JSON with exactly these fields:
{
  "name": "${productName} — [catchy subtitle]",
  "shortDescription": "One compelling sentence (max 20 words) for category pages",
  "hook": "The opening hook — 1-2 sentences addressing the customer's pain point or desire",
  "benefits": ["Benefit 1 — emotional, customer-focused", "Benefit 2", "Benefit 3", "Benefit 4"],
  "description": "Full product description (150-200 words) with storytelling, benefits, and social proof",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "callToAction": "A short, urgent CTA (e.g., 'Order now and get free shipping — while stock lasts')"
}

Return ONLY valid JSON — no markdown, no code fences, no extra text.`

    const mockResponse = generateMockDescription(productName, category)

    return NextResponse.json({
      prompt,
      result: mockResponse,
      model: 'dropai-copywriter-v1',
    })
  } catch (error) {
    console.error('Description generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate product description' },
      { status: 500 }
    )
  }
}

function generateMockDescription(productName: string, category?: string) {
  const categoryHooks: Record<string, string> = {
    'Tech Accessories': 'Tired of tangled cables, dead batteries, and cluttered desks eating into your productivity?',
    'Health & Wellness': 'Your body works hard for you every single day — isn\'t it time you gave it the support it actually deserves?',
    'Home Goods': 'Your home should be your sanctuary, not a source of stress. Small upgrades make the biggest difference.',
    'Kitchen': 'They say the kitchen is the heart of the home — but cooking shouldn\'t feel like a chore.',
    'Beauty': 'Great skin doesn\'t have to come with a complicated 12-step routine or a luxury price tag.',
    'Fashion': 'Style isn\'t about how much you spend — it\'s about finding pieces that make you feel unstoppable.',
  }

  const hook = categoryHooks[category || ''] || 'Tired of products that overpromise and underdeliver? Meet your new everyday essential.'

  const benefits = [
    `Saves you time and frustration — works right out of the box, no setup required`,
    `Built to last with premium materials — backed by thousands of 5-star reviews`,
    `Versatile enough for daily use — whether at home, in the office, or on the go`,
    `Risk-free with our 30-day satisfaction guarantee — love it or your money back`,
  ]

  const description = `Introducing the **${productName}** — the upgraded version of everything you wished your old one could do.

We scoured the market, tested dozens of alternatives, and found that most products in this category fall short in one critical area: they look good on paper but fail in real life. So we went back to the drawing board.

${productName} is built with one thing in mind: **making your life easier, better, and more enjoyable**. Every detail — from the materials we chose to the way it fits in your hand — has been engineered for real-world use.

Here's what makes it different:
• Premium build quality that actually lasts (because replacing cheap products every few months is exhausting)
• Thoughtful design that fits seamlessly into your routine
• Performance that exceeds expectations at a fraction of the price you'd pay for big-brand alternatives

Don't just take our word for it — ${Math.floor(Math.random() * 5000) + 500}+ customers have made the switch, and our 4.8/5 average rating speaks for itself.

**Upgrade your everyday. You deserve better.**

${productName} — the smart choice for people who refuse to settle for mediocre.`

  return {
    name: `${productName} — Premium Quality, Unbeatable Value`,
    shortDescription: `Upgrade your daily routine with premium ${category?.toLowerCase() || 'quality'} that won't break the bank.`,
    hook,
    benefits,
    description,
    seoKeywords: [
      productName.toLowerCase(),
      `best ${category?.toLowerCase() || 'product'}`,
      `affordable ${category?.toLowerCase() || 'quality'}`,
      'dropshipping deals',
      'premium everyday essential',
    ],
    callToAction: `Order now and enjoy free shipping — this price won't last forever.`,
  }
}