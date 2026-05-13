// AI Service — generates realistic mock responses for all AI-powered features
// In production, this would call OpenAI/Anthropic APIs with the enhanced prompts

export class AIService {
  static async generateProductDescription(product: {
    name: string
    category: string
    features?: string
    targetAudience?: string
    tone?: string
  }) {
    return this.mockCompletion('description', product)
  }

  static async generateAdCopy(params: {
    productName: string
    category?: string
    targetAudience?: string
    platform?: string
    goal?: string
    productDescription?: string
  }) {
    return this.mockCompletion('ad-copy', params)
  }

  static async analyzeAnalytics(metrics: Record<string, number>) {
    return this.mockCompletion('analytics', metrics)
  }

  static async suggestProducts(niche?: string, budget?: string) {
    return this.mockCompletion('suggest-products', { niche, budget })
  }

  static async chatResponse(message: string, context?: Record<string, any>) {
    return this.mockCompletion('chat', { message, context })
  }

  private static mockCompletion(type: string, params: any): any {
    switch (type) {
      case 'description':
        return this.mockProductDescription(params)
      case 'ad-copy':
        return this.mockAdCopy(params)
      case 'analytics':
        return this.mockAnalyticsInsight(params)
      case 'suggest-products':
        return this.mockProductSuggestions(params)
      case 'chat':
        return this.mockChatResponse(params)
      default:
        return { error: 'Unknown completion type' }
    }
  }

  // ─── Enhanced Mock: Product Description ───────────────────────────────
  private static mockProductDescription(params: any) {
    const { name, category } = params
    const categoryBenefits: Record<string, string[]> = {
      'Tech Accessories': [
        'Engineered with premium-grade materials that outlast cheap alternatives 5:1',
        'Universal compatibility — works seamlessly with all your devices',
        'Tangle-free, stress-free design that fits in your pocket or bag',
        'Fast-charging capability that saves you 2+ hours of waiting per day',
      ],
      'Health & Wellness': [
        'Doctor-recommended formulation backed by clinical research',
        'Free from artificial additives, GMOs, and common allergens',
        'Convenient daily format that fits seamlessly into your morning routine',
        'Visible results in as little as 2 weeks — or your money back',
      ],
      'Home Goods': [
        'Space-saving design that transforms cluttered areas into organized sanctuaries',
        'Premium materials that look beautiful and hold up to daily use',
        'Easy to clean, maintain, and move — no tools required',
        'Versatile style that complements any decor aesthetic',
      ],
    }

    const defaultBenefits = [
      'Premium quality that outperforms big-brand alternatives at half the price',
      'Versatile design for home, office, and travel',
      'Built to last with rigorous quality testing',
      'Satisfaction guaranteed with 30-day returns',
    ]

    return {
      success: true,
      data: {
        title: `${name} — Premium ${category || 'Quality'} at an Unbeatable Price`,
        subtitle: `The ${category?.toLowerCase() || 'product'} upgrade you didn't know you needed`,
        hook: `Most ${category?.toLowerCase() || 'products'} promise the world but deliver compromise. ${name} changes that equation entirely.`,
        shortDescription: `Elevate your daily routine with premium ${category?.toLowerCase() || 'quality'} engineered for real life.`,
        benefits: categoryBenefits[category || ''] || defaultBenefits,
        fullDescription: [
          `**Why settle for "good enough" when you can have exceptional?**`,
          ``,
          `We designed ${name} after listening to thousands of customers who were tired of ${category?.toLowerCase() || 'products'} that looked great on the shelf but failed in everyday use. The result is a product that doesn't just meet expectations — it exceeds them.`,
          ``,
          `**What makes ${name} different:**`,
          `• Premium construction with materials sourced from trusted global partners`,
          `• Thoughtful ergonomics designed for comfort during extended use`,
          `• Rigorous quality testing — every unit passes 47 checkpoints before shipping`,
          `• Beautiful packaging that makes it gift-ready right out of the box`,
          ``,
          `**Join 10,000+ happy customers** who've made the switch and wonder why they didn't do it sooner.`,
          ``,
          `> "Honestly, I was skeptical at first. But after using it for a week, I can't imagine going back. This is the quality I wish I'd had all along." — Verified Buyer`,
        ].join('\n'),
        seoKeywords: [
          `best ${category?.toLowerCase() || 'product'}`,
          'premium quality',
          `${name.toLowerCase()} review`,
          'affordable alternative',
          'top rated',
          'everyday essential',
          'gift for [audience]',
        ],
        callToAction: 'Get yours now with free shipping and a 30-day happiness guarantee. Stock is limited — don\'t wait.',
      },
    }
  }

  // ─── Enhanced Mock: Ad Copy ─────────────────────────────────────────
  private static mockAdCopy(params: any) {
    const { productName, category } = params

    const headlines: Record<string, string[]> = {
      'Tech Accessories': [
        'Your Charger Is Slowly Killing Your Battery',
        'The Cable That Outlasts Your Phone',
        'Stop Overpaying for Tech That Breaks',
      ],
      'Health & Wellness': [
        'The 30-Second Habit That Changes Everything',
        'Your Body Is Trying to Tell You Something',
        'The Supplement Doctors Won\'t Tell You About',
      ],
      'Home Goods': [
        'This 5-Minute Fix Transformed My Home',
        'The Hack Interior Designers Don\'t Want You to Know',
        'Your Home Deserves Better Than IKEA',
      ],
    }

    const defaultHeadlines = [
      'Everyone Wants One — And Stock Is Running Out',
      'The $29 Upgrade That Feels Like a Million Bucks',
    ]

    const catHeadlines = headlines[category || ''] || defaultHeadlines

    return {
      success: true,
      data: {
        primary: {
          headline: catHeadlines[0],
          hook: `Stop scrolling for a second. This changes everything.`,
          body: [
            `Let's be real — most products in this category are either overpriced or under-built.`,
            ``,
            `${productName} is neither.`,
            ``,
            `We stripped away the useless extras and focused on what actually matters: quality that lasts, design that works, and a price that makes sense.`,
            ``,
            `**Here's what customers are saying:**`,
            `⭐ "Game changer — I bought 3 more for my family"`,
            `⭐ "Best money I've spent this year, and it's not even close"`,
            `⭐ "Finally, a ${category?.toLowerCase() || 'product'} that actually works as advertised"`,
            ``,
            `${Math.floor(Math.random() * 5000) + 1000}+ sold in the last 30 days.`,
            ``,
            `👉 **Tap "Shop Now" to grab yours while stock lasts.**`,
          ].join('\n'),
          socialProof: `⭐ 4.8/5 from ${Math.floor(Math.random() * 3000) + 1000}+ verified reviews`,
          callToAction: 'Shop Now — Free Shipping Worldwide 🌍',
        },
        variations: [
          {
            variant: 'Urgency-driven',
            headline: catHeadlines[1] || 'Limited Stock — Moving Fast',
            hook: `⚠️ We almost didn't restock this. Here's why you should act now.`,
            body: `When we launched ${productName}, we expected it to be popular. We didn't expect it to sell out in 48 hours — three times in a row.

Our latest batch just arrived, and based on the pre-order list, we're already 60% sold out.

This isn't a fake scarcity tactic. We manufacture in small, quality-controlled batches because we refuse to compromise on quality.

**If you've been thinking about getting one, now is the time.**

👉 Click "Shop Now" — free shipping included.`,
            callToAction: 'Buy Now — 60% of Stock Already Gone',
          },
          {
            variant: 'Social-proof driven',
            headline: catHeadlines[2] || '10,000+ People Can\'t Be Wrong',
            hook: `The reviews speak for themselves — here's what real buyers are saying.`,
            body: `We don't write fake reviews. We don't pay influencers to shill our products. We just make really good ${category?.toLowerCase() || 'products'} and let the results speak.

And the results? Pretty incredible.

⭐ 4.8/5 average rating
✅ 98% would recommend to a friend
📦 ${Math.floor(Math.random() * 800) + 200}+ repeat customers

${productName} isn't for everyone — but if you value quality, thoughtful design, and honest pricing, it's absolutely for you.

See why the reviews are calling it "the best purchase of 2025."`,
            callToAction: 'See What Everyone\'s Talking About →',
          },
        ],
      },
    }
  }

  // ─── Enhanced Mock: Analytics Insight ─────────────────────────────────
  private static mockAnalyticsInsight(_params?: any) {
    const insights = [
      {
        metric: 'Revenue',
        insight: 'Your daily revenue has grown 18% week-over-week. Your top-performing day is Tuesday — consider scheduling ad campaigns to peak on Mondays for maximum impact.',
        action: 'Increase ad spend by 15% targeting the same audience segments.',
      },
      {
        metric: 'Conversion Rate',
        insight: `Your current conversion rate of 3.2% is above the industry average of 1-2% for dropshipping stores. The abandoned cart rate of 22% suggests there's room to recover lost sales.`,
        action: 'Optimize your abandoned cart email sequence — customers who receive a recovery email within 1 hour convert at 3x the rate.',
      },
      {
        metric: 'Return Rate',
        insight: 'Your return rate of 4.1% is healthy (industry average is 15-20% for apparel, 5-10% for electronics). Products in the Health & Wellness category have the lowest return rate at 2.3%.',
        action: 'Feature Health & Wellness products more prominently — they have the highest customer satisfaction and lowest return rate.',
      },
      {
        metric: 'Average Order Value',
        insight: `Your AOV of $47.50 is solid. Customers who buy 2+ items have a 40% lower return rate.`,
        action: 'Implement a "Complete the Set" upsell strategy at checkout — bundle complementary products for a 10% discount.',
      },
    ]

    return {
      success: true,
      data: {
        summary: 'Your store is performing well across all key metrics. Revenue is trending upward, and customer satisfaction is strong. The biggest opportunity right now is recovering abandoned carts and increasing average order value through smart bundling.',
        insights,
        recommendations: [
          'Launch a post-purchase upsell sequence to increase AOV by 15-20%',
          'Optimize mobile checkout experience — 68% of traffic is mobile but only 42% of conversions',
          'Test free shipping threshold at $49 — data shows it increases AOV by 22%',
          'Add customer reviews to product pages — stores with reviews see 18% higher conversion',
        ],
        predictedTrend: 'Based on current momentum, you\'re on track to hit $15,000 in monthly revenue within 60 days if you implement the abandoned cart recovery improvements.',
      },
    }
  }

  // ─── Enhanced Mock: Product Suggestions ──────────────────────────────
  private static mockProductSuggestions(params: any) {
    const { niche } = params

    const suggestions: Record<string, any[]> = {
      'Tech Accessories': [
        {
          name: 'Magnetic Wireless Charging Station',
          niche: 'Tech Accessories',
          avgMargin: 68,
          competition: 'Medium',
          monthlySearchVolume: 45000,
          whyWin: 'Working from home is here to stay, and everyone wants to declutter their desk. This product organizes iPhone, AirPods, and Apple Watch charging into one sleek pad.',
          estimatedProfitPerUnit: 24.50,
          supplier: 'Spocket (5-14 day shipping)',
        },
        {
          name: 'Portable Laptop Stand with Cooling Fan',
          niche: 'Tech Accessories',
          avgMargin: 72,
          competition: 'Low-Medium',
          monthlySearchVolume: 32000,
          whyWin: 'Remote workers and digital nomads need ergonomic setups anywhere. Built-in cooling fan addresses the #1 complaint about laptop stands.',
          estimatedProfitPerUnit: 19.99,
          supplier: 'CJDropshipping (7-18 day shipping)',
        },
        {
          name: 'USB-C Hub 7-in-1 with 4K HDMI',
          niche: 'Tech Accessories',
          avgMargin: 65,
          competition: 'High',
          monthlySearchVolume: 88000,
          whyWin: 'New MacBooks and ultrabooks only have USB-C ports — this solves the #1 pain point. 4K HDMI support makes it a must-have for professionals.',
          estimatedProfitPerUnit: 15.75,
          supplier: 'AliExpress (10-25 day shipping)',
        },
      ],
      'Health & Wellness': [
        {
          name: 'Acupressure Mat with Memory Foam Pillow',
          niche: 'Health & Wellness',
          avgMargin: 75,
          competition: 'Low',
          monthlySearchVolume: 28000,
          whyWin: 'Stress and back pain are universal. This drug-free pain relief solution has a loyal following and gets addictive word-of-mouth referrals.',
          estimatedProfitPerUnit: 22.00,
          supplier: 'Spocket (5-14 day shipping)',
        },
        {
          name: 'Blue Light Blocking Glasses (Premium)',
          niche: 'Health & Wellness',
          avgMargin: 80,
          competition: 'Medium',
          monthlySearchVolume: 92000,
          whyWin: "Screen time isn't going down. Stylish blue light glasses appeal to both health-conscious consumers and fashion-forward shoppers.",
          estimatedProfitPerUnit: 18.50,
          supplier: 'Zendrop (8-20 day shipping)',
        },
        {
          name: 'Infrared Heating Pad for Muscle Relief',
          niche: 'Health & Wellness',
          avgMargin: 70,
          competition: 'Low-Medium',
          monthlySearchVolume: 22000,
          whyWin: 'Athletes, gym-goers, and chronic pain sufferers are actively searching for drug-free relief. Infrared technology is a strong differentiator.',
          estimatedProfitPerUnit: 28.00,
          supplier: 'CJDropshipping (7-18 day shipping)',
        },
      ],
      'Home Goods': [
        {
          name: 'Smart Plant Pot with Self-Watering System',
          niche: 'Home Goods',
          avgMargin: 65,
          competition: 'Low',
          monthlySearchVolume: 18000,
          whyWin: 'Plant parenting is booming. This solves the #1 killer of houseplants: inconsistent watering. Smart sensor adds tech appeal.',
          estimatedProfitPerUnit: 16.00,
          supplier: 'Spocket (5-14 day shipping)',
        },
        {
          name: 'Under-Desk Foot Rest with Massage Function',
          niche: 'Home Goods',
          avgMargin: 72,
          competition: 'Low',
          monthlySearchVolume: 14000,
          whyWin: 'Work-from-home continues to grow. Combines ergonomics with relaxation — two categories with huge demand.',
          estimatedProfitPerUnit: 21.00,
          supplier: 'Zendrop (8-20 day shipping)',
        },
      ],
    }

    const defaultSuggestions = suggestions[niche || ''] || [
      {
        name: 'Premium Phone Grip + Wallet Stand',
        niche: 'Tech Accessories',
        avgMargin: 75,
        competition: 'Medium',
        monthlySearchVolume: 35000,
        whyWin: 'Everyone with a phone is a potential customer. Solves the "where did I put my wallet" problem with an elegant one-piece solution.',
        estimatedProfitPerUnit: 12.99,
        supplier: 'Spocket (5-14 day shipping)',
      },
      {
        name: 'Organic Sleep Mask with Cooling Gel',
        niche: 'Health & Wellness',
        avgMargin: 78,
        competition: 'Low',
        monthlySearchVolume: 24000,
        whyWin: 'Sleep optimization is a massive trend. Cooling gel layer and organic materials justify a premium price point.',
        estimatedProfitPerUnit: 16.50,
        supplier: 'Zendrop (8-20 day shipping)',
      },
      {
        name: 'Expandable Drawer Organizer Set',
        niche: 'Home Goods',
        avgMargin: 68,
        competition: 'Low-Medium',
        monthlySearchVolume: 19000,
        whyWin: 'Organization content dominates social media. Expandable design fits any drawer — reduces returns.',
        estimatedProfitPerUnit: 11.00,
        supplier: 'CJDropshipping (7-18 day shipping)',
      },
    ]

    return {
      success: true,
      data: {
        marketAnalysis: {
          trend: niche ? `The ${niche} market is growing at 12% YoY with strong demand across social media channels.` : 'Dropshipping continues to grow with increasing consumer comfort buying from independent stores.',
          bestChannel: niche === 'Tech Accessories' ? 'TikTok & Instagram Reels' : 'Facebook & Pinterest',
          seasonality: niche === 'Home Goods' ? 'Peaks in January (New Year organization) and September (fall nesting season)' : 'Steady demand year-round with Q4 holiday boost',
        },
        suggestions: defaultSuggestions,
        recommendation: defaultSuggestions[0],
      },
    }
  }

  // ─── Enhanced Mock: General Chat ────────────────────────────────────
  private static mockChatResponse(params: any) {
    const { message } = params
    const msg = (message || '').toLowerCase()

    if (msg.includes('trending') || msg.includes('winning product') || msg.includes('what to sell')) {
      return {
        success: true,
        data: {
          message: `**Trending products right now:** Based on current market data, these categories are hot:

1. **Tech Accessories** 🔥 — MagSafe accessories, portable laptop stands, and USB-C hubs are seeing 40%+ growth month-over-month. Remote work continues to drive demand.

2. **Health & Wellness** 💪 — Acupressure mats, blue light glasses, and infrared heating pads have low competition and high margins (65-80%).

3. **Home Organization** 🏠 — Self-watering plant pots, expandable drawer organizers, and under-desk accessories are blowing up on TikTok with millions of views.

**My top pick:** The Magnetic Wireless Charging Station. 68% margins, medium competition, 45K monthly searches. I can write a full product description and ad copy for it if you want!`,
          quickActions: [
            'Generate product description',
            'Write ad copy for this',
            'Analyze my store fit',
            'Find supplier options',
          ],
        },
      }
    }

    if (msg.includes('analytics') || msg.includes('performance') || msg.includes('how am i doing')) {
      return {
        success: true,
        data: {
          message: `**Your Store Performance Snapshot 📊**

Here's how you're doing:

✅ **Revenue:** Trending up 18% week-over-week — solid momentum
✅ **Conversion Rate:** 3.2% (dropshipping avg is 1-2% — you're crushing it!)
✅ **AOV:** $47.50 — room to grow with smart bundling
✅ **Return Rate:** 4.1% — well below industry average

**Biggest opportunity:** Abandoned cart recovery. Your rate is 22%, which means you're leaving money on the table. Customers who receive a recovery email within 1 hour are 3x more likely to convert.

Want me to optimize your abandoned cart email sequence?`,
          quickActions: [
            'Optimize abandoned cart emails',
            'Suggest upsell strategies',
            'Compare to benchmarks',
            'Generate weekly report',
          ],
        },
      }
    }

    if (msg.includes('product description') || msg.includes('write description')) {
      return {
        success: true,
        data: {
          message: `I'd love to write a compelling product description for you! Just tell me:

1. **Product name** — what are we selling?
2. **Category** — tech, health, home, etc.
3. **Key features** — what makes it special?
4. **Tone preference** — professional, casual, luxury, or fun?

Or just give me the product name and I'll research and create something amazing. ✨`,
          quickActions: [
            'Write for: Magnetic Charging Station',
            'Write for: Acupressure Mat',
            'Write for: Laptop Stand',
            'I\'ll provide custom details',
          ],
        },
      }
    }

    if (msg.includes('ad') || msg.includes('ad copy') || msg.includes('script')) {
      return {
        success: true,
        data: {
          message: `**Ready to create high-converting ad copy! 🎯**

To write ads that actually sell, I need to know:

📌 **Product** — what are we advertising?
📌 **Platform** — Facebook, TikTok, Instagram, Google?
📌 **Goal** — conversions, awareness, retargeting?
📌 **Audience** — who are we targeting?

For example: "Write a Facebook ad for the Magnetic Charging Station targeting remote workers, goal is conversions."

I'll generate 3 variations — pain-point focused, benefit-driven, and urgency-driven. You pick the winner.`,
          quickActions: [
            'Facebook ad for charging station',
            'TikTok script for acupressure mat',
            'Instagram story for organizer set',
            'Google Shopping description',
          ],
        },
      }
    }

    if (msg.includes('niche') || msg.includes('market') || msg.includes('category')) {
      return {
        success: true,
        data: {
          message: `**Niche Market Analysis 🎯**

Here are the 3 best niches for dropshipping right now:

**1. Tech Accessories** — $340B+ market, growing 9% YoY
- Pros: High demand, repeat buyers, easy to advertise
- Cons: More competition, need strong differentiation
- Best for: TikTok/Instagram marketing

**2. Health & Wellness** — $4.2T global market
- Pros: Highest margins (70-80%), low return rates
- Cons: Regulatory considerations for some products
- Best for: Email marketing + content

**3. Home Goods** — Growing 12% YoY post-pandemic
- Pros: Viral potential on social media, low competition
- Cons: Bulkier shipping, lower perceived value
- Best for: Pinterest + Facebook

Want me to deep-dive into any of these?`,
          quickActions: [
            'Deep dive: Tech Accessories',
            'Deep dive: Health & Wellness',
            'Compare all 3 niches',
            'Show top products in each',
          ],
        },
      }
    }

    // Default / general response
    return {
      success: true,
      data: {
        message: `Hi! 👋 I'm your DropAI dropshipping co-pilot. I can help you with:

🔍 **Finding winning products** — trending niches, market analysis, and product research
✍️ **Writing copy** — product descriptions that convert and ad scripts that sell
📊 **Analyzing performance** — store analytics, insights, and growth recommendations
💡 **Strategy advice** — niche selection, pricing, marketing channels, and more

What would you like help with today?`,
        quickActions: [
          'Find trending products to sell',
          'Write a product description',
          'Create an ad script',
          'Analyze my store performance',
          'Suggest a profitable niche',
        ],
      },
    }
  }
}