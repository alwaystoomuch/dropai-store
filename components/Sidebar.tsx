'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Truck,
  Bot, BarChart3, Mail, Droplets,
} from 'lucide-react'
import { NAV_ITEMS, APP_NAME } from '@/lib/constants'
import clsx from 'clsx'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white flex flex-col z-50">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">{APP_NAME}</h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">AI-Powered Dropshipping</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          Main Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
              )}
            >
              <span className={clsx(
                'transition-colors duration-200',
                isActive ? 'text-indigo-400' : 'text-slate-500'
              )}>
                {iconMap[item.icon]}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-5 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            O
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">Store Owner</p>
            <p className="text-xs text-slate-500 truncate">owner@dropai.io</p>
          </div>
        </div>
        <div className="mt-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Plan</span>
            <span className="text-emerald-400 font-medium">Pro</span>
          </div>
        </div>
      </div>
    </aside>
  )
}