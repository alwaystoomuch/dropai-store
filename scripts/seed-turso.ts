// Run this script to seed your Turso database with products
// Usage: npx tsx scripts/seed-turso.ts

import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  console.error('❌ Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN')
  process.exit(1)
}

const db = createClient({ url, authToken })

const products = [
  { name: 'Bluetooth 5.3 Wireless Earbuds', category: 'Tech Accessories', supplier: 'Spocket', cost: 8.50, price: 29.99, desc: 'Premium wireless earbuds with noise cancellation, 30hr battery life, and IPX5 waterproof rating.' },
  { name: '10000mAh Portable Charger', category: 'Tech Accessories', supplier: 'CJDropshipping', cost: 7.00, price: 24.99, desc: 'Ultra-compact power bank with fast charging, dual USB ports, and LED battery indicator.' },
  { name: 'Adjustable Phone Stand', category: 'Tech Accessories', supplier: 'Spocket', cost: 3.00, price: 12.99, desc: 'Ergonomic aluminum phone stand with adjustable angle, compatible with all phones and tablets.' },
  { name: 'LED Desk Lamp', category: 'Tech Accessories', supplier: 'AliExpress', cost: 12.00, price: 39.99, desc: 'Modern LED desk lamp with touch control, 5 brightness levels, and USB charging port.' },
  { name: 'Smart Water Bottle', category: 'Health & Wellness', supplier: 'Zendrop', cost: 8.00, price: 29.99, desc: 'Temperature-displaying smart bottle with time reminder, BPA-free, holds 500ml.' },
  { name: 'Resistance Bands Set', category: 'Health & Wellness', supplier: 'CJDropshipping', cost: 5.00, price: 19.99, desc: 'Set of 5 resistance bands with different strengths, includes door anchor and carry bag.' },
  { name: 'Extra Thick Yoga Mat', category: 'Health & Wellness', supplier: 'Spocket', cost: 10.00, price: 34.99, desc: '6mm thick non-slip yoga mat with alignment lines, eco-friendly TPE material.' },
  { name: 'Essential Oil Diffuser', category: 'Health & Wellness', supplier: 'AliExpress', cost: 6.50, price: 24.99, desc: 'Ultrasonic aromatherapy diffuser with 7-color LED, auto shut-off, covers 300sq ft.' },
  { name: 'Bamboo Cutting Board Set', category: 'Home Goods', supplier: 'Zendrop', cost: 9.00, price: 29.99, desc: 'Organic bamboo cutting board set with juice groove, includes 3 sizes for all prep needs.' },
  { name: 'RFID Blocking Wallet', category: 'Tech Accessories', supplier: 'Printful', cost: 4.50, price: 19.99, desc: 'Slim minimalist wallet with RFID blocking, holds up to 8 cards, genuine leather.' },
  { name: 'UV Phone Sanitizer', category: 'Tech Accessories', supplier: 'CJDropshipping', cost: 13.00, price: 39.99, desc: 'UV-C sterilizer that kills 99.9% of germs on your phone in 5 minutes.' },
  { name: 'Aromatherapy Shower Steamers', category: 'Health & Wellness', supplier: 'Spocket', cost: 3.50, price: 14.99, desc: 'Set of 6 essential oil shower steamers for a spa-like experience at home.' },
  { name: 'Kitchen Organizer Drawer Inserts', category: 'Home Goods', supplier: 'Zendrop', cost: 7.00, price: 22.99, desc: 'Adjustable bamboo drawer organizer with 8 compartments for utensils and gadgets.' },
  { name: 'Magnetic Phone Car Mount', category: 'Tech Accessories', supplier: 'AliExpress', cost: 3.50, price: 14.99, desc: 'Strong magnetic car mount with 360° rotation, one-hand operation, universal fit.' },
  { name: 'Memory Foam Travel Neck Pillow', category: 'Health & Wellness', supplier: 'CJDropshipping', cost: 7.50, price: 27.99, desc: 'Premium memory foam neck pillow with washable cover and compression travel bag.' },
  { name: 'LED Strip Lights 10ft', category: 'Home Goods', supplier: 'AliExpress', cost: 5.00, price: 18.99, desc: 'RGB LED strip lights with remote control, music sync, and adhesive backing.' },
  { name: 'Scented Soy Candle Set', category: 'Home Goods', supplier: 'Zendrop', cost: 6.00, price: 21.99, desc: 'Hand-poured soy wax candles set of 3, natural fragrances, 40hr burn time each.' },
  { name: 'Laptop Stand Adjustable', category: 'Tech Accessories', supplier: 'Spocket', cost: 11.00, price: 34.99, desc: 'Ergonomic aluminum laptop stand with ventilation, fits 10-17 inch laptops.' },
  { name: 'Posture Corrector Brace', category: 'Health & Wellness', supplier: 'AliExpress', cost: 5.00, price: 19.99, desc: 'Adjustable posture corrector for back support, comfortable and invisible under clothes.' },
  { name: 'Collapsible Storage Bins', category: 'Home Goods', supplier: 'CJDropshipping', cost: 8.00, price: 25.99, desc: 'Set of 6 collapsible fabric storage bins with handles and labels, fits any shelf.' },
  { name: 'Wireless Charging Pad', category: 'Tech Accessories', supplier: 'Spocket', cost: 5.50, price: 19.99, desc: 'Fast wireless charger compatible with all Qi devices, slim design with LED indicator.' },
  { name: 'Acupressure Mat Set', category: 'Health & Wellness', supplier: 'Zendrop', cost: 9.00, price: 32.99, desc: 'Acupressure mat with pillow for back pain relief, 6000+ acupressure points.' },
  { name: 'Silicone Baking Mats Set', category: 'Home Goods', supplier: 'Printful', cost: 4.00, price: 15.99, desc: 'Non-stick silicone baking mats set of 2, reusable, fits standard half-sheet pans.' },
  { name: 'USB-C Hub Multiport', category: 'Tech Accessories', supplier: 'CJDropshipping', cost: 10.00, price: 32.99, desc: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery.' },
  { name: 'Gym Water Bottle Shaker', category: 'Health & Wellness', supplier: 'Spocket', cost: 4.00, price: 15.99, desc: 'BPA-free sports shaker bottle with mixing ball, leak-proof lid, 700ml capacity.' },
  { name: 'Underbed Storage Containers', category: 'Home Goods', supplier: 'AliExpress', cost: 11.00, price: 34.99, desc: 'Set of 2 underbed storage containers with wheels and lids, clear design, 50L each.' },
  { name: 'Mechanical Keyboard', category: 'Tech Accessories', supplier: 'Zendrop', cost: 15.00, price: 49.99, desc: 'RGB mechanical keyboard with blue switches, 87-key compact design, USB-C.' },
  { name: 'Foam Roller for Muscle Recovery', category: 'Health & Wellness', supplier: 'CJDropshipping', cost: 7.00, price: 24.99, desc: 'High-density foam roller for muscle recovery and deep tissue massage.' },
  { name: 'Airtight Food Storage Set', category: 'Home Goods', supplier: 'Spocket', cost: 9.00, price: 28.99, desc: 'BPA-free airtight food storage containers set of 10, stackable with date labels.' },
  { name: 'Car Phone Holder Vent Mount', category: 'Tech Accessories', supplier: 'AliExpress', cost: 2.50, price: 9.99, desc: 'Universal car vent mount with 360° rotation, one-click locking, fits all phones.' },
]

async function seed() {
  console.log('🌱 Seeding Turso database...\n')

  // Create tables if they don't exist
  await db.execute(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    supplier TEXT NOT NULL,
    cost_price REAL NOT NULL,
    selling_price REAL NOT NULL,
    profit REAL NOT NULL,
    stock_status TEXT DEFAULT 'in_stock',
    image_url TEXT,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`)

  // Clear existing products
  await db.execute('DELETE FROM products')

  // Insert all products
  for (const p of products) {
    const id = `prod-${String(products.indexOf(p) + 1).padStart(3, '0')}`
    const profit = p.price - p.cost
    await db.execute({
      sql: `INSERT INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'in_stock', ?)`,
      args: [id, p.name, p.category, p.supplier, p.cost, p.price, profit, p.desc],
    })
  }

  console.log(`✅ Seeded ${products.length} products!`)
  console.log('\n📊 Summary:')
  console.log(`   Tech Accessories: ${products.filter(p => p.category === 'Tech Accessories').length}`)
  console.log(`   Health & Wellness: ${products.filter(p => p.category === 'Health & Wellness').length}`)
  console.log(`   Home Goods: ${products.filter(p => p.category === 'Home Goods').length}`)
  console.log(`\n💰 Price range: $${Math.min(...products.map(p => p.price))} - $${Math.max(...products.map(p => p.price))}`)
  console.log(`💰 Margins: ${Math.round(Math.min(...products.map(p => (p.price - p.cost) / p.price * 100)))}% - ${Math.round(Math.max(...products.map(p => (p.price - p.cost) / p.price * 100)))}%`)
}

seed().catch(console.error)