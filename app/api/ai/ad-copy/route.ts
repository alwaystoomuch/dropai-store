import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productName, category, targetAudience, platform, goal, productDescription } = body

    if (!productName) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      )
    }

    // Build an enhanced AI prompt for ad copy generation
    const prompt = `You are a high-converting direct response copywriter specializing in dropshipping ads. Your ads have generated millions in revenue.

PRODUCT: ${productName}
CATEGORY: ${category || 'General'}
TARGET AUDIENCE: ${targetAudience || 'Online shoppers aged 25-45'}
PLATFORM: ${platform || 'Facebook/Instagram'}
GOAL: ${goal || 'Conversions (direct sales)'}
PRODUCT DETAILS: ${productDescription || 'A premium everyday essential'}

Write ad copy optimized for ${platform || 'social media'} that follows these proven frameworks:

1. **Attention-grabbing hook**: First 2 seconds / first line must stop the scroll
2. **Problem aggravation**: Make them feel the pain of NOT having this product
3. **Solution presentation**: Position the product as the obvious answer
4. **Social proof integration**: "Join 10,000+ happy customers"
5. **Strong CTA**: Clear, urgent, specific

Format as JSON with exactly these fields:
{
  "headline": "Short, punchy headline (max 10 words) — must create curiosity or urgency",
  "hook": "The first 1-2 sentences — stop the scroll",
  "body": "Main ad body (80-120 words) — problem → solution → proof → CTA flow",
  "socialProof": "One-liner incorporating social proof",
  "callToAction": "A specific, urgent CTA",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "variations": [
    {
      "variant": "Pain-point focused",
      "headline": "Alternative headline focusing on pain point",
      "body": "Alternative body copy"
    },
    {
      "variant": "Benefit-focused",
      "headline": "Alternative headline focusing on transformation",
      "body": "Alternative body copy"
    }
  ]
}

Return ONLY valid JSON — no markdown, no code fences, no extra text.`

    const mockResponse = generateMockAdCopy(productName, category)

    return NextResponse.json({
      prompt,
      result: mockResponse,
      model: 'dropai-ad-writer-v1',
    })
  } catch (error) {
    console.error('Ad copy generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate ad copy' },
      { status: 500 }
    )
  }
}

function generateMockAdCopy(productName: string, category?: string) {
  const headlines: Record<string, string> = {
    'Tech Accessories': 'Your Tech Deserves Better — So Do You',
    'Health & Wellness': 'The One Change Your Body Is Begging For',
    'Home Goods': 'Your Home Has Potential — Unlock It',
    'Kitchen': 'Stop Wasting Time in the Kitchen',
    'Beauty': 'The 2-Minute Secret to Glowing Skin',
    'Fashion': 'Look Like a Million Without Spending It',
  }

  const headline = headlines[category || ''] || 'Everyone\'s Talking About This — Here\'s Why'

  const hooks: Record<string, string> = {
    'Tech Accessories': 'Tired of buying cables that fray, chargers that overheat, and accessories that break after a month?',
    'Health & Wellness': "You've tried the diets, the supplements, the \"miracle\" fixes. What if the real solution is simpler than you think?",
    'Home Goods': 'They say your environment shapes your mindset. So why are you still living with furniture and decor that drains your energy?',
    'Kitchen': 'Cooking at home should save you money and stress — not the other way around.',
    'Beauty': 'Forget the 12-step routine. What if you only needed 2 products to transform your skin?',
    'Fashion': 'Your wardrobe is 80% full but you still feel like you have "nothing to wear." We fixed that.',
  }

  const hook = hooks[category || ''] || 'Stop scrolling past products that promise the world and deliver nothing. This one is different.'

  const body = `Most people spend hours researching products, reading conflicting reviews, and still end up with something that doesn't deliver.

We made ${productName} differently.

Instead of cutting corners to hit a price point, we focused on what actually matters: quality that lasts, design that works, and value that doesn't require a second mortgage.

The result? A product that ${Math.floor(Math.random() * 8000) + 2000}+ customers rate 4.8/5 — not because we paid for reviews, but because it genuinely changes their daily routine.

Here's what customers say:
⭐ "Wish I'd found this sooner — total game changer"
⭐ "Bought one for myself, then ordered three more for gifts"
⭐ "Finally, a ${category?.toLowerCase() || 'product'} that actually lives up to the hype"

We're so confident you'll love it, every order comes with a 30-day happiness guarantee. No questions asked.

**Don't wait — this batch is selling fast and we can't guarantee when we'll restock.**

👉 Click "Shop Now" to grab yours before they're gone.`

  return {
    headline,
    hook,
    body,
    socialProof: `⭐ Loved by ${Math.floor(Math.random() * 8000) + 2000}+ customers worldwide with a 4.8/5 average rating`,
    callToAction: `Shop Now — Free Shipping on Orders Over $49 🚚`,
    hashtags: [
      '#DailyEssential',
      '#GameChanger',
      '#CustomerFavorite',
      '#SmartShopping',
      '#QualityMatters',
    ],
    variations: [
      {
        variant: 'Pain-point focused',
        headline: 'Still Using [Old Product]? It\'s Time for an Upgrade',
        body: `Let's be honest: your current ${category?.toLowerCase() || 'product'} is fine. But "fine" isn't the same as "great."

You deserve a product that doesn't just work — it makes your life better.

${productName} is engineered to outperform everything in its category. Premium materials. Thoughtful design. Backed by a satisfaction guarantee.

Don't settle for fine. Upgrade to great.`,
      },
      {
        variant: 'Benefit-focused',
        headline: 'The Smartest $29 You\'ll Spend This Month',
        body: `Think about everything you spend money on in a month. Coffee runs. Delivery fees. Subscriptions you forgot about.

Now imagine spending less than a dinner out for something you'll use every single day.

${productName} delivers premium quality at a fraction of the price you'd pay for big-brand alternatives. It's not just a purchase — it's an investment in your daily happiness.

Free shipping. 30-day guarantee. What have you got to lose?`,
      },
    ],
  }
}