"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Database, 
  DollarSign, 
  TrendingUp,
  ShoppingBag,
  Store,
  Settings,
  LogOut,
  Menu,
  X,
  GitBranch,
  Layers
} from "lucide-react";
import { useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return null;

  const navigation = user.role === "DATA_OWNER" ? [
    { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    { name: "Data Assets", href: "/app/assets", icon: Database },
    { name: "Earnings", href: "/app/earnings", icon: DollarSign },
    { name: "Attribution", href: "/app/attribution", icon: TrendingUp },
  ] : [
    { name: "Campaigns", href: "/app/campaigns", icon: TrendingUp },
    { name: "Attribution", href: "/app/attribution", icon: GitBranch },
    { name: "Data Impact", href: "/app/data-impact", icon: Layers },
    { name: "Marketplace", href: "/app/marketplace", icon: Store },
    { name: "Optimization", href: "/app/optimization", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-white border-b border-silk-gray sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-md text-medium-gray hover:text-dark-gray"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <Link href="/app/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="font-semibold text-xl text-dark-gray hidden sm:block">Precise</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-dark-gray">{user.name}</p>
                <p className="text-xs text-medium-gray">{user.company}</p>
              </div>
              
              <div className="h-10 w-10 bg-brand-green/10 rounded-full flex items-center justify-center">
                <span className="text-brand-green font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-silk-gray transform transition-transform md:relative md:translate-x-0 pt-16 md:pt-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="flex flex-col h-full">
            <div className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-brand-green text-white"
                        : "text-medium-gray hover:bg-light-gray hover:text-dark-gray"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="px-4 py-6 border-t border-silk-gray space-y-1">
              <Link
                href="/app/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-medium-gray hover:bg-light-gray hover:text-dark-gray transition-colors"
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </Link>
              
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-medium-gray hover:bg-light-gray hover:text-dark-gray transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}