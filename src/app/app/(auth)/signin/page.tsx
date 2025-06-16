"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
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
              Welcome back
            </h1>
            <p className="text-medium-gray">
              Sign in to your Precise account
            </p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Email
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
                />
              </div>
            </div>

            {error && (
              <div className="text-warm-coral text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary justify-center"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-medium-gray">
            Don't have an account?{" "}
            <Link href="/app/signup" className="text-brand-green hover:text-dark-gray transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-green/10 to-bright-purple/10 items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="mb-8">
            <div className="w-32 h-32 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-5xl font-bold">P</span>
            </div>
            <h2 className="text-display-medium font-bold text-dark-gray mb-4">
              Infrastructure for Privacy-Preserving Collaboration
            </h2>
            <p className="text-body-large text-medium-gray max-w-md mx-auto">
              Join the network where data controllers and advertisers collaborate to create better outcomes for everyone.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green">45%</div>
              <div className="text-sm text-medium-gray">CAC reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-purple">3.2x</div>
              <div className="text-sm text-medium-gray">Better attribution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue">12K+</div>
              <div className="text-sm text-medium-gray">Network participants</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}