"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, TrendingUp, AlertTriangle, DollarSign, Loader2, ChevronRight } from "lucide-react";
import { useChat } from "ai/react";
import { useAuth } from "@/contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePathname } from "next/navigation";

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

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const pathname = usePathname();
  
  const saveMessage = useMutation(api.chat.saveMessage);
  const chatHistory = useQuery(api.chat.getChatHistory, 
    user?.id ? { userId: user.id as Id<"users"> } : "skip"
  );

  // Context for the AI based on current page
  const getPageContext = () => {
    const page = pathname.split('/').pop();
    switch(page) {
      case 'campaigns':
        return {
          page: 'campaigns',
          description: 'Campaign management dashboard',
          availableData: 'campaign performance, creative fatigue, DSP arbitrage, budget pacing, attribution models'
        };
      case 'attribution-analysis':
        return {
          page: 'attribution-analysis',
          description: 'Query Management and Attribution Analysis',
          availableData: 'multi-touch attribution, channel performance, conversion paths'
        };
      case 'data-impact':
        return {
          page: 'data-impact',
          description: 'Intelligence Impact dashboard',
          availableData: 'data contribution value, lift analysis, shared cohorts, media credits'
        };
      case 'marketplace':
        return {
          page: 'marketplace',
          description: 'Federated Insights marketplace',
          availableData: 'available data assets, pricing, quality scores'
        };
      case 'optimization':
        return {
          page: 'optimization',
          description: 'Campaign optimization tools',
          availableData: 'budget allocation, audience targeting, creative optimization'
        };
      default:
        return {
          page: page || 'dashboard',
          description: 'Media buyer dashboard',
          availableData: 'overall campaign metrics and insights'
        };
    }
  };

  // Context for the AI based on current dashboard data
  const context = {
    userRole: user?.role || "MEDIA_BUYER",
    totalCampaigns: 5,
    avgROAS: 4.2,
    topCampaign: "Nike - Just Do It 2025",
    activeCampaigns: user?.role === "DATA_OWNER" ? 248 : 5,
    monthlyEarnings: user?.role === "DATA_OWNER" ? "$42K" : undefined,
    currentPage: getPageContext(),
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

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+J (Mac) or Ctrl+J (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuestionClick = (question: string) => {
    handleInputChange({ target: { value: question } } as any);
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleInsightClick = (insight: ProactiveInsight) => {
    const detailPrompt = `Tell me more about: ${insight.title}. ${insight.description}`;
    handleInputChange({ target: { value: detailPrompt } } as any);
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const dismissInsight = (insightId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedInsights(prev => new Set(prev).add(insightId));
  };

  const visibleInsights = PROACTIVE_INSIGHTS.filter(insight => !dismissedInsights.has(insight.id));

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "performance": return <TrendingUp className="w-4 h-4" />;
      case "creative": return <Sparkles className="w-4 h-4" />;
      case "budget": return <DollarSign className="w-4 h-4" />;
      case "audience": return <AlertTriangle className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getSuggestedQuestions = (page: string) => {
    const baseQuestions: Record<string, string[]> = {
      campaigns: [
        "What's my best performing campaign today?",
        "Why is the Nike campaign CTR so high?",
        "Show me creative performance across all campaigns",
        "What's my current budget utilization?",
        "Which creatives need refreshing?",
        "How can I optimize DSP allocation?"
      ],
      'attribution-analysis': [
        "What's the attribution for Nike campaign?",
        "Which channels drive the most conversions?",
        "Show me the conversion paths analysis",
        "What's the impact of different attribution windows?",
        "How does first-touch vs last-touch compare?",
        "Which touchpoints are most valuable?"
      ],
      'data-impact': [
        "What data is driving the most lift?",
        "Show me the value of each data contribution",
        "Which shared cohorts are performing best?",
        "How are my media credits being used?",
        "What's the incremental impact of data?",
        "Which data assets should I prioritize?"
      ],
      marketplace: [
        "What new data assets are available?",
        "Which data would help my campaigns?",
        "Show me high-quality location data",
        "What's the pricing for behavioral data?",
        "Which assets have the best quality scores?",
        "How can I access premium segments?"
      ],
      optimization: [
        "How should I reallocate my budget?",
        "Which audiences should I target?",
        "What creative optimizations do you suggest?",
        "Show me underperforming segments",
        "How can I improve ROAS?",
        "What's my optimal bid strategy?"
      ]
    };
    
    return baseQuestions[page] || baseQuestions.campaigns;
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-orange to-vibrant-orange text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={() => setIsOpen(true)}
          >
            <Bot className="w-6 h-6" />
            <span className="absolute -top-12 right-0 bg-dark-gray text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Press ⌘J
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black lg:hidden z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-6 right-6 w-full max-w-[380px] h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden
                         lg:bottom-6 lg:right-6
                         bottom-0 right-0 left-0 max-lg:h-full max-lg:max-w-none max-lg:rounded-none"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-orange to-vibrant-orange p-3 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-xs opacity-90">Ask questions in natural language</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-white/90 p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                    aria-label="Close assistant"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Current Page Context */}
              <div className="px-4 py-2 bg-gradient-to-r from-primary-orange/10 to-vibrant-orange/10 border-b flex-shrink-0">
                <p className="text-xs text-medium-gray">
                  <span className="font-medium">Current Page:</span> {context.currentPage.description}
                </p>
                <p className="text-xs text-medium-gray/70 mt-0.5">
                  Press <kbd className="px-1.5 py-0.5 bg-white rounded text-xs font-mono">⌘J</kbd> to toggle
                </p>
              </div>

              {/* API Key Error */}
              {apiKeyError && (
                <div className="p-4 bg-yellow-50 border-b border-yellow-200 flex-shrink-0">
                  <p className="text-sm text-yellow-800">{apiKeyError}</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    For demo purposes, the assistant will use contextual mock responses.
                  </p>
                </div>
              )}

              {/* Proactive Insights Notification */}
              {visibleInsights.length > 0 && (
                <div className="px-4 py-2 bg-primary-orange/10 border-b flex-shrink-0">
                  <button
                    onClick={() => setShowInsights(!showInsights)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-orange" />
                      <span className="text-xs font-medium text-dark-gray">
                        {visibleInsights.length} proactive insights available
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-medium-gray transition-transform ${
                      showInsights ? 'rotate-90' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {showInsights && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 space-y-1 overflow-hidden"
                      >
                        {visibleInsights.map((insight) => (
                          <button
                            key={insight.id}
                            onClick={() => {
                              handleInsightClick(insight);
                              setShowInsights(false);
                            }}
                            className="w-full text-left p-2 bg-white rounded border border-light-gray hover:border-primary-orange transition-colors group"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded ${
                                insight.type === 'performance' ? 'bg-green-100 text-green-600' :
                                insight.type === 'creative' ? 'bg-purple-100 text-purple-600' :
                                insight.type === 'budget' ? 'bg-blue-100 text-blue-600' :
                                'bg-orange-100 text-orange-600'
                              }`}>
                                {getInsightIcon(insight.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-medium text-dark-gray truncate">{insight.title}</h5>
                                {insight.impact && (
                                  <p className="text-xs text-primary-orange">{insight.impact}</p>
                                )}
                              </div>
                              <X 
                                onClick={(e) => dismissInsight(insight.id, e)}
                                className="w-3 h-3 text-medium-gray opacity-0 group-hover:opacity-100 flex-shrink-0" 
                              />
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary-orange text-white p-3 rounded-lg' 
                        : ''
                    }`}>
                      {message.role === 'user' ? (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div>
                          <div className="bg-light-gray text-dark-gray p-3 rounded-lg">
                            <div className="text-sm prose prose-sm max-w-none prose-gray">
                              <ReactMarkdown>
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                          {/* More Detail Button */}
                          {!message.content.includes("For more details") && message.content.length < 500 && (
                            <button
                              onClick={() => {
                                const detailPrompt = `Please provide more detailed information about: "${message.content.substring(0, 100)}..."`;
                                handleInputChange({ target: { value: detailPrompt } } as any);
                                setTimeout(() => {
                                  const form = document.querySelector('form');
                                  form?.requestSubmit();
                                }, 100);
                              }}
                              className="mt-2 text-xs text-primary-orange hover:text-vibrant-orange flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              More details
                            </button>
                          )}
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

              {/* Suggested Questions - More Compact */}
              <div className="p-2 border-t bg-light-gray/30 flex-shrink-0">
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                  {getSuggestedQuestions(context.currentPage.page).slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="text-xs bg-white border border-light-gray rounded-full px-2 py-1 whitespace-nowrap hover:border-primary-orange hover:text-primary-orange transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 border-t bg-white flex-shrink-0">
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}