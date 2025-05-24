'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DemoPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  useEffect(() => {
    // Auto-login as media buyer and redirect
    const autoLogin = async () => {
      try {
        await signIn('mediabuyer@demo.com', 'demo123');
      } catch (error) {
        console.error('Auto-login failed:', error);
        router.push('/app/signin');
      }
    };
    
    autoLogin();
  }, [signIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your demo...</p>
      </div>
    </div>
  );
}