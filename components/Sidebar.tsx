'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Truck,
  Bot, BarChart3, Mail, Droplets, Upload, Store, ChevronDown, LogOut,
} from 'lucide-react'
import { NAV_ITEMS, APP_NAME } from '@/lib/constants'
import clsx from 'clsx'
import { useState } from 'react'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Upload: <Upload className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
}

export default function Sidebar() {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Don't show sidebar on store pages
  if (pathname.startsWith('/store')) return null

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white flex flex-col z-50">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">{APP_NAME}</h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">AI-Powered Dropshipping</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Main Menu</p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              isActive ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
            )}>
              <span className={clsx('transition-colors duration-200', isActive ? 'text-indigo-400' : 'text-slate-500')}>{iconMap[item.icon]}</span>
              {item.label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
            </Link>
          )
        })}
        <p className="px-3 mt-6 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Store</p>
        <Link href="/store" className={clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          pathname === '/store' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
        )}>
          <span className="text-slate-500"><Store className="w-5 h-5" /></span>
          View Store
          {pathname === '/store' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
        </Link>
        <Link href="/store/cart" className={clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          pathname === '/store/cart' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
        )}>
          <span className="text-slate-500"><ShoppingCart className="w-5 h-5" /></span>
          Shopping Cart
          {pathname === '/store/cart' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
        </Link>

        <p className="px-3 mt-6 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Tools</p>
        <Link href="/dashboard/import" className={clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          pathname === '/dashboard/import' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
        )}>
          <span className="text-slate-500"><Upload className="w-5 h-5" /></span>
          Import Products
          {pathname === '/dashboard/import' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
        </Link>
      </nav>

      <div className="px-5 py-4 border-t border-slate-800 relative">
        <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-3 w-full hover:bg-slate-800/50 rounded-lg p-2 -mx-2 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            O
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-slate-200 truncate">Store Owner</p>
            <p className="text-xs text-slate-500 truncate">owner@dropai.io</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        {userMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
            <Link href="/store" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors hover:text-white">
              <Store className="w-4 h-4" />
              View Storefront
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors hover:text-white">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="border-t border-slate-700" />
            <button className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-700/50 transition-colors w-full text-left">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}