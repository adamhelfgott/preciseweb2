import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, Code, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react";
import InteractiveA2ADiagram from "@/components/marketing/InteractiveA2ADiagram";
import CodeTabs from "@/components/marketing/CodeTabs";

const codeExamples = [
  {
    label: "Python",
    code: `from precise_ai import PreciseClient

client = PreciseClient(api_key="your_key")

# Check creative fatigue in real-time
fatigue = client.check_creative_fatigue(
    creative_id="cr_123",
    campaign_id="camp_456"
)

if fatigue.score > 7:
    # Automatically pause and rotate
    client.pause_creative(creative_id)
    client.activate_variant(fatigue.recommended_variant)
    
    print(f"Rotated creative. Expected lift: {fatigue.expected_lift}%")`
  },
  {
    label: "Node.js",
    code: `import { PreciseAI } from '@precise-ai/sdk';

const precise = new PreciseAI({ apiKey: 'your_key' });

// Real-time bid enhancement
const enhanced = await precise.enhanceBid({
  impressionId: 'imp_123',
  segments: ['luxury_auto', 'high_income'],
  baseBid: 2.50
});

// Bid with confidence
if (enhanced.shouldBid) {
  dsp.bid(enhanced.recommendedBid);
  console.log(\`Bidding $\${enhanced.recommendedBid} (confidence: \${enhanced.confidence})\`);
}`
  },
  {
    label: "cURL",
    code: `# Check creative fatigue
curl -X POST https://api.precise.ai/v1/creative/fatigue \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "creative_id": "cr_123",
    "campaign_id": "camp_456",
    "check_cross_platform": true
  }'

# Response
{
  "fatigue_score": 8.5,
  "days_until_critical": 3,
  "recommended_action": "prepare_replacement",
  "suggested_variants": [...]
}`
  }
];

const features = [
  {
    icon: Brain,
    title: "Creative Fatigue Prediction",
    description: "Know 5 days before performance drops",
    metric: "30% less wasted spend",
    details: [
      "Cross-platform fatigue analysis",
      "AI-powered refresh recommendations",
      "Automatic creative rotation"
    ]
  },
  {
    icon: TrendingUp,
    title: "Incrementality Bidding",
    description: "Bid based on true incremental value",
    metric: "25% higher ROAS",
    details: [
      "Real-time MMM calculations",
      "Channel saturation detection",
      "Marginal value optimization"
    ]
  },
  {
    icon: Users,
    title: "Audience Arbitrage",
    description: "Find underpriced segments instantly",
    metric: "40% lower CPAs",
    details: [
      "Cross-DSP price comparison",
      "Quality-adjusted recommendations",
      "Automatic budget reallocation"
    ]
  }
];

const integrationSteps = [
  {
    step: "1",
    title: "Get API Key",
    description: "Sign up and generate your API key in 30 seconds"
  },
  {
    step: "2",
    title: "Install SDK",
    description: "Choose from Python, Node.js, Go, or use our REST API"
  },
  {
    step: "3",
    title: "Deploy Agent",
    description: "Use our templates or build custom integrations"
  },
  {
    step: "4",
    title: "See Results",
    description: "Watch your campaigns optimize in real-time"
  }
];

export default function AgentIntelligencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-electric-blue" />
            <span className="text-sm font-medium">Agent-to-Agent Intelligence</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-dark-gray">
            Make Your DSP{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-bright-purple">
              Intelligent
            </span>
          </h1>
          
          <p className="text-xl text-medium-gray mb-8 max-w-3xl mx-auto">
            Transform your DSP into a self-optimizing system with Precise.ai's cross-platform intelligence. 
            Real-time insights that no single platform can provide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs/api">
              <Button size="lg" className="w-full sm:w-auto">
                View API Docs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Live Demo
              </Button>
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-medium-gray">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-green" />
              <span>SOC2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-green" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-green" />
              <span>&lt;50ms Response Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Diagram */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              How Agent Intelligence Works
            </h2>
            <p className="text-lg text-medium-gray">
              Your DSPs become smarter by sharing insights through Precise.ai
            </p>
          </div>
          <InteractiveA2ADiagram />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              Intelligence That Drives Results
            </h2>
            <p className="text-lg text-medium-gray">
              Real-time insights that improve every bid decision
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <span className="text-sm font-medium text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                    {feature.metric}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-dark-gray">
                  {feature.title}
                </h3>
                <p className="text-medium-gray mb-4">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-medium-gray">
                      <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              Integration in Minutes
            </h2>
            <p className="text-lg text-medium-gray">
              Choose your language and get started with just a few lines of code
            </p>
          </div>
          
          <CodeTabs examples={codeExamples} />
        </div>
      </section>

      {/* Integration Steps */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              Start Optimizing in 4 Steps
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {integrationSteps.map((item, index) => (
              <div key={index} className="relative">
                {index < integrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-bright-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dark-gray">
                    {item.title}
                  </h3>
                  <p className="text-sm text-medium-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-black to-gray-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make Your DSP Smarter?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Join leading agencies and brands using Precise.ai to optimize billions in ad spend
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black"
              >
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}