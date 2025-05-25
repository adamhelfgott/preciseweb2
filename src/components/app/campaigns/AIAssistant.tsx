"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, TrendingUp, AlertTriangle, DollarSign, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useChat } from "ai/react";
import { useAuth } from "@/contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ProactiveInsight {
  id: string;
  type: "performance" | "budget" | "creative" | "audience";
  title: string;
  description: string;
  action?: string;
  impact?: string;
}

const PROACTIVE_INSIGHTS: ProactiveInsight[] = [
  {
    id: "1",
    type: "performance",
    title: "Nike Campaign Outperforming",
    description: "CTR is 47% above benchmark. Consider increasing budget allocation.",
    action: "Increase Budget",
    impact: "+$24K projected revenue"
  },
  {
    id: "2",
    type: "creative",
    title: "Creative Fatigue Detected",
    description: "Apple M4 creative showing declining engagement after 2.1M impressions.",
    action: "Refresh Creative",
    impact: "Prevent 15% CTR decline"
  },
  {
    id: "3",
    type: "budget",
    title: "Budget Optimization Available",
    description: "Reallocate $5K from underperforming Tesla campaign to high-performing segments.",
    action: "Optimize Now",
    impact: "+12% overall ROAS"
  },
  {
    id: "4",
    type: "audience",
    title: "New Audience Opportunity",
    description: "Tech professionals segment showing 3.2x higher conversion rate.",
    action: "Target Segment",
    impact: "+8K qualified leads"
  }
];

const SUGGESTED_QUESTIONS = [
  "What's my best performing campaign today?",
  "Why is the Nike campaign CTR so high?",
  "Show me creative performance across all campaigns",
  "What's my current budget utilization?",
  "Which audiences are converting best?",
  "How can I improve the Tesla campaign?"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [chatLoaded, setChatLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const saveMessage = useMutation(api.chat.saveMessage);
  const chatHistory = useQuery(api.chat.getChatHistory, 
    user?.id ? { userId: user.id as Id<"users"> } : "skip"
  );

  // Context for the AI based on current dashboard data
  const context = {
    userRole: user?.role || "MEDIA_BUYER",
    totalCampaigns: 5,
    avgROAS: 4.2,
    topCampaign: "Nike - Just Do It 2025",
    activeCampaigns: user?.role === "DATA_OWNER" ? 248 : 5,
    monthlyEarnings: user?.role === "DATA_OWNER" ? "$42K" : undefined,
  };

  const initialMessages = chatHistory && chatHistory.length > 0 && chatLoaded
    ? chatHistory.map((msg, index) => ({
        id: msg._id || `${index}`,
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      }))
    : [
        {
          id: "1",
          role: "assistant" as const,
          content: user?.role === "DATA_OWNER" 
            ? "How can I help with your data assets?"
            : "How can I help optimize your campaigns?"
        }
      ];

  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, error } = useChat({
    api: "/api/ai",
    body: { context },
    initialMessages: chatLoaded ? initialMessages : undefined,
    onError: (error) => {
      console.error("Chat error:", error);
      if (error.message.includes("API key")) {
        setApiKeyError("OpenAI API key not configured. Add OPENAI_API_KEY to your environment variables.");
      }
    },
    onFinish: async (message) => {
      if (user?.id && saveMessage) {
        await saveMessage({
          userId: user.id as Id<"users">,
          role: "assistant",
          content: message.content,
        });
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && user?.id && saveMessage) {
      await saveMessage({
        userId: user.id as Id<"users">,
        role: "user",
        content: input,
      });
    }
    originalHandleSubmit(e);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatHistory !== undefined && !chatLoaded) {
      setChatLoaded(true);
    }
  }, [chatHistory, chatLoaded]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question: string) => {
    handleInputChange({ target: { value: question } } as any);
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "performance": return <TrendingUp className="w-4 h-4" />;
      case "creative": return <Sparkles className="w-4 h-4" />;
      case "budget": return <DollarSign className="w-4 h-4" />;
      case "audience": return <AlertTriangle className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-orange to-vibrant-orange text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed right-0 top-0 h-full w-full lg:w-[400px] bg-white shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-orange to-vibrant-orange p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    {!isMinimized && <p className="text-xs opacity-90">Ask questions in natural language</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white/80 hover:text-white p-1"
                  >
                    {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* API Key Error */}
                {apiKeyError && (
                  <div className="p-4 bg-yellow-50 border-b border-yellow-200">
                    <p className="text-sm text-yellow-800">{apiKeyError}</p>
                    <p className="text-xs text-yellow-600 mt-1">
                      For demo purposes, the assistant will use contextual mock responses.
                    </p>
                  </div>
                )}

                {/* Proactive Insights */}
                <div className="p-4 border-b bg-light-gray/50">
              <h4 className="text-sm font-semibold text-medium-gray mb-3">Proactive Insights</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {PROACTIVE_INSIGHTS.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-3 rounded-lg border border-light-gray hover:border-primary-orange transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`p-1 rounded ${
                        insight.type === 'performance' ? 'bg-green-100 text-green-600' :
                        insight.type === 'creative' ? 'bg-purple-100 text-purple-600' :
                        insight.type === 'budget' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-dark-gray">{insight.title}</h5>
                        <p className="text-xs text-medium-gray mt-1">{insight.description}</p>
                        {insight.impact && (
                          <p className="text-xs font-medium text-primary-orange mt-2">{insight.impact}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-primary-orange text-white' 
                      : 'bg-light-gray text-dark-gray'
                  }`}>
                    {message.role === 'user' ? (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="text-sm prose prose-sm max-w-none prose-gray">
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-light-gray p-3 rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin text-medium-gray" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="p-3 border-t bg-light-gray/30">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="text-xs bg-white border border-light-gray rounded-full px-3 py-1.5 whitespace-nowrap hover:border-primary-orange hover:text-primary-orange transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
              </>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about your campaigns..."
                  className="flex-1 px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-primary-orange text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary-orange text-white p-2 rounded-lg hover:bg-vibrant-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}