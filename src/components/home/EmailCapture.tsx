"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          message: 'Newsletter signup from footer',
          role: 'newsletter',
          company: ''
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-green-800">Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-dark-gray mb-2">Stay Updated</h3>
      <p className="text-medium-gray text-sm mb-4">
        Get the latest insights on privacy-preserving data collaboration
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 pr-12 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-green text-white rounded flex items-center justify-center hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}