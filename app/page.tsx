import Link from 'next/link'
import { Droplets, TrendingUp, Package, Bot, BarChart3, Mail, ArrowRight, Star, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DropAI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-24 text-center relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-700/50 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" />
            <span className="text-indigo-300 text-sm">AI-Powered &middot; Zero Inventory &middot; Global Shipping</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
            Sell Products Online
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Without Touching Inventory
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            DropAI puts AI at the center of your dropshipping business &mdash; finding winning products,
            writing ad copy, recovering lost sales, and managing your entire store on autopilot.
          </p>
          <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl text-lg font-medium transition-all inline-flex items-center gap-2 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3.5 rounded-xl text-lg font-medium transition-all hover:-translate-y-0.5"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {[
            { value: '$24K+', label: 'Revenue Generated' },
            { value: '340+', label: 'Orders Processed' },
            { value: '30', label: 'Active Products' },
            { value: '5', label: 'Supplier Partners' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From product discovery to order fulfillment, DropAI handles the heavy lifting so you can focus on growing.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <TrendingUp className="w-8 h-8" />, title: 'Smart Dashboard', desc: 'Revenue, profit, orders, and visitor traffic &mdash; all at a glance with AI-powered insights and recommendations.' },
            { icon: <Package className="w-8 h-8" />, title: '30 Curated Products', desc: 'Tech accessories, health & wellness, and home goods with full margin visibility and real-time stock tracking.' },
            { icon: <Bot className="w-8 h-8" />, title: 'AI Assistant', desc: 'Find trending products, write compelling descriptions, create ad scripts, and get answers instantly.' },
            { icon: <BarChart3 className="w-8 h-8" />, title: 'Real Analytics', desc: 'Conversion rates, average order value, return rates &mdash; know what works and double down on it.' },
            { icon: <Mail className="w-8 h-8" />, title: 'Automated Emails', desc: 'Five automated campaigns: welcome, order confirmation, shipping, cart recovery, and supplier outreach.' },
            { icon: <TruckIcon className="w-8 h-8" />, title: '5 Top Suppliers', desc: 'AliExpress, CJDropshipping, Spocket, Zendrop, and Printful &mdash; flexible sourcing for every product.' },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why DropAI Section */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose DropAI?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Built for modern entrepreneurs who want to scale without the complexity.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Bot className="w-6 h-6" />, title: 'AI-First Approach', desc: 'Every feature is powered by AI &mdash; from product recommendations to ad copy generation. No manual guesswork.' },
            { icon: <Shield className="w-6 h-6" />, title: 'Zero Risk Inventory', desc: 'No upfront purchases, no warehouse, no staff. Suppliers ship directly to your customers.' },
            { icon: <Star className="w-6 h-6" />, title: 'Scalable by Design', desc: 'From one product to hundreds &mdash; the system scales without adding complexity or headcount.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-lg mx-auto">
            Join the AI-powered dropshipping revolution. No inventory, no hassle, just results.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Launch Your Store
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Droplets className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-semibold">DropAI</span>
        </div>
        <p className="text-slate-500 text-sm">&copy; 2026 DropAI. AI-Powered Dropshipping Store.</p>
      </footer>
    </div>
  )
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )
}