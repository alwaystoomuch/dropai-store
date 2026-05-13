'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Title */}
        <div className="animate-slide-up">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
          ) : (
            <p className="text-sm text-slate-500 mt-0.5">DropAI Dashboard</p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={clsx(
            'relative transition-all duration-200',
            searchFocused ? 'w-80' : 'w-64'
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-400">
              ⌘K
            </kbd>
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-lg hover:bg-slate-100 transition-colors group">
            <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
              O
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  )
}