import React from 'react';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  LineChart,
  Check,
  Sparkles,
  Shield,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface VisualExampleProps {
  type: string;
  content: string;
  stepNumber: number;
  tabType: 'media-buyer' | 'data-controller';
}

export default function HowItWorksVisualExample({ type, content, stepNumber, tabType }: VisualExampleProps) {
  // Default visual examples for each step if content is empty
  const getDefaultExample = () => {
    if (tabType === 'media-buyer') {
      switch (stepNumber) {
        case 1:
          return (
            <div className="bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-xl p-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-dark-gray mb-4">Connected Platforms</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                    <span className="font-medium">Google DV360</span>
                    <span className="text-sm text-brand-green">✓ Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                    <span className="font-medium">The Trade Desk</span>
                    <span className="text-sm text-brand-green">✓ Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                    <span className="font-medium">Amazon DSP</span>
                    <span className="text-sm text-brand-green">✓ Connected</span>
                  </div>
                  <div className="mt-4 p-4 bg-electric-blue/10 rounded-lg">
                    <div className="text-sm font-medium text-dark-gray mb-1">AI Status</div>
                    <div className="text-xs text-medium-gray">Learning from 127 campaigns...</div>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case 2:
          return (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-dark-gray mb-4">AI Insights Dashboard</h4>
              <div className="space-y-4">
                <div className="p-4 border border-warm-coral rounded-lg bg-warm-coral/5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-warm-coral" />
                    <span className="text-sm font-medium text-dark-gray">Creative Fatigue Alert</span>
                  </div>
                  <p className="text-sm text-medium-gray mb-2">
                    "Nike_Summer_V2" showing 34% CTR decline over 7 days
                  </p>
                  <button className="text-sm text-warm-coral font-medium">View Recommendations →</button>
                </div>
                <div className="p-4 border border-brand-green rounded-lg bg-brand-green/5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                    <span className="text-sm font-medium text-dark-gray">Arbitrage Opportunity</span>
                  </div>
                  <p className="text-sm text-medium-gray mb-2">
                    Shift $25K from Meta to TTD for 2.1x better CAC
                  </p>
                  <button className="text-sm text-brand-green font-medium">Execute Transfer →</button>
                </div>
                <div className="p-4 border border-electric-blue rounded-lg bg-electric-blue/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-electric-blue" />
                    <span className="text-sm font-medium text-dark-gray">CAC Forecast</span>
                  </div>
                  <p className="text-sm text-medium-gray">
                    Week 1: $45 → Week 4: $52 (±$3 confidence)
                  </p>
                </div>
              </div>
            </div>
          );
        
        case 3:
          return (
            <div className="bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-xl p-6">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-electric-blue" />
                  </div>
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-light-gray rounded-lg p-3">
                    <p className="text-sm text-medium-gray mb-1">You:</p>
                    <p className="text-sm">"Why is my CAC increasing this week?"</p>
                  </div>
                  <div className="bg-electric-blue/5 rounded-lg p-3">
                    <p className="text-sm text-medium-gray mb-1">AI:</p>
                    <p className="text-sm">Three factors: 1) Creative fatigue on top 3 ads (42% of spend), 2) Increased CPMs on Meta (+18%), 3) Lower match rates on LiveRamp segments. Recommend refreshing creatives and shifting 30% budget to TTD.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h5 className="text-sm font-medium text-dark-gray mb-3">Quick Actions</h5>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-brand-green/10 rounded-lg text-sm font-medium text-brand-green hover:bg-brand-green/20 transition-colors">
                    Execute Budget Reallocation →
                  </button>
                  <button className="w-full text-left p-3 bg-electric-blue/10 rounded-lg text-sm font-medium text-electric-blue hover:bg-electric-blue/20 transition-colors">
                    Launch Creative A/B Test →
                  </button>
                </div>
              </div>
            </div>
          );
        
        default:
          return null;
      }
    } else {
      // Data controller examples
      switch (stepNumber) {
        case 1:
          return (
            <div className="bg-light-gray rounded-xl p-8">
              <pre className="text-sm text-dark-gray overflow-x-auto">
{`// Deploy with one command
precise deploy --mode=federated

// Set query governance rules
precise.governance({
  allowedQueries: ['aggregate', 'cohort'],
  minAggregationSize: 1000,
  differentialPrivacy: {
    epsilon: 1.0,
    delta: 1e-5
  }
});`}
              </pre>
            </div>
          );
        
        case 2:
          return (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-dark-gray mb-4">Market Intelligence Dashboard</h4>
              <div className="space-y-4">
                <div className="p-4 border border-brand-green rounded-lg bg-brand-green/5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                    <span className="text-sm font-medium text-dark-gray">High Demand Alert</span>
                  </div>
                  <p className="text-sm text-medium-gray mb-2">
                    "Fitness enthusiasts" seeing 340% increased demand
                  </p>
                  <div className="text-xs text-brand-green">Current pricing 42% below market</div>
                </div>
                <div className="p-4 border border-electric-blue rounded-lg bg-electric-blue/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-electric-blue" />
                    <span className="text-sm font-medium text-dark-gray">Enhancement Opportunity</span>
                  </div>
                  <p className="text-sm text-medium-gray">
                    Add "purchase intent" signals to increase value by 3.2x
                  </p>
                </div>
                <div className="mt-4 p-4 bg-light-gray rounded-lg">
                  <div className="text-sm font-medium text-dark-gray mb-2">Your Position</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-medium-gray">Market Rank</span>
                    <span className="font-medium">#3 of 47</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-medium-gray">Quality Score</span>
                    <span className="font-medium">94/100</span>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case 3:
          return (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h4 className="font-semibold text-dark-gray mb-4">Revenue Analytics</h4>
              <div className="text-3xl font-bold text-dark-gray mb-2">$127,493</div>
              <div className="text-sm text-brand-green mb-6">+47% vs last month</div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-medium-gray">Nike Campaign Impact</span>
                    <span className="font-medium text-dark-gray">$34,230</span>
                  </div>
                  <div className="text-xs text-medium-gray">
                    Your data reduced their CAC by 23%
                  </div>
                  <div className="w-full bg-light-gray rounded-full h-2 mt-2">
                    <div className="bg-brand-green h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-medium-gray">Adidas Incrementality Test</span>
                    <span className="font-medium text-dark-gray">$28,120</span>
                  </div>
                  <div className="text-xs text-medium-gray">
                    Proved 2.3x ROAS improvement
                  </div>
                  <div className="w-full bg-light-gray rounded-full h-2 mt-2">
                    <div className="bg-electric-blue h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-silk-gray">
                <div className="flex justify-between text-sm">
                  <span className="text-medium-gray">Next payout</span>
                  <span className="font-medium text-dark-gray">Friday, $31,847</span>
                </div>
              </div>
            </div>
          );
        
        default:
          return null;
      }
    }
  };

  // If content is provided, try to parse and render it
  if (content && content.trim()) {
    try {
      const parsedContent = JSON.parse(content);
      
      if (type === 'dashboard') {
        return <div className="bg-white rounded-xl shadow-lg p-6">{parsedContent}</div>;
      }
      
      if (type === 'code') {
        return (
          <div className="bg-light-gray rounded-xl p-8">
            <pre className="text-sm text-dark-gray overflow-x-auto">{parsedContent}</pre>
          </div>
        );
      }
      
      if (type === 'chart') {
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
          </div>
        );
      }
      
      // Custom type
      return <div dangerouslySetInnerHTML={{ __html: parsedContent }} />;
    } catch {
      // If not valid JSON, try rendering as HTML
      if (type === 'code') {
        return (
          <div className="bg-light-gray rounded-xl p-8">
            <pre className="text-sm text-dark-gray overflow-x-auto">{content}</pre>
          </div>
        );
      }
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  }

  // Return default example based on step
  return getDefaultExample();
}