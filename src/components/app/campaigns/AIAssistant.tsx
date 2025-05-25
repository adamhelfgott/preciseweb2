"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

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

const MOCK_RESPONSES: Record<string, string> = {
  "default": "I'm analyzing your campaigns across all platforms. Based on current performance, I've identified several optimization opportunities that could improve your overall ROAS by 23%.",
  "best performing": "Your Nike 'Just Do It 2025' campaign is currently your top performer with a 3.8% CTR and $2.40 CPA. It's leveraging Precise's verified athlete data, which is driving 47% higher engagement than your baseline.",
  "nike ctr": "The Nike campaign's high CTR (3.8%) is driven by three factors: 1) Precise's verified athlete interest data ensures we're reaching genuine sports enthusiasts, 2) Creative messaging aligns perfectly with this audience, and 3) Our multi-touch attribution shows strong upper-funnel impact from YouTube pre-roll.",
  "creative performance": "Across your 5 active campaigns, I'm tracking 23 creatives. Top performers: Nike video (3.8% CTR), Disney+ carousel (2.9% CTR). Underperformers: Tesla static image (0.9% CTR) - showing fatigue after 2.1M impressions. I recommend refreshing the Tesla creative with dynamic elements.",
  "budget utilization": "Current budget utilization: 72% ($143K of $198K). Nike is pacing 15% ahead (good problem!), while Tesla is 23% behind. I recommend reallocating $5K from Tesla to Nike to maximize performance. This would increase projected ROAS from 3.2x to 3.6x.",
  "converting audiences": "Top converting audiences: 1) Verified Tech Professionals (5.2% CVR), 2) Fitness Enthusiasts 25-34 (4.8% CVR), 3) Premium Streaming Subscribers (4.1% CVR). All these segments are powered by Precise's verified credential system, ensuring data quality.",
  "improve tesla": "To improve the Tesla campaign: 1) Refresh creative - current static image has fatigue, 2) Expand to 'Verified EV Intenders' audience segment (+40K reach), 3) Implement sequential messaging strategy, 4) Increase bids on high-performing placements. Expected improvement: +35% CTR, -20% CPA."
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your AI Campaign Assistant. I'm monitoring all your campaigns in real-time. I've already identified 4 optimization opportunities that could improve your ROAS by 23%. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes("best performing") || lowercaseInput.includes("top campaign")) {
      return MOCK_RESPONSES["best performing"];
    } else if (lowercaseInput.includes("nike") && lowercaseInput.includes("ctr")) {
      return MOCK_RESPONSES["nike ctr"];
    } else if (lowercaseInput.includes("creative")) {
      return MOCK_RESPONSES["creative performance"];
    } else if (lowercaseInput.includes("budget")) {
      return MOCK_RESPONSES["budget utilization"];
    } else if (lowercaseInput.includes("audience") || lowercaseInput.includes("converting")) {
      return MOCK_RESPONSES["converting audiences"];
    } else if (lowercaseInput.includes("tesla") || lowercaseInput.includes("improve")) {
      return MOCK_RESPONSES["improve tesla"];
    }
    
    return MOCK_RESPONSES["default"];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    handleSend();
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
            <div className="bg-gradient-to-r from-primary-orange to-vibrant-orange p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Assistant</h3>
                    <p className="text-sm opacity-90">Powered by Precise Intelligence</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

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
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary-orange text-white' 
                      : 'bg-light-gray text-dark-gray'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-light-gray p-3 rounded-lg">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-medium-gray rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-medium-gray rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-medium-gray rounded-full"
                      />
                    </div>
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

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your campaigns..."
                  className="flex-1 px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-primary-orange text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-primary-orange text-white p-2 rounded-lg hover:bg-vibrant-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}