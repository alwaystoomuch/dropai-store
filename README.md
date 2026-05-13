# DropAI — AI-Powered Dropshipping Store

> Sell products online without ever touching inventory. AI finds winning products, writes ad copy, recovers lost sales, and manages your entire store on autopilot.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Turso-003B57?style=flat-square&logo=sqlite)](https://turso.tech/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Business Model](#-business-model)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Sections](#-sections)
  - [Dashboard](#1-dashboard)
  - [Products](#2-products)
  - [Orders](#3-orders)
  - [Suppliers](#4-suppliers)
  - [AI Assistant](#5-ai-assistant)
  - [Analytics](#6-analytics)
  - [Email System](#7-email-system)
- [API Routes](#-api-routes)
- [Services](#-services)
- [Database Schema](#-database-schema)
- [Seeding Data](#-seeding-data)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [Deployment](#-deployment)

---

## 🚀 Overview

DropAI is a full-stack Next.js application that serves as an AI-powered dropshipping store management platform. The store buys nothing upfront — when a customer orders, the supplier ships directly to them. The store owner pockets the margin between the supplier price and the selling price.

**Core Purpose:** Make dropshipping smarter, faster, and more profitable by putting AI at the center of every decision — from finding winning products to writing ad copy to recovering lost sales automatically.

**Built for:** Entrepreneurs who want to build a real online business with low startup costs, no warehouse, no staff, and no inventory risk — using AI to do the heavy lifting.

---

## 💰 Business Model

DropAI makes money by:
- **Selling products at a markup** — each product has a cost price (from suppliers) and a selling price (to customers)
- **Letting suppliers handle fulfillment** — no storage, no shipping, no returns processing
- **Using AI to optimize** — better products, better copy, better conversions, better margins

Typical margins range from **55% to 80%** per product, with an average of **~65%**.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16.2](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Database** | [SQLite](https://www.sqlite.org/) via [Turso](https://turso.tech/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Utilities** | [clsx](https://github.com/lukeed/clsx) |
| **ORM/DB** | Custom `team-db` CLI wrapper |
| **Deployment** | Vercel (recommended) |

---

## 📁 Project Structure

```
dropai/
├── app/                          # Next.js App Router pages & API
│   ├── layout.tsx                # Root layout with sidebar
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles & animations
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard with stats & charts
│   ├── products/
│   │   └── page.tsx              # Product catalog (30 products)
│   ├── orders/
│   │   └── page.tsx              # Order tracking & management
│   ├── suppliers/
│   │   └── page.tsx              # Supplier profiles
│   ├── ai-assistant/
│   │   └── page.tsx              # AI chat interface
│   ├── analytics/
│   │   └── page.tsx              # Analytics & metrics
│   ├── emails/
│   │   └── page.tsx              # Email campaign management
│   └── api/
│       ├── dashboard/route.ts    # Dashboard stats API
│       ├── products/route.ts     # Products CRUD API
│       ├── orders/route.ts       # Orders CRUD API
│       ├── suppliers/route.ts    # Suppliers API
│       ├── analytics/route.ts    # Analytics data API
│       ├── email-campaigns/route.ts # Email campaigns API
│       └── ai/
│           ├── description/route.ts  # AI description generator
│           ├── ad-copy/route.ts      # AI ad copy generator
│           └── conversations/route.ts # AI chat history
├── components/                   # Reusable UI components
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── Header.tsx                # Page header with search
│   ├── StatsCard.tsx             # Metric display card
│   ├── DataTable.tsx             # Generic data table
│   └── DashboardLayout.tsx       # Layout wrapper
├── lib/                          # Core library code
│   ├── db.ts                     # Database query functions
│   └── constants.ts              # App constants & config
├── services/                     # Business logic services
│   ├── AIService.ts              # AI mock service
│   └── EmailService.ts           # Email HTML templates
├── types/                        # TypeScript type definitions
│   └── index.ts
├── scripts/                      # Database scripts
│   ├── seed.sh                   # Bash seed script
│   ├── seed.ts                   # TypeScript seed script
│   └── product-data.ts           # 30 product data entries
├── public/                       # Static assets
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.17+ (recommended: 20.x or later)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/dropai/dropai-store.git
cd dropai-store
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

No changes are required for local development — the app works with mock data and defaults.

### 4. Seed the Database (Optional, Recommended)

Populate the database with realistic demo data:

```bash
# Using the shell script (easier):
bash scripts/seed.sh

# Or using Node.js:
npx tsx scripts/seed.ts
```

This seeds:
- **5 suppliers** — AliExpress, CJDropshipping, Spocket, Zendrop, Printful
- **30 products** — 10 Tech Accessories, 10 Health & Wellness, 10 Home Goods
- **342 orders** — spread across 60 days with realistic status distribution
- **150 analytics data points** — 30 days × 5 metrics
- **5 email campaigns** — one of each type
- **6 AI conversation messages** — across 2 sessions

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Sections

### 1. Dashboard

The command center. Shows at-a-glance metrics:

- **Total Revenue** — with weekly change indicator
- **Total Orders** — volume tracking
- **Active Products** — current catalog size
- **Avg Order Value** — with trend direction
- **Revenue Overview Chart** — 6-month area chart (revenue & orders)
- **Recent Orders** — live feed of latest 5 orders with status badges
- **AI Assistant Quick Ask** — inline chat input with smart suggestions

*Route: `/dashboard`*  
*API: `GET /api/dashboard`*

### 2. Products

Full catalog management with 30 active products across three categories:

| Category | Count | Examples |
|----------|-------|---------|
| **Tech Accessories** | 10 | Wireless earbuds, charging pads, USB-C hubs, laptop stands |
| **Health & Wellness** | 10 | Acupressure mats, oil diffusers, posture correctors, resistance bands |
| **Home Goods** | 10 | LED strip lights, candles, storage bins, plant pots |

Each product shows:
- **Cost Price** — what the supplier charges
- **Selling Price** — what the customer pays
- **Profit** — margin per unit
- **Supplier** — which fulfillment partner
- **Stock Status** — in stock, low stock, or out of stock

*Route: `/products`*  
*API: `GET /api/products`*

### 3. Orders

Real-time order tracking from payment to delivery. Every order goes through these statuses:

```
Pending → Confirmed → Shipped → Delivered
                      ↘ Returned
Pending → Cancelled
```

Includes a status filter dropdown for easy sorting. AI insights can identify return patterns.

*Route: `/orders`*  
*API: `GET /api/orders`*

### 4. Suppliers

Connected to 5 fulfillment partners:

| Supplier | Rating | Shipping Speed | Best For |
|----------|--------|---------------|----------|
| **AliExpress** | ⭐ 4.2 | 10-25 days | Largest selection, competitive prices |
| **CJDropshipping** | ⭐ 4.5 | 7-18 days | Dedicated dropshipping, fast processing |
| **Spocket** | ⭐ 4.7 | 5-14 days | US/EU premium suppliers, fastest shipping |
| **Zendrop** | ⭐ 4.3 | 8-20 days | Branding options, user-friendly |
| **Printful** | ⭐ 4.6 | 4-10 days | Print-on-demand, highest quality |

*Route: `/suppliers`*  
*API: `GET /api/suppliers`*

### 5. AI Assistant

The brain of the operation — a built-in advisor accessible from anywhere in the app.

**Capabilities:**
- 🔍 **Finding winning products** — trending niches, market analysis, and product research
- ✍️ **Writing copy** — product descriptions that convert and ad scripts that sell
- 📊 **Analyzing performance** — store analytics, insights, and growth recommendations
- 💡 **Strategy advice** — niche selection, pricing, marketing channels, and more

The assistant uses a mock AI service in development (returns realistic, pre-written responses). In production, it connects to OpenAI/Anthropic APIs.

*Route: `/ai-assistant`*  
*APIs: `POST /api/ai/description`, `POST /api/ai/ad-copy`, `GET /api/ai/conversations`*

### 6. Analytics

Shows the numbers that actually matter:

- **Conversion Rate** — currently 3.2% (industry avg: 1-2%)
- **Average Order Value** — $72.66
- **Return Rate** — 2.1% (well below industry average)
- **Total Visitors** — 12,847
- **Top Traffic Channel** — Instagram
- **Daily Revenue** — $812.40
- **Revenue Trend** — 30-day chart
- **Traffic Sources** — channel breakdown
- **Top Products** — by revenue, units sold, conversion, and ROI

*Route: `/analytics`*  
*API: `GET /api/analytics`*

### 7. Email System

Five automated campaigns that run without any manual intervention:

| # | Campaign Type | Subject Line | Trigger |
|---|--------------|--------------|---------|
| 1 | **Welcome** | Welcome to DropAI — Your Smart Shopping Journey Starts Here | Account creation / first purchase |
| 2 | **Order Confirmation** | ✅ Order Confirmed! Here's What Happens Next | After purchase completed |
| 3 | **Shipping Notification** | 📦 Your Package Has Shipped! Track It Here | Supplier provides tracking number |
| 4 | **Abandoned Cart** | 🛒 Your Cart Is Waiting — Don't Miss Out | 1hr and 24hr after cart abandonment |
| 5 | **Supplier Outreach** | Partnership Opportunity: DropAI | Onboarding new fulfillment partners |

Each campaign has a professionally designed HTML template with gradients, responsive layout, and clear CTAs.

*Route: `/emails`*  
*API: `GET /api/email-campaigns`*

---

## 🌐 API Routes

All API routes are available at `/api/*` and return JSON responses.

### GET Endpoints

| Route | Description | Returns |
|-------|-------------|---------|
| `/api/dashboard` | Dashboard stats | `{ totalRevenue, totalOrders, totalProducts, avgOrderValue }` |
| `/api/products` | All products | `Product[]` |
| `/api/orders` | All orders | `Order[]` |
| `/api/suppliers` | All suppliers | `Supplier[]` |
| `/api/analytics` | Analytics data | `AnalyticsMetric[]` |
| `/api/email-campaigns` | Email campaigns | `EmailCampaign[]` |
| `/api/ai/conversations` | AI chat history | `AIConversation[]` |

### POST Endpoints

| Route | Request Body | Description |
|-------|-------------|-------------|
| `/api/ai/description` | `{ productName, category?, features?, targetAudience?, tone? }` | Generate AI product description |
| `/api/ai/ad-copy` | `{ productName, category?, targetAudience?, platform?, goal?, productDescription? }` | Generate AI ad copy |

### Response Format

All endpoints return JSON. Successful responses:

```json
// GET /api/products
[
  {
    "id": "prod-001",
    "name": "Bluetooth 5.3 Wireless Earbuds",
    "category": "Tech Accessories",
    "supplier": "AliExpress",
    "cost_price": 8.50,
    "selling_price": 29.99,
    "profit": 21.49,
    "stock_status": "in_stock",
    "description": "...",
    "created_at": "2025-01-15 00:00:00"
  }
]

// POST /api/ai/description
{
  "prompt": "...",
  "result": {
    "name": "Product Name — Premium Quality...",
    "shortDescription": "...",
    "hook": "...",
    "benefits": ["...", "..."],
    "description": "Full description...",
    "seoKeywords": ["...", "..."],
    "callToAction": "..."
  },
  "model": "dropai-copywriter-v1"
}
```

Error responses:

```json
{
  "error": "Product name is required"
}
```

---

## 🧩 Services

### AIService (`services/AIService.ts`)

Handles all AI-powered features with mock responses for development:

- `generateProductDescription()` — creates SEO-optimized product copy
- `generateAdCopy()` — writes platform-specific ad variations
- `analyzeAnalytics()` — provides actionable insights from metrics
- `suggestProducts()` — recommends trending products by niche
- `chatResponse()` — general Q&A for the AI assistant

In production, replace the `mockCompletion` switch with calls to OpenAI/Anthropic APIs.

### EmailService (`services/EmailService.ts`)

Generates professional HTML email templates for 5 campaign types:

- `welcomeEmail()` — on-boarding with discount code
- `orderConfirmationEmail()` — order summary with tracking link
- `shippingNotificationEmail()` — tracking info with review incentive
- `abandonedCartEmail()` — urgency-driven recovery with 15% discount
- `supplierOutreachEmail()` — professional B2B partnership pitch

All templates feature:
- Responsive design (mobile-friendly)
- Gradient headers
- Inline CSS for email client compatibility
- Clear call-to-action buttons
- Personalized placeholders

---

## 🗄 Database Schema

The app uses a SQLite database synced via Turso. Six tables:

### `suppliers`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Supplier ID (e.g., `sup-001`) |
| `name` | TEXT | Supplier name |
| `logo_url` | TEXT (nullable) | Supplier logo |
| `rating` | REAL | Rating out of 5 |
| `shipping_speed_min_days` | INTEGER | Minimum shipping days |
| `shipping_speed_max_days` | INTEGER | Maximum shipping days |
| `is_active` | INTEGER | Active flag (0 or 1) |
| `created_at` | TEXT | ISO timestamp |

### `products`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Product ID (e.g., `prod-001`) |
| `name` | TEXT | Product name |
| `category` | TEXT | Category (Tech Accessories, Health & Wellness, Home Goods) |
| `supplier` | TEXT | Associated supplier name |
| `cost_price` | REAL | Supplier cost |
| `selling_price` | REAL | Customer price |
| `profit` | REAL | Profit margin |
| `stock_status` | TEXT | `in_stock`, `low_stock`, or `out_of_stock` |
| `description` | TEXT (nullable) | Product description |
| `created_at` | TEXT | ISO timestamp |

### `orders`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Order ID (e.g., `ord-0001`) |
| `product_id` | TEXT | FK to products |
| `customer_name` | TEXT | Customer name |
| `customer_email` | TEXT | Customer email |
| `status` | TEXT | `pending`, `confirmed`, `shipped`, `delivered`, `returned`, `cancelled` |
| `amount` | REAL | Order total |
| `quantity` | INTEGER | Units ordered |
| `tracking_number` | TEXT (nullable) | Shipping tracking number |
| `created_at` | TEXT | ISO timestamp |
| `updated_at` | TEXT | ISO timestamp |

### `analytics`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Metric ID |
| `metric_name` | TEXT | `revenue`, `visitors`, `conversion_rate`, `avg_order_value`, `return_rate` |
| `metric_value` | REAL | Numeric value |
| `date` | TEXT | Date (YYYY-MM-DD) |
| `category` | TEXT | `sales`, `traffic`, `operations` |
| `created_at` | TEXT | ISO timestamp |

### `email_campaigns`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Campaign ID |
| `campaign_type` | TEXT | `welcome`, `order_confirmation`, `shipping_notification`, `abandoned_cart`, `supplier_outreach` |
| `subject` | TEXT | Email subject line |
| `body_html` | TEXT (nullable) | HTML email body |
| `sent_at` | TEXT (nullable) | When sent |
| `recipient_count` | INTEGER | Number of recipients |
| `open_rate` | REAL | Open rate percentage |
| `created_at` | TEXT | ISO timestamp |

### `ai_conversations`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Message ID |
| `session_id` | TEXT | Conversation session ID |
| `role` | TEXT | `user` or `assistant` |
| `message` | TEXT | Message content |
| `created_at` | TEXT | ISO timestamp |

---

## 🌱 Seeding Data

Two seed scripts are available for populating the database with demo data:

### Shell Script (`scripts/seed.sh`)

```bash
bash scripts/seed.sh
```

A self-contained bash script that inserts all data directly via the `team-db` CLI. Orders are inserted in batches of 20 for efficiency.

### TypeScript Script (`scripts/seed.ts`)

```bash
npx tsx scripts/seed.ts
```

A more maintainable Node.js version with cleaner data definitions. Supports the same data sets with deterministic pseudo-random order generation.

Both scripts:
1. Clear existing data
2. Insert 5 suppliers
3. Insert 30 products with realistic names, prices, and descriptions
4. Generate 342 orders across 60 days with realistic status distribution
5. Create 150 analytics data points (30 days × 5 metrics)
6. Insert 5 email campaign records
7. Add 6 AI conversation messages across 2 sessions

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Public app URL |
| `NEXT_PUBLIC_APP_NAME` | No | `DropAI` | Public app name |
| `OPENAI_API_KEY` | No | — | For production AI features |
| `ANTHROPIC_API_KEY` | No | — | Alternative AI provider |
| `SMTP_HOST` | No | — | Email SMTP server |
| `SMTP_PORT` | No | `587` | SMTP port |
| `SMTP_USER` | No | — | SMTP username |
| `SMTP_PASS` | No | — | SMTP password |
| `EMAIL_FROM` | No | `noreply@dropai.store` | Sender email address |

---

## 📄 License

MIT

---

## 🤝 Support

- Open an issue on [GitHub](https://github.com/dropai/dropai-store/issues)
- Email: support@dropai.store

---

<p align="center">Built with ❤️ by the DropAI Team</p>