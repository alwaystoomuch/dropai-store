#!/bin/bash
# DropAI Database Seed Script
# Seeds the Turso database with:
# - 5 suppliers
# - 30 products (10 tech, 10 health, 10 home goods)
# - 342 orders
# - Analytics data (30 days)
# - Email campaigns
# - AI conversations

TEAM_DB="team-db"
SUCCESS=0
FAIL=0

run_sql() {
  local sql="$1"
  local desc="$2"
  if output=$($TEAM_DB "$sql" 2>&1); then
    echo "  ✅ $desc"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "  ❌ $desc: $output"
    FAIL=$((FAIL + 1))
  fi
}

echo "======================================"
echo "  DropAI Database Seed"
echo "======================================"
echo ""

# ============================================
# 1. SUPPLIERS (5)
# ============================================
echo "[1/6] Seeding Suppliers..."

run_sql "INSERT OR IGNORE INTO suppliers (id, name, rating, shipping_speed_min_days, shipping_speed_max_days, is_active, created_at) VALUES ('sup-001', 'AliExpress', 4.2, 10, 25, 1, '2025-01-01 00:00:00')" "AliExpress"
run_sql "INSERT OR IGNORE INTO suppliers (id, name, rating, shipping_speed_min_days, shipping_speed_max_days, is_active, created_at) VALUES ('sup-002', 'CJDropshipping', 4.5, 7, 18, 1, '2025-01-01 00:00:00')" "CJDropshipping"
run_sql "INSERT OR IGNORE INTO suppliers (id, name, rating, shipping_speed_min_days, shipping_speed_max_days, is_active, created_at) VALUES ('sup-003', 'Spocket', 4.7, 5, 14, 1, '2025-01-01 00:00:00')" "Spocket"
run_sql "INSERT OR IGNORE INTO suppliers (id, name, rating, shipping_speed_min_days, shipping_speed_max_days, is_active, created_at) VALUES ('sup-004', 'Zendrop', 4.3, 8, 20, 1, '2025-01-01 00:00:00')" "Zendrop"
run_sql "INSERT OR IGNORE INTO suppliers (id, name, rating, shipping_speed_min_days, shipping_speed_max_days, is_active, created_at) VALUES ('sup-005', 'Printful', 4.6, 4, 10, 1, '2025-01-01 00:00:00')" "Printful"

# ============================================
# 2. PRODUCTS (30 - 10 Tech, 10 Health, 10 Home)
# ============================================
echo ""
echo "[2/6] Seeding Products..."

# --- Tech Accessories (10) ---
run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-001', 'Bluetooth 5.3 Wireless Earbuds', 'Tech Accessories', 'AliExpress', 8.50, 29.99, 21.49, 'in_stock', 'Premium wireless earbuds with noise cancellation, 30hr battery life, and IPX5 water resistance. Compatible with all Bluetooth devices.', '2025-01-15 00:00:00')" "Bluetooth Earbuds"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-002', 'Fast Wireless Charging Pad 15W', 'Tech Accessories', 'Spocket', 6.20, 19.99, 13.79, 'in_stock', 'Slim Qi-compatible fast charging pad with LED indicator. Works with iPhone, Samsung, AirPods. 15W max output.', '2025-01-16 00:00:00')" "Wireless Charging Pad"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-003', 'USB-C Hub 7-in-1 Multiport Adapter', 'Tech Accessories', 'CJDropshipping', 10.80, 34.99, 24.19, 'in_stock', '7-in-1 USB-C hub with HDMI 4K, USB 3.0, SD/TF card reader, and PD 100W charging. Aluminum alloy body.', '2025-01-17 00:00:00')" "USB-C Hub"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-004', 'Phone Grip Stand - Magnetic Ring Holder', 'Tech Accessories', 'AliExpress', 1.80, 9.99, 8.19, 'in_stock', 'Strong magnetic phone ring holder and stand. 360° rotation, secure grip, fits all phones with included metal plate.', '2025-01-18 00:00:00')" "Phone Grip Stand"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-005', 'Ergonomic Vertical Mouse', 'Tech Accessories', 'Zendrop', 7.50, 24.99, 17.49, 'low_stock', 'Vertical ergonomic mouse with 6 buttons, adjustable DPI (800-2400), USB wired. Reduces wrist strain.', '2025-01-19 00:00:00')" "Vertical Mouse"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-006', 'Laptop Stand - Adjustable Aluminum', 'Tech Accessories', 'CJDropshipping', 14.30, 39.99, 25.69, 'in_stock', 'Adjustable aluminum laptop stand with ventilated design. Fits 10-17 inch laptops. Ergonomic typing angle.', '2025-01-20 00:00:00')" "Laptop Stand"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-007', 'Portable Bluetooth Speaker', 'Tech Accessories', 'Spocket', 11.00, 32.99, 21.99, 'in_stock', 'Waterproof Bluetooth 5.0 speaker with 360° surround sound. 20hr playtime. Built-in microphone.', '2025-01-21 00:00:00')" "Bluetooth Speaker"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-008', 'Cable Organizer Travel Case', 'Tech Accessories', 'AliExpress', 3.40, 14.99, 11.59, 'in_stock', 'Compact EVA travel case for cables, chargers, and tech accessories. Multiple compartments, water-resistant.', '2025-01-22 00:00:00')" "Cable Organizer"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-009', 'Screen Cleaning Kit - Phone & Laptop', 'Tech Accessories', 'Printful', 2.10, 9.99, 7.89, 'in_stock', 'Complete screen cleaning kit with microfiber cloth, spray bottle, and 12 wet wipes. Safe for all screens.', '2025-01-23 00:00:00')" "Screen Cleaning Kit"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-010', 'Smart LED Desk Lamp', 'Tech Accessories', 'Zendrop', 16.00, 44.99, 28.99, 'out_of_stock', 'Touch-controlled LED desk lamp with 5 color modes, 7 brightness levels, USB charging port. Memory function.', '2025-01-24 00:00:00')" "LED Desk Lamp"

# --- Health & Wellness (10) ---
run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-011', 'Acupressure Mat for Back Pain Relief', 'Health & Wellness', 'AliExpress', 9.00, 27.99, 18.99, 'in_stock', 'Acupressure mat with 6210 stimulation points. Relieves back pain, muscle tension, and improves sleep.', '2025-01-25 00:00:00')" "Acupressure Mat"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-012', 'Essential Oil Diffuser 300ml', 'Health & Wellness', 'Spocket', 7.80, 22.99, 15.19, 'in_stock', 'Ultrasonic aromatherapy diffuser with 7 LED colors, auto shut-off, and whisper-quiet operation. 300ml tank.', '2025-01-26 00:00:00')" "Oil Diffuser"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-013', 'Posture Corrector Brace', 'Health & Wellness', 'CJDropshipping', 5.50, 18.99, 13.49, 'in_stock', 'Adjustable posture corrector for men and women. Breathable neoprene material. Helps with back alignment.', '2025-01-27 00:00:00')" "Posture Corrector"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-014', 'Gua Sha Scraping Massage Tool Set', 'Health & Wellness', 'AliExpress', 3.20, 12.99, 9.79, 'in_stock', 'Natural jade gua sha set with massage roller. Relieves muscle tension, improves circulation. Includes carrying case.', '2025-01-28 00:00:00')" "Gua Sha Tool"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-015', 'Resistance Bands Set - 5 Levels', 'Health & Wellness', 'Zendrop', 6.00, 19.99, 13.99, 'low_stock', 'Set of 5 resistance bands with different tension levels. Includes door anchor, handles, and ankle straps.', '2025-01-29 00:00:00')" "Resistance Bands"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-016', 'Digital Kitchen Food Scale', 'Health & Wellness', 'Spocket', 4.80, 15.99, 11.19, 'in_stock', 'Precision digital food scale with 0.1g accuracy. Measures up to 5kg. Nutrition calculator function.', '2025-01-30 00:00:00')" "Food Scale"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-017', 'Sleep Mask with Bluetooth Headphones', 'Health & Wellness', 'CJDropshipping', 7.20, 24.99, 17.79, 'in_stock', 'Ultra-soft sleep mask with built-in Bluetooth headphones. Thin speakers, breathable fabric, machine washable.', '2025-01-31 00:00:00')" "Sleep Mask Headphones"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-018', 'Foam Roller - Muscle Recovery', 'Health & Wellness', 'AliExpress', 8.00, 21.99, 13.99, 'in_stock', 'High-density foam roller for muscle recovery and myofascial release. 33cm length, suitable for all exercises.', '2025-02-01 00:00:00')" "Foam Roller"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-019', 'Insulated Water Bottle 750ml', 'Health & Wellness', 'Printful', 5.60, 18.99, 13.39, 'in_stock', 'Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold 24hr or hot 12hr. BPA-free.', '2025-02-02 00:00:00')" "Water Bottle"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-020', 'Hand Massager with Heat', 'Health & Wellness', 'Zendrop', 15.00, 39.99, 24.99, 'out_of_stock', 'Electric hand massager with compression, heat, and air pressure therapy. Relieves arthritis and fatigue.', '2025-02-03 00:00:00')" "Hand Massager"

# --- Home Goods (10) ---
run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-021', 'LED Strip Lights 5M Smart RGB', 'Home Goods', 'AliExpress', 5.00, 16.99, 11.99, 'in_stock', '5M RGB LED strip lights with remote control. 16 color options, 4 dynamic modes. Music sync function.', '2025-02-04 00:00:00')" "LED Strip Lights"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-022', 'Scented Soy Candle Set - 3 Pack', 'Home Goods', 'Spocket', 6.50, 19.99, 13.49, 'in_stock', 'Hand-poured soy wax candle set in 3 scents: vanilla, lavender, eucalyptus. 40hr burn time each.', '2025-02-05 00:00:00')" "Candle Set"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-023', 'Collapsible Storage Bins 6-Pack', 'Home Goods', 'CJDropshipping', 11.00, 29.99, 18.99, 'in_stock', 'Collapsible fabric storage bins, 6-pack. 30L each. Foldable when not in use. Reinforced handles.', '2025-02-06 00:00:00')" "Storage Bins"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-024', 'Microfiber Cleaning Cloth - 12 Pack', 'Home Goods', 'AliExpress', 3.00, 9.99, 6.99, 'in_stock', 'Premium microfiber cleaning cloths, 12-pack. Lint-free, streak-free. Machine washable up to 300 washes.', '2025-02-07 00:00:00')" "Cleaning Cloth Pack"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-025', 'Magnetic Knife Strip - 40cm', 'Home Goods', 'Zendrop', 8.50, 24.99, 16.49, 'in_stock', 'Powerful stainless steel magnetic knife strip. Holds up to 6 knives. Self-adhesive mounting. 40cm length.', '2025-02-08 00:00:00')" "Knife Strip"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-026', 'Shoe Rack - 2-Tier Entryway Organizer', 'Home Goods', 'Spocket', 12.00, 34.99, 22.99, 'low_stock', '2-tier bamboo shoe rack. Holds 6-8 pairs. Compact design fits narrow entryways. Easy assembly.', '2025-02-09 00:00:00')" "Shoe Rack"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-027', 'Reusable Silicone Food Lids - 6 Pack', 'Home Goods', 'CJDropshipping', 3.80, 11.99, 8.19, 'in_stock', 'BPA-free silicone stretch lids. Fit bowls, cans, containers of all sizes. Microwave and dishwasher safe.', '2025-02-10 00:00:00')" "Food Lids"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-028', 'Wall Mounted Bottle Opener', 'Home Goods', 'AliExpress', 2.40, 9.99, 7.59, 'in_stock', 'Rustic cast iron wall-mounted bottle opener with magnetic cap catcher. Includes mounting screws.', '2025-02-11 00:00:00')" "Bottle Opener"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-029', 'Plant Pot Set - 4 Ceramic Pots', 'Home Goods', 'Printful', 10.00, 27.99, 17.99, 'in_stock', 'Set of 4 matte ceramic plant pots with drainage holes. Sizes: 3, 4, 5, 6 inches. Minimalist design.', '2025-02-12 00:00:00')" "Plant Pot Set"

run_sql "INSERT OR IGNORE INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description, created_at) VALUES ('prod-030', 'Over-the-Door Organizer 24-Pocket', 'Home Goods', 'Zendrop', 7.00, 19.99, 12.99, 'in_stock', '24-pocket over-the-door organizer for shoes, accessories, or cleaning supplies. Heavy-duty fabric.', '2025-02-13 00:00:00')" "Door Organizer"

echo ""
echo "✅ Products seeded: 30"

# ============================================
# 3. ORDERS (342)
# ============================================
echo ""
echo "[3/6] Seeding Orders (342)..."
echo "  (This may take a moment - inserting in batches)"

# Clean previous orders
run_sql "DELETE FROM orders" "Cleared existing orders"

# Generate 342 orders across the past 60 days
ORDER_COUNT=0
PRODUCT_IDS=("prod-001" "prod-002" "prod-003" "prod-004" "prod-005" "prod-006" "prod-007" "prod-008" "prod-009" "prod-010" "prod-011" "prod-012" "prod-013" "prod-014" "prod-015" "prod-016" "prod-017" "prod-018" "prod-019" "prod-020" "prod-021" "prod-022" "prod-023" "prod-024" "prod-025" "prod-026" "prod-027" "prod-028" "prod-029" "prod-030")

CUSTOMER_NAMES=("Alice Johnson" "Bob Smith" "Charlie Brown" "Diana Prince" "Eve Wilson" "Frank Miller" "Grace Lee" "Henry Davis" "Ivy Chen" "Jack Robinson" "Karen White" "Leo Martinez" "Mia Anderson" "Noah Taylor" "Olivia Thomas" "Peter Jackson" "Quinn Harris" "Rachel Clark" "Sam Lewis" "Tina Walker" "Uma Patel" "Victor Young" "Wendy King" "Xander Wright" "Yara Lopez" "Zack Hill" "Amanda Scott" "Brian Green" "Catherine Adams" "David Baker")

CUSTOMER_EMAILS=("alice@email.com" "bob@email.com" "charlie@email.com" "diana@email.com" "eve@email.com" "frank@email.com" "grace@email.com" "henry@email.com" "ivy@email.com" "jack@email.com" "karen@email.com" "leo@email.com" "mia@email.com" "noah@email.com" "olivia@email.com" "peter@email.com" "quinn@email.com" "rachel@email.com" "sam@email.com" "tina@email.com" "uma@email.com" "victor@email.com" "wendy@email.com" "xander@email.com" "yara@email.com" "zack@email.com" "amanda@email.com" "brian@email.com" "catherine@email.com" "david@email.com")

STATUSES=("pending" "confirmed" "shipped" "delivered" "returned" "cancelled")

# Get product prices for realistic amounts
declare -A SELLING_PRICES
SELLING_PRICES=(
  ["prod-001"]=29.99 ["prod-002"]=19.99 ["prod-003"]=34.99 ["prod-004"]=9.99 ["prod-005"]=24.99
  ["prod-006"]=39.99 ["prod-007"]=32.99 ["prod-008"]=14.99 ["prod-009"]=9.99 ["prod-010"]=44.99
  ["prod-011"]=27.99 ["prod-012"]=22.99 ["prod-013"]=18.99 ["prod-014"]=12.99 ["prod-015"]=19.99
  ["prod-016"]=15.99 ["prod-017"]=24.99 ["prod-018"]=21.99 ["prod-019"]=18.99 ["prod-020"]=39.99
  ["prod-021"]=16.99 ["prod-022"]=19.99 ["prod-023"]=29.99 ["prod-024"]=9.99 ["prod-025"]=24.99
  ["prod-026"]=34.99 ["prod-027"]=11.99 ["prod-028"]=9.99 ["prod-029"]=27.99 ["prod-030"]=19.99
)

# Batch file approach - write SQL to temp file and execute in batches
BATCH_FILE="/tmp/seed_orders_batch.sql"
BATCH_SIZE=20
BATCH_NUM=0
ORDER_NUM=0

# We'll insert orders directly with team-db in batches of ~15-20 at a time
# Use INSERT INTO ... VALUES (...), (...), ... for efficiency

echo "  Generating 342 orders..."

# Generate all order data in batches
BATCH_VALUES=""
BATCH_COUNT=0
ORDER_NUM=0

get_tracking() {
  local num=$1
  echo "TRK$(printf '%08d' $num)"
}

for ORDER_NUM in $(seq 1 342); do
  # Deterministic pseudo-random based on order number
  PI=$((ORDER_NUM * 7 + 13))
  PROD_INDEX=$((PI % 30))
  CUST_INDEX=$((PI % 30))
  STATUS_INDEX=$((PI % 6))
  
  PROD_ID="${PRODUCT_IDS[$PROD_INDEX]}"
  CUST_NAME="${CUSTOMER_NAMES[$CUST_INDEX]}"
  CUST_EMAIL="${CUSTOMER_EMAILS[$CUST_INDEX]}"
  STATUS="${STATUSES[$STATUS_INDEX]}"
  PRICE="${SELLING_PRICES[$PROD_ID]}"
  QTY=$(( (PI % 3) + 1 ))
  AMOUNT=$(echo "$PRICE * $QTY" | bc | awk '{printf "%.2f", $0}')
  
  # Date: spread across last 60 days (more recent orders have more weight)
  DAY_OFFSET=$(( (342 - ORDER_NUM) * 60 / 342 ))
  HOUR=$((ORDER_NUM % 24))
  MIN=$((ORDER_NUM % 60))
  SEC=$((ORDER_NUM % 60))
  
  # Format date as YYYY-MM-DD HH:MM:SS - use a fixed base date and subtract days
  # Base date: 2025-04-13 (today approximately)
  # We'll just use datetime('now', '-X days') in SQL
  
  TRACKING=""
  if [ "$STATUS" = "shipped" ] || [ "$STATUS" = "delivered" ]; then
    TRACKING="TRK$(printf '%08d' $ORDER_NUM)"
  fi
  
  ORDER_ID=$(printf "ord-%04d" $ORDER_NUM)
  
  # Add to batch
  if [ "$BATCH_COUNT" -gt 0 ]; then
    BATCH_VALUES="$BATCH_VALUES,"
  fi
  BATCH_VALUES="$BATCH_VALUES('$ORDER_ID', '$PROD_ID', '$(echo "$CUST_NAME" | sed "s/'/''/g")', '$(echo "$CUST_EMAIL" | sed "s/'/''/g")', '$STATUS', $AMOUNT, $QTY, $( [ -z "$TRACKING" ] && echo "NULL" || echo "'$TRACKING'" ), datetime('now', '-$DAY_OFFSET days', '+$HOUR hours', '+$MIN minutes', '+$SEC seconds'), datetime('now', '-$DAY_OFFSET days', '+$HOUR hours', '+$MIN minutes', '+$SEC seconds'))"
  
  BATCH_COUNT=$((BATCH_COUNT + 1))
  
  # Execute batch when it reaches BATCH_SIZE or is the last order
  if [ "$BATCH_COUNT" -ge "$BATCH_SIZE" ] || [ "$ORDER_NUM" -eq 342 ]; then
    SQL="INSERT INTO orders (id, product_id, customer_name, customer_email, status, amount, quantity, tracking_number, created_at, updated_at) VALUES $BATCH_VALUES"
    run_sql "$SQL" "Orders batch $((ORDER_NUM / BATCH_SIZE + 1)) (orders $((ORDER_NUM - BATCH_COUNT + 1))-$ORDER_NUM)"
    BATCH_VALUES=""
    BATCH_COUNT=0
  fi
done

echo ""
echo "✅ Orders seeded: 342"

# ============================================
# 4. ANALYTICS (30 days of metrics)
# ============================================
echo ""
echo "[4/6] Seeding Analytics..."

# Clear existing analytics
run_sql "DELETE FROM analytics" "Cleared existing analytics"

# Generate 30 days of analytics data
METRIC_TYPES=("revenue" "visitors" "conversion_rate" "avg_order_value" "return_rate")
DAILY_REVENUE_BASE=(850 920 780 1100 950 870 1300 1150 890 940 1020 880 760 1350 1200 980 1050 1120 790 1420 1280 960 1080 870 1150 1320 910 1250 1180 1450)
DAILY_VISITORS_BASE=(320 340 290 410 360 310 480 420 330 350 380 310 280 500 440 360 390 400 300 520 470 350 400 320 420 490 340 460 430 530)

for DAY in $(seq 0 29); do
  YEAR=2025
  MONTH=04
  DAY_OF_MONTH=$(( (13 - 30 + DAY) % 30 + 1 ))
  if [ "$DAY_OF_MONTH" -le 0 ]; then
    DAY_OF_MONTH=$((DAY_OF_MONTH + 30))
  fi
  # Simpler: just use a fixed date format with day number
  DATE_STR="2025-04-$(printf '%02d' $(( DAY + 1 )))"
  # But we need to stay realistic - let me recalculate
  # 30 days back from ~April 13, 2025
  # Day 0 = March 14, Day 29 = April 12
  MONTH_NUM=3
  DAY_NUM=$((14 + DAY))
  if [ "$DAY_NUM" -gt 31 ]; then
    MONTH_NUM=4
    DAY_NUM=$((DAY_NUM - 31))
  fi
  DATE_STR="2025-$(printf '%02d' $MONTH_NUM)-$(printf '%02d' $DAY_NUM)"
  
  REV=${DAILY_REVENUE_BASE[$DAY]}
  VIS=${DAILY_VISITORS_BASE[$DAY]}
  CONV=$(echo "scale=2; 2.1 + ($DAY * 0.03)" | bc)  # 2.1% to ~3.0%
  AOV=$(echo "scale=2; 34.50 + ($DAY * 0.15)" | bc)  # $34.50 to ~$39.00
  RET=$(echo "scale=2; 4.5 - ($DAY * 0.05)" | bc)    # 4.5% down to ~3.0%
  if [ "$(echo "$RET < 2.0" | bc)" -eq 1 ]; then RET="2.0"; fi
  
  run_sql "INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-rev-$DAY', 'revenue', $REV, '$DATE_STR', 'sales')" "Revenue Day $((DAY+1))"
  run_sql "INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-vis-$DAY', 'visitors', $VIS, '$DATE_STR', 'traffic')" "Visitors Day $((DAY+1))"
  run_sql "INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-conv-$DAY', 'conversion_rate', $CONV, '$DATE_STR', 'sales')" "Conv Rate Day $((DAY+1))"
  run_sql "INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-aov-$DAY', 'avg_order_value', $AOV, '$DATE_STR', 'sales')" "AOV Day $((DAY+1))"
  run_sql "INSERT INTO analytics (id, metric_name, metric_value, date, category) VALUES ('analytics-ret-$DAY', 'return_rate', $RET, '$DATE_STR', 'operations')" "Return Rate Day $((DAY+1))"
done

echo ""
echo "✅ Analytics seeded: 150 data points (30 days x 5 metrics)"

# ============================================
# 5. EMAIL CAMPAIGNS
# ============================================
echo ""
echo "[5/6] Seeding Email Campaigns..."

# Clear existing
run_sql "DELETE FROM email_campaigns" "Cleared existing email campaigns"

run_sql "INSERT INTO email_campaigns (id, campaign_type, subject, body_html, sent_at, recipient_count, open_rate, created_at) VALUES ('email-001', 'welcome', 'Welcome to DropAI – Your Smart Store Awaits!', '<h1>Welcome to DropAI!</h1><p>Thank you for signing up. Your AI-powered dropshipping journey starts now.</p>', '2025-03-01 09:00:00', 128, 42.5, '2025-03-01 09:00:00')" "Welcome Email"

run_sql "INSERT INTO email_campaigns (id, campaign_type, subject, body_html, sent_at, recipient_count, open_rate, created_at) VALUES ('email-002', 'order_confirmation', 'Order Confirmed! Here''s What Happens Next', '<h1>Order Confirmed</h1><p>Your order #{{order_id}} has been received and is being processed.</p>', '2025-03-02 10:30:00', 342, 68.2, '2025-03-02 10:30:00')" "Order Confirmation"

run_sql "INSERT INTO email_campaigns (id, campaign_type, subject, body_html, sent_at, recipient_count, open_rate, created_at) VALUES ('email-003', 'shipping_notification', 'Your Package Is On Its Way!', '<h1>Shipped!</h1><p>Your order #{{order_id}} has shipped. Track it here: {{tracking_url}}.</p>', '2025-03-03 14:00:00', 256, 71.8, '2025-03-03 14:00:00')" "Shipping Notification"

run_sql "INSERT INTO email_campaigns (id, campaign_type, subject, body_html, sent_at, recipient_count, open_rate, created_at) VALUES ('email-004', 'abandoned_cart', 'You Left Something Behind — 10% Off to Complete Your Order', '<h1>Don''t Miss Out!</h1><p>Your cart is waiting. Use code <strong>DROP10</strong> for 10% off.</p>', '2025-03-04 18:00:00', 89, 31.4, '2025-03-04 18:00:00')" "Abandoned Cart"

run_sql "INSERT INTO email_campaigns (id, campaign_type, subject, body_html, sent_at, recipient_count, open_rate, created_at) VALUES ('email-005', 'supplier_outreach', 'New Partnership Opportunity with DropAI', '<h1>Let''s Partner Up</h1><p>DropAI is looking for reliable suppliers for our growing catalog.</p>', '2025-03-05 08:00:00', 15, 46.7, '2025-03-05 08:00:00')" "Supplier Outreach"

echo ""
echo "✅ Email campaigns seeded: 5"

# ============================================
# 6. AI CONVERSATIONS
# ============================================
echo ""
echo "[6/6] Seeding AI Conversations..."

run_sql "DELETE FROM ai_conversations" "Cleared existing AI conversations"

run_sql "INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('ai-msg-001', 'session-1', 'user', 'What products are trending right now?', '2025-04-10 10:00:00')" "AI conversation 1"
run_sql "INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('ai-msg-002', 'session-1', 'assistant', 'Based on current market data, wireless earbuds, posture correctors, and LED strip lights are trending. Bluetooth 5.3 earbuds have seen a 40% increase in demand this quarter.', '2025-04-10 10:00:05')" "AI conversation 2"
run_sql "INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('ai-msg-003', 'session-1', 'user', 'What should I price the earbuds at?', '2025-04-10 10:01:00')" "AI conversation 3"
run_sql "INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('ai-msg-004', 'session-1', 'assistant', 'For Bluetooth 5.3 earbuds with noise cancellation, the sweet spot is $24.99-$34.99. Your cost is $8.50, giving you a 71-77% margin at that range. Competitors average $29.99.', '2025-04-10 10:01:05')" "AI conversation 4"
run_sql "INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('ai-msg-005', 'session-2', 'user', 'How is my store performing this month?', '2025-04-11 14:00:00')" "AI conversation 5"
run_sql "INSERT INTO ai_conversations (id, session_id, role, message, created_at) VALUES ('ai-msg-006', 'session-2', 'assistant', 'Your store revenue is up 12% this week compared to last week. The average order value has increased to $36.80. Your top performing category is Tech Accessories, accounting for 45% of all sales.', '2025-04-11 14:00:05')" "AI conversation 6"

echo ""
echo "✅ AI Conversations seeded: 6"

# ============================================
# SUMMARY
# ============================================
echo ""
echo "======================================"
echo "  Seed Complete!"
echo "======================================"
echo "  Successful: $SUCCESS"
echo "  Failed: $FAIL"
echo ""
echo "  Tables populated:"
echo "    - suppliers: 5"
echo "    - products: 30"
echo "    - orders: 342"
echo "    - analytics: 150 data points"
echo "    - email_campaigns: 5"
echo "    - ai_conversations: 6"
echo ""