// Email Service — generates professional, conversion-optimized HTML email templates
// for all 5 automated campaign types

export class EmailService {
  static getCampaigns() {
    return [
      {
        type: 'welcome',
        name: 'Welcome Series',
        subject: 'Welcome to DropAI — Your Smart Shopping Journey Starts Here',
        description: 'Sent immediately after a customer creates an account or makes their first purchase.',
      },
      {
        type: 'order_confirmation',
        name: 'Order Confirmation',
        subject: '✅ Order Confirmed! Here\'s What Happens Next',
        description: 'Sent immediately after a customer completes a purchase.',
      },
      {
        type: 'shipping_notification',
        name: 'Shipping Notification',
        subject: '📦 Your Package Has Shipped! Track It Here',
        description: 'Sent when the supplier provides a tracking number.',
      },
      {
        type: 'abandoned_cart',
        name: 'Abandoned Cart Recovery',
        subject: '🛒 Your Cart Is Waiting — Don\'t Miss Out',
        description: 'Sent 1 hour and 24 hours after a customer abandons their cart.',
      },
      {
        type: 'supplier_outreach',
        name: 'Supplier Outreach',
        subject: 'Partnership Opportunity: DropAI — 30+ Products, Growing Fast',
        description: 'Sent to suppliers when onboarding new fulfillment partners.',
      },
    ]
  }

  static generateEmailHtml(campaignType: string, data: Record<string, any>): string {
    switch (campaignType) {
      case 'welcome':
        return this.welcomeEmail(data)
      case 'order_confirmation':
        return this.orderConfirmationEmail(data)
      case 'shipping_notification':
        return this.shippingNotificationEmail(data)
      case 'abandoned_cart':
        return this.abandonedCartEmail(data)
      case 'supplier_outreach':
        return this.supplierOutreachEmail(data)
      default:
        return this.fallbackEmail(data)
    }
  }

  // ─── 1. Welcome Email ──────────────────────────────────────────────────
  private static welcomeEmail(data: Record<string, any>): string {
    const { customerName = 'there', discountCode = 'WELCOME10' } = data
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:40px 30px;text-align:center;">
              <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px;">Welcome to DropAI! 🎉</h1>
              <p style="color:#c4b5fd;font-size:16px;margin:0;">Your AI-powered shopping experience starts now</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;">
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">Hey ${customerName},</p>
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">Thanks for joining the DropAI community! We're on a mission to bring you <strong style="color:#4f46e5;">premium-quality products at honest prices</strong> — no markup for fancy branding, no compromises on quality.</p>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 10px;"><strong>Here's what you can expect:</strong></p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:8px 0;font-size:15px;color:#475569;line-height:1.5;">🚚 <strong>Fast, Tracked Shipping</strong> — real-time updates from our global partners</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:15px;color:#475569;line-height:1.5;">💎 <strong>Curated Quality</strong> — every product is tested before it makes it to our store</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:15px;color:#475569;line-height:1.5;">🛡️ <strong>30-Day Happiness Guarantee</strong> — love it or get a full refund, no questions asked</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:15px;color:#475569;line-height:1.5;">🤖 <strong>AI-Powered Picks</strong> — personalized product recommendations just for you</td>
                </tr>
              </table>

              <!-- Discount CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;">
                <tr>
                  <td>
                    <p style="font-size:14px;color:#92400e;margin:0 0 8px;">YOUR EXCLUSIVE WELCOME OFFER</p>
                    <p style="font-size:36px;font-weight:bold;color:#78350f;margin:0 0 8px;letter-spacing:2px;">${discountCode}</p>
                    <p style="font-size:15px;color:#92400e;margin:0 0 16px;">Use code at checkout for <strong>10% OFF</strong> your first order</p>
                    <a href="${data.storeUrl || '#'}" style="display:inline-block;background-color:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;">Shop Now →</a>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px;color:#64748b;line-height:1.6;margin:0;">We're just getting started — new products arrive every week, picked by our AI to match what our customers actually want.</p>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:24px 0 0;">Welcome aboard,<br><strong style="color:#4f46e5;">The DropAI Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding:24px 30px;text-align:center;background-color:#f8fafc;">
              <p style="font-size:13px;color:#94a3b8;margin:0 0 8px;">© 2026 DropAI. AI-Powered Dropshipping Store.</p>
              <p style="font-size:13px;color:#94a3b8;margin:0;">
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Privacy Policy</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Support</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Pre-footer -->
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:16px 30px;text-align:center;">
              <p style="font-size:12px;color:#94a3b8;margin:0;">You received this email because you created an account at DropAI.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  // ─── 2. Order Confirmation ─────────────────────────────────────────────
  private static orderConfirmationEmail(data: Record<string, any>): string {
    const { customerName = 'there', orderNumber = 'ORD-001', items = [], total = 0, estimatedDelivery = '5-10 business days' } = data
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#059669,#10b981);padding:32px 30px;text-align:center;">
              <p style="font-size:48px;margin:0 0 8px;">✅</p>
              <h1 style="color:#ffffff;font-size:24px;margin:0 0 4px;">Order Confirmed!</h1>
              <p style="color:#a7f3d0;font-size:15px;margin:0;">Your order <strong style="color:#ffffff;">${orderNumber}</strong> is being processed</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">Hey ${customerName},</p>
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 24px;">Thanks for your order! We've received it and our team is already working to get it ready for shipping.</p>

              <!-- Order Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;padding:20px;margin:0 0 24px;">
                <tr>
                  <td>
                    <h3 style="font-size:16px;color:#1e293b;margin:0 0 16px;">📋 Order Summary</h3>
                    ${items.length > 0 ? items.map((item: any, i: number) => `
                    <table width="100%" cellpadding="0" cellspacing="0" style="${i < items.length - 1 ? 'border-bottom:1px solid #e2e8f0;' : ''}padding:${i > 0 ? '12px 0 0' : '0 0 12px'};">
                      <tr>
                        <td style="font-size:14px;color:#475569;">${item.name || 'Product'} × ${item.quantity || 1}</td>
                        <td align="right" style="font-size:14px;color:#1e293b;font-weight:600;">$${(item.price || 0).toFixed(2)}</td>
                      </tr>
                    </table>
                    `).join('') : ''}
                    <table width="100%" cellpadding="0" cellspacing="0" style="padding-top:12px;">
                      <tr>
                        <td style="font-size:14px;color:#64748b;">Subtotal</td>
                        <td align="right" style="font-size:14px;color:#475569;">$${(total * 0.9).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px;color:#64748b;">Shipping</td>
                        <td align="right" style="font-size:14px;color:#10b981;font-weight:600;">FREE</td>
                      </tr>
                      <tr>
                        <td style="font-size:16px;color:#1e293b;font-weight:700;padding-top:8px;border-top:2px solid #e2e8f0;">Total</td>
                        <td align="right" style="font-size:16px;color:#1e293b;font-weight:700;padding-top:8px;border-top:2px solid #e2e8f0;">$${(total || 0).toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                <tr>
                  <td style="padding:4px 0;font-size:15px;color:#475569;">📦 <strong>Estimated Delivery:</strong> ${estimatedDelivery}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:15px;color:#475569;">📧 <strong>Tracking Info:</strong> We'll email you as soon as your order ships</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:15px;color:#475569;">🛡️ <strong>Returns:</strong> 30-day hassle-free returns, no questions asked</td>
                </tr>
              </table>

              <a href="${data.trackingUrl || '#'}" style="display:inline-block;background-color:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;">Track Your Order</a>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:24px 0 0;">Questions about your order? Reply to this email or visit our <a href="${data.supportUrl || '#'}" style="color:#4f46e5;">Support Center</a>.</p>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:20px 0 0;">Thanks for shopping with DropAI!<br><strong style="color:#4f46e5;">The DropAI Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding:24px 30px;text-align:center;background-color:#f8fafc;">
              <p style="font-size:13px;color:#94a3b8;margin:0 0 8px;">© 2026 DropAI. AI-Powered Dropshipping Store.</p>
              <p style="font-size:13px;color:#94a3b8;margin:0;">
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Privacy Policy</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  // ─── 3. Shipping Notification ──────────────────────────────────────────
  private static shippingNotificationEmail(data: Record<string, any>): string {
    const { customerName = 'there', orderNumber = 'ORD-001', trackingNumber = 'TRACK-001', carrier = 'Standard Shipping', estimatedDays = '5-10 business days' } = data
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#3b82f6);padding:32px 30px;text-align:center;">
              <p style="font-size:48px;margin:0 0 8px;">📦</p>
              <h1 style="color:#ffffff;font-size:24px;margin:0 0 4px;">Your Package is On Its Way!</h1>
              <p style="color:#93c5fd;font-size:15px;margin:0;">Order ${orderNumber} — shipped via ${carrier}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">Hey ${customerName},</p>
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 24px;">Great news — your order has been shipped and is on its way to you! Here's everything you need to track it:</p>

              <!-- Tracking Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:12px;padding:24px;margin:0 0 24px;">
                <tr>
                  <td align="center">
                    <p style="font-size:13px;color:#1e40af;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600;">Tracking Number</p>
                    <p style="font-size:28px;font-weight:bold;color:#1e3a8a;margin:0 0 16px;letter-spacing:2px;font-family:monospace;">${trackingNumber}</p>
                    <a href="${data.trackingUrl || '#'}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:8px;font-size:16px;font-weight:600;">Track Package →</a>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">🚚 <strong>Carrier:</strong> ${carrier}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">📅 <strong>Estimated Delivery:</strong> ${estimatedDays}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">📍 <strong>Delivery updates:</strong> We'll notify you at every milestone</td>
                </tr>
              </table>

              <!-- Next Purchase Incentive -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;padding:20px;margin:0 0 20px;">
                <tr>
                  <td style="text-align:center;">
                    <p style="font-size:15px;color:#1e293b;margin:0 0 12px;">🎁 <strong>Love your purchase?</strong> Share your review and get <strong>15% off</strong> your next order!</p>
                    <a href="${data.reviewUrl || '#'}" style="display:inline-block;background-color:#ffffff;color:#4f46e5;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;border:2px solid #4f46e5;">Write a Review</a>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0;">Track your package anytime and enjoy your new gear!<br><strong style="color:#4f46e5;">The DropAI Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding:24px 30px;text-align:center;background-color:#f8fafc;">
              <p style="font-size:13px;color:#94a3b8;margin:0 0 8px;">© 2026 DropAI. AI-Powered Dropshipping Store.</p>
              <p style="font-size:13px;color:#94a3b8;margin:0;">
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Privacy Policy</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  // ─── 4. Abandoned Cart Recovery ────────────────────────────────────────
  private static abandonedCartEmail(data: Record<string, any>): string {
    const { customerName = 'there', items = [], total = 0, discountCode = 'SAVE15' } = data
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#dc2626,#f97316);padding:32px 30px;text-align:center;">
              <p style="font-size:48px;margin:0 0 8px;">🛒</p>
              <h1 style="color:#ffffff;font-size:24px;margin:0 0 4px;">You Left Something Behind!</h1>
              <p style="color:#fecaca;font-size:15px;margin:0;">Your cart is still warm — and we saved it just for you</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">Hey ${customerName},</p>
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 8px;">We noticed you were checking out some items but didn't complete your order. No worries — we've saved your cart so you can pick up right where you left off.</p>

              <!-- Cart Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;padding:20px;margin:20px 0;">
                <tr>
                  <td>
                    <h3 style="font-size:16px;color:#1e293b;margin:0 0 16px;">Your Saved Cart 🛍️</h3>
                    ${items.length > 0 ? items.map((item: any, i: number) => `
                    <table width="100%" cellpadding="0" cellspacing="0" style="${i < items.length - 1 ? 'border-bottom:1px solid #e2e8f0;' : ''}padding:${i > 0 ? '12px 0 0' : '0 0 12px'};">
                      <tr>
                        <td style="font-size:14px;color:#475569;">${item.name || 'Product'} × ${item.quantity || 1}</td>
                        <td align="right" style="font-size:14px;color:#1e293b;font-weight:600;">$${(item.price || 0).toFixed(2)}</td>
                      </tr>
                    </table>
                    `).join('') : '<p style="font-size:14px;color:#94a3b8;">Items you selected</p>'}
                    <table width="100%" cellpadding="0" cellspacing="0" style="padding-top:12px;border-top:2px solid #e2e8f0;margin-top:12px;">
                      <tr>
                        <td style="font-size:16px;color:#1e293b;font-weight:700;">Cart Total</td>
                        <td align="right" style="font-size:16px;color:#1e293b;font-weight:700;">$${(total || 0).toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Discount Urgency -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fef2f2,#fee2e2);border:2px dashed #ef4444;border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;">
                <tr>
                  <td>
                    <p style="font-size:14px;color:#991b1b;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;font-weight:600;">⏰ Limited Time Offer</p>
                    <p style="font-size:14px;color:#7f1d1d;margin:0 0 4px;">Come back and complete your order within <strong>24 hours</strong></p>
                    <p style="font-size:32px;font-weight:bold;color:#991b1b;margin:12px 0;letter-spacing:3px;">${discountCode}</p>
                    <p style="font-size:15px;color:#7f1d1d;margin:0 0 16px;">Use this code at checkout for <strong>15% OFF</strong> + Free Shipping</p>
                    <a href="${data.cartUrl || '#'}" style="display:inline-block;background-color:#dc2626;color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:8px;font-size:16px;font-weight:600;">Complete My Order →</a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px;color:#64748b;line-height:1.6;text-align:center;">⚠️ Your cart expires in 48 hours. Items may sell out — don't miss out!</p>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:24px 0 0;">Questions? We're here to help — just reply to this email.</p>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:20px 0 0;">See you soon,<br><strong style="color:#4f46e5;">The DropAI Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding:24px 30px;text-align:center;background-color:#f8fafc;">
              <p style="font-size:13px;color:#94a3b8;margin:0 0 8px;">© 2026 DropAI. AI-Powered Dropshipping Store.</p>
              <p style="font-size:13px;color:#94a3b8;margin:0;">
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  // ─── 5. Supplier Outreach ─────────────────────────────────────────────
  private static supplierOutreachEmail(data: Record<string, any>): string {
    const { supplierName = 'Supplier', companyName = 'DropAI', productsCount = 30, monthlyOrders = 200 } = data
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e293b,#334155);padding:32px 30px;text-align:center;">
              <p style="font-size:48px;margin:0 0 8px;">🤝</p>
              <h1 style="color:#ffffff;font-size:24px;margin:0 0 4px;">Partnership Opportunity</h1>
              <p style="color:#94a3b8;font-size:15px;margin:0;">${companyName} × ${supplierName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">Hello ${supplierName} Team,</p>
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;">I'm reaching out on behalf of <strong style="color:#4f46e5;">${companyName}</strong>, an AI-powered dropshipping platform that's growing rapidly. We currently list ${productsCount}+ products across Tech Accessories, Health & Wellness, and Home Goods, and we're fulfilling an average of <strong>${monthlyOrders} orders per month</strong> through our existing supplier network.</p>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 10px;"><strong>Here's what we're looking for in a supplier partner:</strong></p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">✓ Reliable inventory with <strong>consistently in-stock products</strong></td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">✓ Fast processing and shipping (7-14 day delivery target)</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">✓ Competitive wholesale pricing for sustainable margins</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">✓ Automated order fulfillment via API or dashboard</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">✓ Quality products with <strong>low return rates</strong> (our target: < 5%)</td>
                </tr>
              </table>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 20px;"><strong>What we offer in return:</strong></p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">📈 <strong>Consistent volume</strong> — growing order count with dedicated marketing spend</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">📊 <strong>Data-driven insights</strong> — we share performance data to optimize winning products</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">🤖 <strong>AI-optimized listings</strong> — professional product pages that drive conversions</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:15px;color:#475569;">💰 <strong>Reliable payments</strong> — on-time settlement, no payment disputes</td>
                </tr>
              </table>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 24px;">We'd love to explore a partnership. Could we schedule a 15-minute call this week to discuss your product catalog and fulfillment capabilities?</p>

              <a href="${data.calendlyUrl || '#'}" style="display:inline-block;background-color:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;">Schedule a Call →</a>

              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:24px 0 0;">Looking forward to hearing from you,</p>
              <p style="font-size:16px;color:#1e293b;line-height:1.6;margin:8px 0 0;"><strong style="color:#4f46e5;">The ${companyName} Team</strong><br>
              <span style="font-size:14px;color:#64748b;">${data.email || 'partnerships@dropai.store'}</span></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding:24px 30px;text-align:center;background-color:#f8fafc;">
              <p style="font-size:13px;color:#94a3b8;margin:0 0 8px;">© 2026 DropAI. AI-Powered Dropshipping Store.</p>
              <p style="font-size:13px;color:#94a3b8;margin:0;">
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a> ·
                <a href="#" style="color:#4f46e5;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  // ─── Fallback ────────────────────────────────────────────────────────
  private static fallbackEmail(/* data: Record<string, any> */): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;">
          <tr>
            <td style="padding:40px;text-align:center;">
              <h1 style="color:#1e293b;font-size:24px;">DropAI</h1>
              <p style="color:#64748b;font-size:16px;">Thanks for being part of the DropAI community!</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }
}