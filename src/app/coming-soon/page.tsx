import Link from "next/link";
import { ArrowLeft, Bell, Zap } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-electric-blue to-bright-purple rounded-full mb-8">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-4">
              Something Big is Coming
            </h1>
            
            {/* Description */}
            <p className="text-xl text-medium-gray mb-12 max-w-2xl mx-auto">
              We're putting the finishing touches on this section. 
              Join our early access list to be the first to know when it launches.
            </p>
            
            {/* Email signup */}
            <div className="max-w-md mx-auto mb-12">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-electric-blue"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-dark-gray text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Notify Me
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-2">
                No spam, just important updates. Unsubscribe anytime.
              </p>
            </div>
            
            {/* Quick links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-started"
                className="inline-flex items-center justify-center px-6 py-3 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Started Now
              </Link>
              <Link 
                href="/agent-intelligence"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Learn About Our Platform
              </Link>
            </div>
          </div>
          
          {/* Feature preview */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-sm text-gray-600">
                Deep insights into your advertising performance across all platforms
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-bright-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-bright-purple" />
              </div>
              <h3 className="font-semibold mb-2">Developer Tools</h3>
              <p className="text-sm text-gray-600">
                Comprehensive SDKs and APIs for seamless integration
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold mb-2">Enterprise Support</h3>
              <p className="text-sm text-gray-600">
                Dedicated support for your mission-critical campaigns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}