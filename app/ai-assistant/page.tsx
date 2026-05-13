'use client'

import { Bot, Send, Sparkles, TrendingUp, PenLine, Megaphone, BarChart3, Lightbulb, MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import { useRef, useEffect, useState } from 'react'

const quickActions = [
  { label: 'Find trending products', icon: TrendingUp, color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { label: 'Write product description', icon: PenLine, color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
  { label: 'Create ad script', icon: Megaphone, color: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100' },
  { label: 'Analyze my store', icon: BarChart3, color: 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100' },
  { label: 'Suggest a niche', icon: Lightbulb, color: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:bg-cyan-100' },
]

const suggestions = [
  "What products are trending this month?",
  "Write a description for wireless earbuds",
  "Analyze my best-selling products",
  "How can I increase my AOV?",
  "What's a good niche for beginners?",
]

export default function AIAssistantPage() {
  const [inputValue, setInputValue] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <Header title="AI Assistant" subtitle="Your AI dropshipping co-pilot" />
      <div className="p-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col h-[650px] shadow-sm">
            {/* Chat Header */}
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">DropAI Assistant</h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" />
                    Online &middot; Ready to help
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-3 h-3" />
                  GPT-4
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* AI Welcome Message */}
              <div className="flex gap-3 animate-slide-up">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%] border border-slate-100">
                    <p className="text-sm text-slate-700 font-medium mb-2">👋 Hi! I&apos;m your AI dropshipping assistant</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      I can help you with finding trending products, writing compelling product descriptions,
                      creating ad scripts, analyzing your store&apos;s performance, and answering any
                      dropshipping question you have. What would you like to explore today?
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 ml-1">
                    <span className="text-[11px] text-slate-400">Just now</span>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 ml-12">
                {suggestions.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => setInputValue(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your dropshipping store..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
                  onKeyDown={(e) => e.key === 'Enter' && setInputValue('')}
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white p-3 rounded-xl transition-all shadow-sm hover:shadow-md disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                DropAI can make mistakes. Verify important information before making decisions.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border flex items-center gap-3 group"
                    >
                      <div className={`p-1.5 rounded-lg ${action.color.split(' ').slice(1, 3).join(' ')}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <h3 className="font-semibold">Pro Tip</h3>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Ask me to analyze your best-selling products and suggest ways to increase your average order value through upsells and bundles!
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors inline-flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Try this now
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 text-sm mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Product description generated', time: '2 min ago', type: 'description' },
                  { action: 'Store analysis completed', time: '1 hour ago', type: 'analysis' },
                  { action: 'Ad script created', time: '3 hours ago', type: 'ad' },
                ].map((activity) => (
                  <div key={activity.time} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-700 truncate">{activity.action}</p>
                      <p className="text-[11px] text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}