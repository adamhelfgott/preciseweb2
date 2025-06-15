"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export type UserRole = "DATA_OWNER" | "MEDIA_BUYER" | "SOLUTION_CREATOR";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  onboardingCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const MOCK_USERS: Record<string, User> = {
  "dataowner@demo.com": {
    id: "user_1",
    email: "dataowner@demo.com",
    name: "Sarah Chen",
    role: "DATA_OWNER",
    company: "FitnessCo",
    onboardingCompleted: true,
  },
  "mediabuyer@demo.com": {
    id: "user_2",
    email: "mediabuyer@demo.com",
    name: "Michael Rodriguez",
    role: "MEDIA_BUYER",
    company: "Nike",
    onboardingCompleted: true,
  },
  "luigi@demo.com": {
    id: "k976xv9zsnasrrjbps9zj206297hryp2",
    email: "luigi@demo.com",
    name: "Luigi",
    role: "MEDIA_BUYER",
    company: "Professional Sports Team",
    onboardingCompleted: true,
  },
  "mario@demo.com": {
    id: "k976377vgwdebhknz6z4z9av4d7hrdaf",
    email: "mario@demo.com",
    name: "Mario",
    role: "DATA_OWNER",
    company: "Audience Acuity",
    onboardingCompleted: true,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const saveUserToConvex = useMutation(api.auth.saveUser);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem("precise_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      
      // Restore auth cookie
      const authToken = btoa(JSON.stringify({ 
        email: user.email, 
        role: user.role,
        id: user.id 
      }));
      document.cookie = `auth-token=${authToken}; path=/; max-age=86400; SameSite=Strict`;
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      const mockUser = MOCK_USERS[email];
      if (mockUser && password === "demo123") {
        console.log("Authentication successful, syncing with Convex...");
        console.log("Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);
        
        // Sync mock user with Convex
        await saveUserToConvex({
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          company: mockUser.company,
          onboardingCompleted: mockUser.onboardingCompleted,
        });
        
        setUser(mockUser);
        localStorage.setItem("precise_user", JSON.stringify(mockUser));
        
        // Set auth cookie for API protection (base64 encoded user data)
        const authToken = btoa(JSON.stringify({ 
          email: mockUser.email, 
          role: mockUser.role,
          id: mockUser.id 
        }));
        document.cookie = `auth-token=${authToken}; path=/; max-age=86400; SameSite=Strict`;
        
        // Redirect based on role
        if (mockUser.role === "DATA_OWNER") {
          router.push("/app/dashboard");
        } else if (mockUser.role === "MEDIA_BUYER") {
          router.push("/app/campaigns");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      console.error("Error details:", {
        email,
        mockUserFound: !!MOCK_USERS[email],
        passwordMatch: password === "demo123",
        error: error instanceof Error ? error.message : error
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role,
        onboardingCompleted: false,
      };
      
      // Sync new user with Convex
      await saveUserToConvex({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        onboardingCompleted: newUser.onboardingCompleted,
      });
      
      setUser(newUser);
      localStorage.setItem("precise_user", JSON.stringify(newUser));
      
      // Set auth cookie for API protection
      const authToken = btoa(JSON.stringify({ 
        email: newUser.email, 
        role: newUser.role,
        id: newUser.id 
      }));
      document.cookie = `auth-token=${authToken}; path=/; max-age=86400; SameSite=Strict`;
      
      router.push("/app/onboarding");
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("precise_user");
    // Clear auth cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    router.push("/");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("precise_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}