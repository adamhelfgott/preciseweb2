"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Database, DollarSign, Settings, Users, FileText, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "campaign" | "asset" | "setting" | "page" | "action";
  icon: React.ElementType;
  href?: string;
  action?: () => void;
}

const MOCK_SEARCH_RESULTS: Record<string, SearchResult[]> = {
  DATA_OWNER: [
    {
      id: "1",
      title: "Fitness Activity Events",
      description: "2.3M events • $23,400 monthly revenue",
      type: "asset",
      icon: Database,
      href: "/app/assets"
    },
    {
      id: "2",
      title: "User Demographics",
      description: "890K profiles • $11,200 monthly revenue",
      type: "asset",
      icon: Database,
      href: "/app/assets"
    },
    {
      id: "3",
      title: "Monthly Earnings Report",
      description: "View detailed earnings breakdown",
      type: "page",
      icon: DollarSign,
      href: "/app/earnings"
    },
    {
      id: "4",
      title: "API Keys",
      description: "Manage API access and credentials",
      type: "setting",
      icon: Settings,
      href: "/app/settings"
    },
    {
      id: "5",
      title: "Data Quality Settings",
      description: "Configure validation rules",
      type: "setting",
      icon: Settings,
      href: "/app/settings"
    }
  ],
  MEDIA_BUYER: [
    {
      id: "1",
      title: "Nike Summer Fitness 2025",
      description: "Active • CAC $31.20 • ROAS 5.0x",
      type: "campaign",
      icon: TrendingUp,
      href: "/app/campaigns"
    },
    {
      id: "2",
      title: "Adidas Morning Warriors",
      description: "Active • CAC $42.80 • ROAS 4.5x",
      type: "campaign",
      icon: TrendingUp,
      href: "/app/campaigns"
    },
    {
      id: "3",
      title: "Whoop Fitness Data",
      description: "Premium segment • 2.3M users",
      type: "asset",
      icon: Database,
      href: "/app/marketplace"
    },
    {
      id: "4",
      title: "Creative Performance Report",
      description: "View creative analytics",
      type: "page",
      icon: FileText,
      href: "/app/campaigns"
    },
    {
      id: "5",
      title: "Budget Optimization",
      description: "AI-powered budget allocation",
      type: "action",
      icon: DollarSign,
      action: () => console.log("Open budget optimizer")
    }
  ]
};

const RECENT_SEARCHES = [
  "Nike campaign performance",
  "Fitness data segments",
  "API documentation",
  "Budget pacing",
  "Attribution analysis"
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useAuth();

  // Open search with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const userResults = user?.role ? MOCK_SEARCH_RESULTS[user.role] || [] : [];
    const filtered = userResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [searchQuery, user?.role]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.href) {
      router.push(result.href);
    } else if (result.action) {
      result.action();
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  const getResultIcon = (result: SearchResult) => {
    const Icon = result.icon;
    const colors = {
      campaign: "text-brand-green",
      asset: "text-electric-blue",
      setting: "text-medium-gray",
      page: "text-bright-purple",
      action: "text-warm-coral"
    };
    return <Icon className={`w-5 h-5 ${colors[result.type]}`} />;
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-light-gray hover:bg-silk-gray rounded-lg transition-colors"
      >
        <Search className="w-4 h-4 text-medium-gray" />
        <span className="text-sm text-medium-gray hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white rounded border border-silk-gray text-medium-gray">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-4 border-b border-silk-gray">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-medium-gray flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search campaigns, data assets, settings..."
                    className="flex-1 text-lg outline-none placeholder-medium-gray"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-light-gray rounded-md transition-colors"
                  >
                    <X className="w-5 h-5 text-medium-gray" />
                  </button>
                </div>
              </div>

              {/* Results or Recent Searches */}
              <div className="max-h-96 overflow-y-auto">
                {searchQuery ? (
                  results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            index === selectedIndex
                              ? "bg-light-gray"
                              : "hover:bg-light-gray/50"
                          }`}
                        >
                          {getResultIcon(result)}
                          <div className="flex-1 text-left">
                            <p className="font-medium text-dark-gray">{result.title}</p>
                            <p className="text-sm text-medium-gray">{result.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-medium-gray" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-medium-gray">No results found for "{searchQuery}"</p>
                    </div>
                  )
                ) : (
                  <div className="p-4">
                    <p className="text-sm font-medium text-medium-gray mb-3">Recent Searches</p>
                    <div className="space-y-1">
                      {RECENT_SEARCHES.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(search)}
                          className="w-full text-left px-3 py-2 text-sm text-medium-gray hover:text-dark-gray hover:bg-light-gray rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-silk-gray bg-light-gray/50">
                <div className="flex items-center justify-between text-xs text-medium-gray">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white rounded border border-silk-gray">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-white rounded border border-silk-gray">↓</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white rounded border border-silk-gray">↵</kbd>
                      to select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white rounded border border-silk-gray">esc</kbd>
                      to close
                    </span>
                  </div>
                  <span>Powered by Precise AI</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}