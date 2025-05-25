"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Building } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      setError("Please select a role");
      return;
    }
    
    setError("");
    setIsLoading(true);

    try {
      await signUp(email, password, name, role as UserRole);
    } catch (err) {
      setError("Failed to create account");
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: "DATA_OWNER",
      title: "Data Controller",
      description: "I have data to monetize",
      icon: "💎",
    },
    {
      id: "MEDIA_BUYER",
      title: "Media Buyer",
      description: "I need verified audiences",
      icon: "🎯",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-medium-gray hover:text-dark-gray transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-display-medium font-bold text-dark-gray mb-2">
              Create your account
            </h1>
            <p className="text-medium-gray">
              Join the future of data monetization
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-dark-gray mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                {roles.map((roleOption) => (
                  <motion.button
                    key={roleOption.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole(roleOption.id as UserRole)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === roleOption.id
                        ? "border-brand-green bg-brand-green/5"
                        : "border-silk-gray hover:border-medium-gray"
                    }`}
                  >
                    <div className="text-3xl mb-2">{roleOption.icon}</div>
                    <div className="font-medium text-dark-gray">{roleOption.title}</div>
                    <div className="text-sm text-medium-gray mt-1">{roleOption.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Work email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-medium-gray mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {error && (
              <div className="text-warm-coral text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading || !role}
              className="w-full btn-primary justify-center"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-xs text-center text-medium-gray">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-brand-green hover:text-dark-gray">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-brand-green hover:text-dark-gray">
                Privacy Policy
              </Link>
            </p>
          </form>

          <p className="mt-6 text-center text-medium-gray">
            Already have an account?{" "}
            <Link href="/app/signin" className="text-brand-green hover:text-dark-gray transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-green/10 to-bright-purple/10 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-8">
            Start earning from your data
          </h2>

          <div className="space-y-6 max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🆓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray">Free to start</h3>
                  <p className="text-sm text-medium-gray">No upfront costs, no contracts</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-bright-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧮</span>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray">Fair attribution</h3>
                  <p className="text-sm text-medium-gray">Shapley values ensure fair payment</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray">5-minute setup</h3>
                  <p className="text-sm text-medium-gray">Start earning immediately</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}