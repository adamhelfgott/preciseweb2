import Link from "next/link";
import Icon from "@/components/Icon";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2E] via-[#2D3436] to-[#1A1F2E] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 with Precise Icon */}
        <div className="relative mb-8">
          <h1 className="text-[180px] font-bold text-gray-800/20 select-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={80} className="opacity-50" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/10"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#0984E3] hover:bg-[#0770C1] text-white rounded-lg transition-all duration-300"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-500 mb-4">Looking for something specific?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
            <Link href="/data-owners" className="text-gray-400 hover:text-white transition-colors">
              Data Owners
            </Link>
            <Link href="/media-buyers" className="text-gray-400 hover:text-white transition-colors">
              Media Buyers
            </Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
        </div>

        {/* Search Hint */}
        <div className="mt-12 text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            <span>Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Cmd+K</kbd> to search</span>
          </p>
        </div>
      </div>
    </div>
  );
}