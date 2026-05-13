/**
 * DropAI Database Seed Script
 * Seeds the Turso database with realistic mock data via team-db CLI
 * 
 * Data sets:
 * - 5 suppliers
 * - 30 products (10 Tech Accessories, 10 Health & Wellness, 10 Home Goods)
 * - 342 orders with realistic status distribution
 * - 30 days of analytics (5 metrics x 30 days = 150 data points)
 * - 5 email campaigns
 * - 6 AI conversation messages
 */

import { execSync } from 'child_process';

const TEAM_DB = 'team-db';

function runSQL(sql: string): void {
  try {
    execSync(`${TEAM_DB} ${JSON.stringify(sql)}`, {
      encoding: 'utf-8',
      timeout: 15000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (err: any) {
    const stderr = err.stderr?.toString() || err.message || '';
    // Only log if it's not an "already exists" type error
    if (!stderr.includes('UNIQUE constraint')) {
      console.error(`  ⚠ SQL issue: ${stderr.substring(0, 200)}`);
    }
  }
}

function escape(str: string): string {
  return str.replace(/'/g, "''");
}

// =========================================================
// DATA DEFINITIONS
// =========================================================

const SUPPLIERS = [
  { id: 'sup-001', name: 'AliExpress', rating: 4.2, minDays: 10, maxDays: 25, logo: null },
  { id: 'sup-002', name: 'CJDropshipping', rating: 4.5, minDays: 7, maxDays: 18, logo: null },
  { id: 'sup-003', name: 'Spocket', rating: 4.7, minDays: 5, maxDays: 14, logo: null },
  { id: 'sup-004', name: 'Zendrop', rating: 4.3, minDays: 8, maxDays: 20, logo: null },
  { id: 'sup-005', name: 'Printful', rating: 4.6, minDays: 4, maxDays: 10, logo: null },
];

const PRODUCTS = [
  // Tech Accessories (10)
  { id: 'prod-001', name: 'Bluetooth 5.3 Wireless Earbuds', category: 'Tech Accessories', supplier: 'AliExpress', cost: 8.50, price: 29.99, stock: 'in_stock', desc: 'Premium wireless earbuds with noise cancellation, 30hr battery life, and IPX5 water resistance. Compatible with all Bluetooth devices.' },
  { id: 'prod-002', name: 'Fast Wireless Charging Pad 15W', category: 'Tech Accessories', supplier: 'Spocket', cost: 6.20, price: 19.99, stock: 'in_stock', desc: 'Slim Qi-compatible fast charging pad with LED indicator. Works with iPhone, Samsung, AirPods. 15W max output.' },
  { id: 'prod-003', name: 'USB-C Hub 7-in-1 Multiport Adapter', category: 'Tech Accessories', supplier: 'CJDropshipping', cost: 10.80, price: 34.99, stock: 'in_stock', desc: '7-in-1 USB-C hub with HDMI 4K, USB 3.0, SD/TF card reader, and PD 100W charging. Aluminum alloy body.' },
  { id: 'prod-004', name: 'Phone Grip Stand - Magnetic Ring Holder', category: 'Tech Accessories', supplier: 'AliExpress', cost: 1.80, price: 9.99, stock: 'in_stock', desc: 'Strong magnetic phone ring holder and stand. 360 rotation, secure grip, fits all phones with included metal plate.' },
  { id: 'prod-005', name: 'Ergonomic Vertical Mouse', category: 'Tech Accessories', supplier: 'Zendrop', cost: 7.50, price: 24.99, stock: 'low_stock', desc: 'Vertical ergonomic mouse with 6 buttons, adjustable DPI (800-2400). Reduces wrist strain during long work hours.' },
  { id: 'prod-006', name: 'Adjustable Aluminum Laptop Stand', category: 'Tech Accessories', supplier: 'CJDropshipping', cost: 14.30, price: 39.99, stock: 'in_stock', desc: 'Adjustable aluminum laptop stand with ventilated design. Fits 10-17 inch laptops. Ergonomic typing angle.' },
  { id: 'prod-007', name: 'Portable Bluetooth Speaker', category: 'Tech Accessories', supplier: 'Spocket', cost: 11.00, price: 32.99, stock: 'in_stock', desc: 'Waterproof Bluetooth 5.0 speaker with 360 surround sound. 20hr playtime. Built-in microphone for calls.' },
  { id: 'prod-008', name: 'Cable Organizer Travel Case', category: 'Tech Accessories', supplier: 'AliExpress', cost: 3.40, price: 14.99, stock: 'in_stock', desc: 'Compact EVA travel case for cables, chargers, and tech accessories. Multiple compartments, water-resistant shell.' },
  { id: 'prod-009', name: 'Screen Cleaning Kit - Phone & Laptop', category: 'Tech Accessories', supplier: 'Printful', cost: 2.10, price: 9.99, stock: 'in_stock', desc: 'Complete screen cleaning kit with microfiber cloth, spray bottle, and 12 wet wipes. Safe for all screens.' },
  { id: 'prod-010', name: 'Smart LED Desk Lamp', category: 'Tech Accessories', supplier: 'Zendrop', cost: 16.00, price: 44.99, stock: 'out_of_stock', desc: 'Touch-controlled LED desk lamp with 5 color modes, 7 brightness levels, USB charging port. Memory function.' },
  // Health & Wellness (10)
  { id: 'prod-011', name: 'Acupressure Mat for Back Pain Relief', category: 'Health & Wellness', supplier: 'AliExpress', cost: 9.00, price: 27.99, stock: 'in_stock', desc: 'Acupressure mat with 6210 stimulation points. Relieves back pain, muscle tension, and improves sleep quality.' },
  { id: 'prod-012', name: 'Essential Oil Diffuser 300ml', category: 'Health & Wellness', supplier: 'Spocket', cost: 7.80, price: 22.99, stock: 'in_stock', desc: 'Ultrasonic aromatherapy diffuser with 7 LED colors, auto shut-off, and whisper-quiet operation. 300ml tank.' },
  { id: 'prod-013', name: 'Posture Corrector Brace', category: 'Health & Wellness', supplier: 'CJDropshipping', cost: 5.50, price: 18.99, stock: 'in_stock', desc: 'Adjustable posture corrector for men and women. Breathable neoprene material. Helps with back alignment.' },
  { id: 'prod-014', name: 'Gua Sha Scraping Massage Tool Set', category: 'Health & Wellness', supplier: 'AliExpress', cost: 3.20, price: 12.99, stock: 'in_stock', desc: 'Natural jade gua sha set with massage roller. Relieves muscle tension, improves circulation. Includes carrying case.' },
  { id: 'prod-015', name: 'Resistance Bands Set - 5 Levels', category: 'Health & Wellness', supplier: 'Zendrop', cost: 6.00, price: 19.99, stock: 'low_stock', desc: 'Set of 5 resistance bands with different tension levels. Includes door anchor, handles, and ankle straps.' },
  { id: 'prod-016', name: 'Digital Kitchen Food Scale', category: 'Health & Wellness', supplier: 'Spocket', cost: 4.80, price: 15.99, stock: 'in_stock', desc: 'Precision digital food scale with 0.1g accuracy. Measures up to 5kg. Nutrition calculator function built-in.' },
  { id: 'prod-017', name: 'Sleep Mask with Bluetooth Headphones', category: 'Health & Wellness', supplier: 'CJDropshipping', cost: 7.20, price: 24.99, stock: 'in_stock', desc: 'Ultra-soft sleep mask with built-in Bluetooth headphones. Thin speakers, breathable fabric, machine washable.' },
  { id: 'prod-018', name: 'Foam Roller - Muscle Recovery', category: 'Health & Wellness', supplier: 'AliExpress', cost: 8.00, price: 21.99, stock: 'in_stock', desc: 'High-density foam roller for muscle recovery and myofascial release. 33cm length, suitable for all exercises.' },
  { id: 'prod-019', name: 'Insulated Water Bottle 750ml', category: 'Health & Wellness', supplier: 'Printful', cost: 5.60, price: 18.99, stock: 'in_stock', desc: 'Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold 24hr or hot 12hr. BPA-free.' },
  { id: 'prod-020', name: 'Hand Massager with Heat Therapy', category: 'Health & Wellness', supplier: 'Zendrop', cost: 15.00, price: 39.99, stock: 'out_of_stock', desc: 'Electric hand massager with compression, heat, and air pressure therapy. Relieves arthritis and fatigue.' },
  // Home Goods (10)
  { id: 'prod-021', name: 'LED Strip Lights 5M Smart RGB', category: 'Home Goods', supplier: 'AliExpress', cost: 5.00, price: 16.99, stock: 'in_stock', desc: '5M RGB LED strip lights with remote control. 16 color options, 4 dynamic modes. Music sync function.' },
  { id: 'prod-022', name: 'Scented Soy Candle Set - 3 Pack', category: 'Home Goods', supplier: 'Spocket', cost: 6.50, price: 19.99, stock: 'in_stock', desc: 'Hand-poured soy wax candle set in 3 scents: vanilla, lavender, eucalyptus. 40hr burn time each.' },
  { id: 'prod-023', name: 'Collapsible Storage Bins 6-Pack', category: 'Home Goods', supplier: 'CJDropshipping', cost: 11.00, price: 29.99, stock: 'in_stock', desc: 'Collapsible fabric storage bins, 6-pack. 30L each. Foldable when not in use. Reinforced handles.' },
  { id: 'prod-024', name: 'Microfiber Cleaning Cloth 12-Pack', category: 'Home Goods', supplier: 'AliExpress', cost: 3.00, price: 9.99, stock: 'in_stock', desc: 'Premium microfiber cleaning cloths, 12-pack. Lint-free, streak-free. Machine washable up to 300 washes.' },
  { id: 'prod-025', name: 'Magnetic Knife Strip 40cm', category: 'Home Goods', supplier: 'Zendrop', cost: 8.50, price: 24.99, stock: 'in_stock', desc: 'Powerful stainless steel magnetic knife strip. Holds up to 6 knives. Self-adhesive mounting. 40cm length.' },
  { id: 'prod-026', name: '2-Tier Entryway Shoe Rack', category: 'Home Goods', supplier: 'Spocket', cost: 12.00, price: 34.99, stock: 'low_stock', desc: '2-tier bamboo shoe rack. Holds 6-8 pairs. Compact design fits narrow entryways. Easy assembly.' },
  { id: 'prod-027', name: 'Reusable Silicone Food Lids 6-Pack', category: 'Home Goods', supplier: 'CJDropshipping', cost: 3.80, price: 11.99, stock: 'in_stock', desc: 'BPA-free silicone stretch lids. Fit bowls, cans, containers of all sizes. Microwave and dishwasher safe.' },
  { id: 'prod-028', name: 'Wall Mounted Bottle Opener', category: 'Home Goods', supplier: 'AliExpress', cost: 2.40, price: 9.99, stock: 'in_stock', desc: 'Rustic cast iron wall-mounted bottle opener with magnetic cap catcher. Includes mounting screws.' },
  { id: 'prod-029', name: 'Ceramic Plant Pot Set - 4 Pots', category: 'Home Goods', supplier: 'Printful', cost: 10.00, price: 27.99, stock: 'in_stock', desc: 'Set of 4 matte ceramic plant pots with drainage holes. Sizes: 3, 4, 5, 6 inches. Minimalist design.' },
  { id: 'prod-030', name: 'Over-the-Door 24-Pocket Organizer', category: 'Home Goods', supplier: 'Zendrop', cost: 7.00, price: 19.99, stock: 'in_stock', desc: '24-pocket over-the-door organizer for shoes, accessories, or cleaning supplies. Heavy-duty fabric.' },
];

const CUSTOMERS = [
  'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson',
  'Frank Miller', 'Grace Lee', 'Henry Davis', 'Ivy Chen', 'Jack Robinson',
  'Karen White', 'Leo Martinez', 'Mia Anderson', 'Noah Taylor', 'Olivia Thomas',
  'Peter Jackson', 'Quinn Harris', 'Rachel Clark', 'Sam Lewis', 'Tina Walker',
  'Uma Patel', 'Victor Young', 'Wendy King', 'Xander Wright', 'Yara Lopez',
  'Zack Hill', 'Amanda Scott', 'Brian Green', 'Catherine Adams', 'David Baker',
];

const CUSTOMER_EMAILS = [
  'alice.j@email.com', 'bob.smith@email.com', 'charlie.b@email.com', 'diana.p@email.com', 'eve.wilson@email.com',
  'frank.m@email.com', 'grace.lee@email.com', 'henry.d@email.com', 'ivy.chen@email.com', 'jack.r@email.com',
  'karen.w@email.com', 'leo.m@email.com', 'mia.a@email.com', 'noah.t@email.com', 'olivia.t@email.com',
  'peter.j@email.com', 'quinn.h@email.com', 'rachel.c@email.com', 'sam.lewis@email.com', 'tina.w@email.com',
  'uma.p@email.com', 'victor.y@email.com', 'wendy.k@email.com', 'xander.w@email.com', 'yara.l@email.com',
  'zack.h@email.com', 'amanda.s@email.com', 'brian.g@email.com', 'catherine.a@email.com', 'david.b@email.com',
];

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled'];

/** Deterministic pseudo-random number based on seed */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/** Format date as YYYY-MM-DD */
function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// =========================================================
// SEED FUNCTIONS
// =========================================================

function seedSuppliers(): void {
  console.log('\n[1/6] Seeding Suppliers...');
  for (const s of SUPPLIERS) {
    const sql = `INSERT OR IGNORE INTO suppliers (id, name, logo_url, rating, shipping_speed_min_days, shipping_speed_max_days, is_active, created_at) VALUES ('${s.id}', '${s.name}', ${s.logo ? `'${s.logo}'` : 'NULL'}, ${s.rating}, ${s.minDays}, ${s.maxDays}, 1, '2025-01-01 00:00:00')`;
    runSQL(sql);
    console.log(`  ✅ ${s.name}`);
  }
}

function seedProducts(): void {
  console.log('\n[2/6] Seeding Products...');
  const dateBase = new Date('2025-01-15');
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const date = new Date(dateBase);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().replace('T', ' ').substring(0, 19);
    const profit = +(p.price - p.cost).toFixed(2);
    const sql = `INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('${p.id}', '${escape(p.name)}', '${escape(p.category)}', '${escape(p.supplier)}', ${p.cost}, ${p.price}, ${profit}, '${p.stock}', '${escape(p.desc)}', '${dateStr}')`;
    runSQL(sql);
    console.log(`  ✅ [${i + 1}/30] ${p.name}`);
  }
}

function seedOrders(): void {
  console.log('\n[3/6] Seeding Orders (342)...');
  
  const priceMap = new Map<string, number>();
  for (const p of PRODUCTS) priceMap.set(p.id, p.price);

  const BATCH_SIZE = 20;
  let batch: string[] = [];
  let batchCount = 0;
  const totalBatches = Math.ceil(342 / BATCH_SIZE);

  for (let orderNum = 1; orderNum <= 342; orderNum++) {
    const seed = orderNum * 7 + 13;
    const r = seededRandom(seed);
    const r2 = seededRandom(seed + 1000);
    
    const prodIndex = Math.floor(r * 30);
    const custIndex = Math.floor(r2 * 30);
    const statusIndex = orderNum % 6;
    
    const prodId = PRODUCTS[prodIndex].id;
    const custName = CUSTOMERS[custIndex];
    const custEmail = CUSTOMER_EMAILS[custIndex];
    const status = STATUSES[statusIndex];
    const unitPrice = priceMap.get(prodId) || 19.99;
    const qty = (orderNum % 3) + 1;
    const amount = +(unitPrice * qty).toFixed(2);
    
    // Spread across last 60 days - newer orders more recent
    const daysAgo = Math.floor((342 - orderNum) * 60 / 342);
    const hours = orderNum % 24;
    const minutes = orderNum % 60;
    
    // Use SQLite datetime functions for date generation
    const tracking = (status === 'shipped' || status === 'delivered') 
      ? `TRK${String(orderNum).padStart(8, '0')}` 
      : null;
    
    const orderId = `ord-${String(orderNum).padStart(4, '0')}`;
    const trackStr = tracking ? `'${tracking}'` : 'NULL';
    
    batch.push(`('${orderId}', '${prodId}', '${escape(custName)}', '${custEmail}', '${status}', ${amount}, ${qty}, ${trackStr}, datetime('now', '-${daysAgo} days', '+${hours} hours', '+${minutes} minutes'), datetime('now', '-${daysAgo} days', '+${hours} hours', '+${minutes} minutes'))`);
    
    if (batch.length >= BATCH_SIZE || orderNum === 342) {
      batchCount++;
      const startOrder = (batchCount - 1) * BATCH_SIZE + 1;
      const endOrder = Math.min(orderNum, 342);
      const sql = `INSERT INTO orders (id, product_id, customer_name, customer_email, status, amount, quantity, tracking_number, created_at, updated_at) VALUES ${batch.join(', ')}`;
      runSQL(sql);
      console.log(`  ✅ Orders batch ${batchCount}/${totalBatches} (${startOrder}-${endOrder})`);
      batch = [];
    }
  }
}

function seedAnalytics(): void {
  console.log('\n[4/6] Seeding Analytics...');
  
  const dailyRevenue = [850, 920, 780, 1100, 950, 870, 1300, 1150, 890, 940, 1020, 880, 760, 1350, 1200, 980, 1050, 1120, 790, 1420, 1280, 960, 1080, 870, 1150, 1320, 910, 1250, 1180, 1450];
  const dailyVisitors = [320, 340, 290, 410, 360, 310, 480, 420, 330, 350, 380, 310, 280, 500, 440, 360, 390, 400, 300, 520, 470, 350, 400, 320, 420, 490, 340, 460, 430, 530];
  
  for (let day = 0; day < 30; day++) {
    // Date: March 14 to April 12, 2025
    const month = 3 + Math.floor((14 + day) / 31);
    const dom = month === 3 ? (14 + day) : (14 + day - 31);
    const dateStr = formatDate(2025, month, dom);
    
    const rev = dailyRevenue[day];
    const vis = dailyVisitors[day];
    const conv = +(2.1 + day * 0.03).toFixed(2);
    const aov = +(34.50 + day * 0.15).toFixed(2);
    const ret = Math.max(2.0, +(4.5 - day * 0.05).toFixed(2));
    
    runSQL(`INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-rev-${day}', 'revenue', ${rev}, '${dateStr}', 'sales')`);
    runSQL(`INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-vis-${day}', 'visitors', ${vis}, '${dateStr}', 'traffic')`);
    runSQL(`INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-conv-${day}', 'conversion_rate', ${conv}, '${dateStr}', 'sales')`);
    runSQL(`INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-aov-${day}', 'avg_order_value', ${aov}, '${dateStr}', 'sales')`);
    runSQL(`INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-ret-${day}', 'return_rate', ${ret}, '${dateStr}', 'operations')`);
  }
  console.log('  ✅ 150 analytics data points (30 days x 5 metrics)');
}

function seedEmailCampaigns(): void {
  console.log('\n[5/6] Seeding Email Campaigns...');
  
  const campaigns = [
    { id: 'email-001', type: 'welcome', subject: 'Welcome to DropAI \u2013 Your Smart Store Awaits!', body: '<h1>Welcome to DropAI!</h1><p>Thank you for signing up. Your AI-powered dropshipping journey starts now.</p><p>Browse trending products, track orders, and let our AI assistant help you grow.</p>', sentAt: '2025-03-01 09:00:00', recipients: 128, openRate: 42.5 },
    { id: 'email-002', type: 'order_confirmation', subject: 'Order Confirmed! Here\'s What Happens Next', body: '<h1>Order Confirmed</h1><p>Your order #{{order_id}} has been received and is being processed. We\'ll notify you when it ships.</p>', sentAt: '2025-03-02 10:30:00', recipients: 342, openRate: 68.2 },
    { id: 'email-003', type: 'shipping_notification', subject: 'Your Package Is On Its Way!', body: '<h1>Shipped!</h1><p>Your order #{{order_id}} has shipped. Track it here: {{tracking_url}}. Expected delivery in 5-14 days.</p>', sentAt: '2025-03-03 14:00:00', recipients: 256, openRate: 71.8 },
    { id: 'email-004', type: 'abandoned_cart', subject: 'You Left Something Behind \u2014 10% Off to Complete Your Order', body: '<h1>Don\'t Miss Out!</h1><p>Your cart is waiting. Use code <strong>DROP10</strong> for 10% off your order. Offer expires in 48 hours.</p>', sentAt: '2025-03-04 18:00:00', recipients: 89, openRate: 31.4 },
    { id: 'email-005', type: 'supplier_outreach', subject: 'New Partnership Opportunity with DropAI', body: '<h1>Let\'s Partner Up</h1><p>DropAI is looking for reliable suppliers for our growing catalog. We work with AliExpress, CJDropshipping, Spocket, Zendrop, and Printful.</p>', sentAt: '2025-03-05 08:00:00', recipients: 15, openRate: 46.7 },
  ];
  
  for (const c of campaigns) {
    const sql = `INSERT INTO email_campaigns (id, campaign_type, subject, body_html, sent_at, recipient_count, open_rate, created_at) VALUES ('${c.id}', '${c.type}', '${escape(c.subject)}', '${escape(c.body)}', '${c.sentAt}', ${c.recipients}, ${c.openRate}, '${c.sentAt}')`;
    runSQL(sql);
    console.log(`  ✅ ${c.type}`);
  }
}

function seedAIConversations(): void {
  console.log('\n[6/6] Seeding AI Conversations...');
  
  const messages = [
    { id: 'ai-msg-001', session: 'session-1', role: 'user', msg: 'What products are trending right now?', time: '2025-04-10 10:00:00' },
    { id: 'ai-msg-002', session: 'session-1', role: 'assistant', msg: 'Based on current market data, wireless earbuds, posture correctors, and LED strip lights are trending. Bluetooth 5.3 earbuds have seen a 40% increase in demand this quarter. Would you like me to suggest pricing strategies for any of these?', time: '2025-04-10 10:00:05' },
    { id: 'ai-msg-003', session: 'session-1', role: 'user', msg: 'What should I price the earbuds at?', time: '2025-04-10 10:01:00' },
    { id: 'ai-msg-004', session: 'session-1', role: 'assistant', msg: 'For Bluetooth 5.3 earbuds with noise cancellation, the sweet spot is $24.99-$34.99. Your cost is $8.50, giving you a 71-77% margin at that range. Competitors average $29.99. I recommend pricing at $29.99 to stay competitive while maximizing profit.', time: '2025-04-10 10:01:05' },
    { id: 'ai-msg-005', session: 'session-2', role: 'user', msg: 'How is my store performing this month?', time: '2025-04-11 14:00:00' },
    { id: 'ai-msg-006', session: 'session-2', role: 'assistant', msg: 'Your store revenue is up 12% this week compared to last week. The average order value has increased to $36.80. Your top performing category is Tech Accessories, accounting for 45% of all sales. Health & Wellness is your second best at 32%. I recommend adding more tech accessories to capitalize on this trend.', time: '2025-04-11 14:00:05' },
  ];
  
  for (const m of messages) {
    const sql = `INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('${m.id}', '${m.session}', '${m.role}', '${escape(m.msg)}', '${m.time}')`;
    runSQL(sql);
    console.log(`  ✅ ${m.id}`);
  }
}

// =========================================================
// MAIN
// =========================================================

console.log('======================================');
console.log('  DropAI Database Seed (Node.js)');
console.log('======================================');

console.time('Total seed time');

// Clear existing data
console.log('\nClearing existing data...');
runSQL('DELETE FROM orders');
runSQL('DELETE FROM analytics');
runSQL('DELETE FROM email_campaigns');
runSQL('DELETE FROM ai_conversations');
console.log('  ✅ Existing data cleared');

// Seed each section
seedSuppliers();
seedProducts();
seedOrders();
seedAnalytics();
seedEmailCampaigns();
seedAIConversations();

// Summary
console.log('\n======================================');
console.log('  Seed Complete!');
console.log('======================================');
console.timeEnd('Total seed time');

// Verify counts
console.log('\nVerification:');
for (const table of ['suppliers', 'products', 'orders', 'analytics', 'email_campaigns', 'ai_conversations']) {
  try {
    const out = execSync(`${TEAM_DB} "SELECT COUNT(*) as cnt FROM ${table}"`, { encoding: 'utf-8', timeout: 5000 });
    const data = JSON.parse(out.trim());
    console.log(`  - ${table}: ${data[0]?.cnt || 0}`);
  } catch { console.log(`  - ${table}: error reading count`); }
}