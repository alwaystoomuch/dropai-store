'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import { Bot, Send, User } from 'lucide-react'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/ai/conversations')
      .then(r => r.json())
      .then(data => setMessages(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), role: 'user', message: input, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Based on your store data, I'd recommend focusing on **Tech Accessories** — they have the highest profit margins at 68-75%.",
        "Your best-selling product is **Wireless Bluetooth Earbuds** with 342 units sold. Consider running Facebook ads targeting audio enthusiasts.",
        "I analyzed your analytics. Your conversion rate could improve by adding product videos and customer reviews to your store pages.",
        "Looking at trends: **Smart Home** and **Wellness** products are growing 40% YoY. Consider expanding into those categories.",
        "Your average order value is **$72.66**. Try offering bundle deals (e.g., 'Complete Desk Setup') to increase it to $85+.",
      ]
      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        message: responses[Math.floor(Math.random() * responses.length)],
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, aiMsg])
    }, 800)
  }

  return (
    <>
      <Header title="AI Assistant" />
      <div className="p-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col h-[600px]">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">Chat with DropAI</h2>
                <p className="text-xs text-slate-500">Your AI dropshipping co-pilot</p>
              </div>
              <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {loading ? (
                  <div className="text-center text-slate-400 py-12">Loading conversations...</div>
                ) : messages.length === 0 ? (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-indigo-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-slate-700">Hi! I&apos;m your AI dropshipping assistant. I can help you with:</p>
                      <ul className="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
                        <li>Finding trending products to sell</li>
                        <li>Analyzing your store&apos;s performance</li>
                        <li>Suggesting winning niches</li>
                        <li>Writing product descriptions and ad copy</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-100 text-slate-700 rounded-tl-sm'}`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-slate-200 px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything about your dropshipping store..."
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-lg transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {['Find trending products', 'Analyze my store', 'Suggest a niche', 'Write ad copy', 'Check profit margins'].map((action) => (
                    <button key={action} onClick={() => { setInput(action); handleSend() }}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 border border-slate-100 transition-colors"
                    >{action}</button>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
                <p className="text-sm text-indigo-100">Ask me to analyze your best-selling products and suggest ways to increase your average order value!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}