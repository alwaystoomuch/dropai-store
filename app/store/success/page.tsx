import Link from 'next/link'
import { CheckCircle, ArrowRight, Droplets } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Order Placed! 🎉</h1>
        <p className="text-slate-500 mb-2">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          <strong>Demo Mode:</strong> No real payment was processed. Set up Stripe in your .env.local to accept real payments.
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/store" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2">
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}