'use client'

import React from 'react'
import Header from './Header'

interface DashboardLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  action?: React.ReactNode
}

export default function DashboardLayout({ title, subtitle, children, action }: DashboardLayoutProps) {
  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <div className="p-8 animate-fade-in">
        {action && (
          <div className="flex items-center justify-between mb-6">
            {subtitle && <p className="text-slate-500">{subtitle}</p>}
            <div>{action}</div>
          </div>
        )}
        {children}
      </div>
    </>
  )
}