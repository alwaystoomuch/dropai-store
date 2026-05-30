'use client'

import { useState, useEffect } from 'react'
import { Mail, Send, Eye, Users, Clock, Loader2 } from 'lucide-react'
import Header from '@/components/Header'

export default function EmailsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/email-campaigns')
      .then(r => r.json())
      .then(data => setCampaigns(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const campaignIcons: Record<string, any> = {
    welcome: <Mail className="w-5 h-5" />,
    order_confirmation: <Send className="w-5 h-5" />,
    shipping_notification: <Send className="w-5 h-5" />,
    abandoned_cart: <Eye className="w-5 h-5" />,
    supplier_outreach: <Users className="w-5 h-5" />,
  }

  const campaignLabels: Record<string, string> = {
    welcome: 'Welcome Series',
    order_confirmation: 'Order Confirmation',
    shipping_notification: 'Shipping Notification',
    abandoned_cart: 'Abandoned Cart',
    supplier_outreach: 'Supplier Outreach',
  }

  return (
    <>
      <Header title="Emails" />
      <div className="p-8 animate-fade-in">
        <p className="text-slate-500 mb-6">Five automated campaigns running on autopilot — no manual emails needed</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {loading ? (
            <div className="col-span-5 text-center py-8 text-slate-400">Loading campaigns...</div>
          ) : (
            campaigns.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 mb-2">
                  {campaignIcons[c.campaign_type] || <Mail className="w-5 h-5" />}
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{campaignLabels[c.campaign_type] || c.campaign_type}</h3>
                <p className="text-xs text-slate-500 mt-1">{Math.round((c.open_rate || 0) * 100)}% open rate</p>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Campaign', 'Subject', 'Sent', 'Recipients', 'Open Rate'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : campaigns.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No email campaigns yet</td></tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                          {campaignIcons[c.campaign_type] || <Mail className="w-4 h-4" />}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{campaignLabels[c.campaign_type] || c.campaign_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{c.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{c.sent_at ? new Date(c.sent_at).toLocaleDateString() : '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{(c.recipient_count || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {Math.round((c.open_rate || 0) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}