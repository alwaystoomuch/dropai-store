'use client'

import { useState, useEffect, useCallback } from 'react'
import { Mail, Send, Eye, Users, Clock, CheckCircle, XCircle, Loader2, Plus, X, MessageSquare, TrendingUp } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

interface EmailRecord {
  id: string
  to_email: string
  subject: string
  body: string
  campaign_type: string
  status: string
  sent_at: string
}

const CAMPAIGN_TYPES = [
  { value: 'welcome', label: 'Welcome', icon: <Mail className="w-4 h-4" />, desc: 'New subscriber onboarding' },
  { value: 'order_confirmation', label: 'Order Confirmation', icon: <CheckCircle className="w-4 h-4" />, desc: 'Post-purchase confirmation' },
  { value: 'shipping_notification', label: 'Shipping Notification', icon: <TruckIcon className="w-4 h-4" />, desc: 'Tracking info delivery' },
  { value: 'abandoned_cart', label: 'Abandoned Cart', icon: <Eye className="w-4 h-4" />, desc: 'Recover lost sales' },
  { value: 'supplier_outreach', label: 'Supplier Outreach', icon: <Users className="w-4 h-4" />, desc: 'Partner communication' },
]

const STATUS_COLORS: Record<string, string> = {
  sent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  failed: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState<string | null>(null)

  // Form state
  const [toEmail, setToEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [campaignType, setCampaignType] = useState('welcome')

  const fetchEmails = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/emails/history')
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setEmails(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load emails')
      setEmails([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEmails()
  }, [fetchEmails])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setSendSuccess(null)
    try {
      const res = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: toEmail,
          subject,
          body,
          campaign_type: campaignType,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
      }
      setSendSuccess('Email sent successfully!')
      setToEmail('')
      setSubject('')
      setBody('')
      setCampaignType('welcome')
      setTimeout(() => {
        setShowModal(false)
        setSendSuccess(null)
        fetchEmails()
      }, 1500)
    } catch (err) {
      setSendSuccess(null)
      alert(err instanceof Error ? err.message : 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  const campaignLabel = (type: string) => {
    const found = CAMPAIGN_TYPES.find((c) => c.value === type)
    return found ? found.label : type
  }

  const campaignIcon = (type: string) => {
    const found = CAMPAIGN_TYPES.find((c) => c.value === type)
    return found ? found.icon : <Mail className="w-4 h-4" />
  }

  const getCampaignDesc = (type: string) => {
    const found = CAMPAIGN_TYPES.find((c) => c.value === type)
    return found ? found.desc : ''
  }

  return (
    <DashboardLayout title="Emails" subtitle="Manage and send automated email campaigns — welcome, order confirmation, shipping, cart recovery, and supplier outreach.">
      {/* Campaign type summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {CAMPAIGN_TYPES.map((ct) => {
          const count = emails.filter((e) => e.campaign_type === ct.value).length
          return (
            <div key={ct.value} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all duration-200 group hover:-translate-y-0.5">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                {ct.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{ct.label}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{getCampaignDesc(ct.value)}</p>
              <p className="text-xs text-slate-500 mt-2">
                <span className="font-semibold text-slate-700">{count}</span> sent
              </p>
            </div>
          )
        })}
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          {emails.length > 0
            ? `${emails.length} email${emails.length !== 1 ? 's' : ''} sent`
            : 'No emails sent yet'}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          Send Email
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading email history...</p>
          <p className="text-slate-400 text-sm mt-1">Fetching your sent emails</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-white rounded-xl border border-red-200 p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-red-600 font-medium mb-1">Failed to load emails</p>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchEmails}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && emails.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No emails sent yet</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            Start sending emails to customers and suppliers from your dashboard.
            Your first welcome email is just a click away.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Send className="w-4 h-4" />
            Send Your First Email
          </button>
        </div>
      )}

      {/* Email history table */}
      {!loading && !error && emails.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign Type</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sent At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {emails.map((email) => (
                  <tr key={email.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-900">{email.to_email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                          {campaignIcon(email.campaign_type)}
                        </span>
                        <span className="text-sm text-slate-700">{email.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{campaignLabel(email.campaign_type)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          STATUS_COLORS[email.status] || 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {email.status === 'sent' ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : email.status === 'failed' ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{formatDate(email.sent_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Send Email Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Send Email</h2>
                <p className="text-sm text-slate-500">Send a manual email to a customer or supplier</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {sendSuccess && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {sendSuccess}
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Campaign Type</label>
                <select
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
                >
                  {CAMPAIGN_TYPES.map((ct) => (
                    <option key={ct.value} value={ct.value}>
                      {ct.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">To</label>
                <input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder="customer@example.com"
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject line"
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your email content here..."
                  rows={5}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}