import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import clsx from 'clsx'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color?: string
  subtitle?: string
  prefix?: string
}

const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'bg-indigo-100 text-indigo-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-100 text-emerald-600' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100 text-blue-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100 text-purple-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100 text-orange-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', iconBg: 'bg-rose-100 text-rose-600' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', iconBg: 'bg-cyan-100 text-cyan-600' },
}

export default function StatsCard({ title, value, change, icon, color = 'indigo', subtitle, prefix }: StatsCardProps) {
  const colors = colorMap[color] || colorMap.indigo
  const isPositive = change !== undefined && change >= 0
  const isZero = change === 0

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return val
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500 group-hover:text-slate-600 transition-colors">{title}</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">
            {prefix}{formatValue(value)}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={clsx('p-3 rounded-xl transition-all duration-200 group-hover:scale-110', colors.iconBg)}>
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
          {isZero ? (
            <Minus className="w-4 h-4 text-slate-400" />
          ) : isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={clsx(
            'text-sm font-semibold',
            isZero ? 'text-slate-500' : isPositive ? 'text-emerald-600' : 'text-red-600'
          )}>
            {isZero ? '—' : `${Math.abs(change)}%`}
          </span>
          <span className="text-sm text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  )
}