import Link from 'next/link'
import { ShoppingCart, Droplets, Star } from 'lucide-react'

const products = [
  { id: 'prod-001', name: 'Wireless Bluetooth Earbuds', price: 39.99, category: 'Tech', rating: 4.8, sales: 342, emoji: '🎧', badge: 'Best Seller' },
  { id: 'prod-002', name: 'Portable Phone Charger 10000mAh', price: 29.99, category: 'Tech', rating: 4.6, sales: 287, emoji: '🔋', badge: 'Hot' },
  { id: 'prod-003', name: 'Adjustable Phone Stand', price: 14.99, category: 'Tech', rating: 4.5, sales: 198, emoji: '📱', badge: null },
  { id: 'prod-004', name: 'LED Desk Lamp with Wireless Charger', price: 49.99, category: 'Tech', rating: 4.7, sales: 156, emoji: '💡', badge: null },
  { id: 'prod-005', name: 'Smart Water Bottle with Reminder', price: 34.99, category: 'Wellness', rating: 4.4, sales: 134, emoji: '💧', badge: null },
  { id: 'prod-006', name: 'Resistance Bands Set', price: 24.99, category: 'Wellness', rating: 4.9, sales: 212, emoji: '🏋️', badge: 'Top Rated' },
  { id: 'prod-007', name: 'Yoga Mat Extra Thick', price: 39.99, category: 'Wellness', rating: 4.7, sales: 178, emoji: '🧘', badge: null },
  { id: 'prod-008', name: 'Essential Oil Diffuser', price: 29.99, category: 'Wellness', rating: 4.5, sales: 145, emoji: '🌸', badge: null },
  { id: 'prod-009', name: 'Bamboo Cutting Board Set', price: 34.99, category: 'Home', rating: 4.6, sales: 89, emoji: '🪵', badge: null },
  { id: 'prod-010', name: 'Slim RFID Blocking Wallet', price: 22.99, category: 'Tech', rating: 4.3, sales: 167, emoji: '👛', badge: null },
]

export default function StorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-7 h-7 text-indigo-600" />
            <span className="text-xl font-bold text-slate-900">DropAI Store</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</Link>
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Products, Smart Prices</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">Curated tech, wellness, and home goods — shipped directly to your door.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-6xl relative">
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
              </div>
              <div className="p-4">
                <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{product.category}</span>
                <h3 className="text-sm font-semibold text-slate-900 mt-2">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-slate-500">{product.rating} ({product.sales} sold)</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-slate-900">${product.price}</span>
                  <form action="/api/checkout" method="POST">
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="productName" value={product.name} />
                    <input type="hidden" name="price" value={product.price} />
                    <input type="hidden" name="quantity" value="1" />
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Buy Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 DropAI. Free shipping on all orders.
      </footer>
    </div>
  )
}