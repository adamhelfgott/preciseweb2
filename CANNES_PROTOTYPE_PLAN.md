# Cannes Prototype Plan - Database-Driven Demo

## Goal
Create a compelling, database-driven prototype that feels real for Cannes demos, showcasing actual data flow, real campaign images, and live agent interactions.

## Phase 1: Database Setup (Day 1-2)

### 1.1 Supabase Project Setup
```bash
# Create Supabase project at https://app.supabase.com
# Get connection string and anon key
# Add to .env.local:
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### 1.2 Run Migrations
```bash
# Apply all migrations in order
npx supabase db push
```

### 1.3 Update DataService
- Remove NEXT_PUBLIC_MOCK_MODE flag
- Connect to real Supabase instance
- Test basic CRUD operations

## Phase 2: Realistic Data & Images (Day 3-4)

### 2.1 Campaign Creative Images
- Source high-quality ad creatives from:
  - Unsplash Business Collection
  - Real brand campaigns (with permission)
  - AI-generated professional ads
  
### 2.2 Enhanced Seed Data
```typescript
// seed-cannes-demo.ts
const campaigns = [
  {
    name: "BMW Summer Drive Event",
    creatives: [
      { url: "/creatives/bmw-summer-1.jpg", ctr: 2.3, fatigue_score: 3 },
      { url: "/creatives/bmw-summer-2.jpg", ctr: 1.8, fatigue_score: 7 },
      { url: "/creatives/bmw-summer-3.jpg", ctr: 2.1, fatigue_score: 5 }
    ],
    spend: 125000,
    conversions: 450,
    roas: 3.2
  },
  {
    name: "Nike Air Max Launch",
    creatives: [
      { url: "/creatives/nike-airmax-1.jpg", ctr: 3.1, fatigue_score: 2 },
      { url: "/creatives/nike-airmax-2.jpg", ctr: 2.9, fatigue_score: 8 }
    ],
    spend: 89000,
    conversions: 823,
    roas: 4.1
  }
  // ... more realistic campaigns
];
```

### 2.3 Data Controller Assets
- Real company logos
- Believable data asset descriptions
- Actual industry verticals

## Phase 3: Live Features (Day 5-6)

### 3.1 Campaign Images Display
```typescript
// Update CampaignsPage.tsx to show creative carousel
<div className="grid grid-cols-3 gap-4">
  {campaign.creatives.map((creative) => (
    <div key={creative.id} className="relative">
      <img 
        src={creative.url} 
        alt={creative.name}
        className="rounded-lg shadow-lg"
      />
      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded">
        CTR: {creative.ctr}%
      </div>
      {creative.fatigue_score > 7 && (
        <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
          ⚠️ Needs Refresh
        </div>
      )}
    </div>
  ))}
</div>
```

### 3.2 Real-time Activity Feed
- WebSocket connection to show live events
- Agent actions appear instantly
- Visual notifications for important events

## Phase 4: Demo DSP Agent (Day 7-8)

### 4.1 Simple Demo Agent
```python
# demo-dsp-agent.py
import time
import random
import requests
from datetime import datetime

class DemoDSPAgent:
    """Simulates a real DSP pushing data to Precise.ai"""
    
    def __init__(self, api_key, dsp_name="DV360"):
        self.api_key = api_key
        self.dsp_name = dsp_name
        self.api_base = "https://your-app.vercel.app/api/v1"
        
    def run_demo_scenario(self):
        """Run a compelling demo scenario"""
        
        # 1. Push performance metrics
        print(f"[{self.dsp_name}] Updating campaign performance...")
        self.push_metrics("BMW Summer Drive", {
            "impressions": random.randint(100000, 150000),
            "clicks": random.randint(2000, 3000),
            "spend": random.uniform(5000, 8000)
        })
        
        # 2. Detect creative fatigue
        time.sleep(2)
        print(f"[{self.dsp_name}] Checking creative fatigue...")
        fatigue = self.check_creative_fatigue("bmw-creative-2")
        if fatigue['score'] > 7:
            print(f"⚠️  Creative fatigue detected! Score: {fatigue['score']}")
            
        # 3. Get bid recommendation
        time.sleep(2)
        print(f"[{self.dsp_name}] Requesting bid optimization...")
        bid = self.get_bid_recommendation({
            "segments": ["luxury_auto", "high_income"],
            "base_bid": 2.50
        })
        print(f"✓ Recommended bid: ${bid['enhanced_bid']}")
```

### 4.2 Live Demo Script
1. Show empty campaign dashboard
2. Start DSP agent - data flows in
3. Creative fatigue alert appears
4. Budget automatically reallocates
5. Performance improves in real-time

## Phase 5: A2A Marketing Page (Day 9-10)

### 5.1 Create /agent-intelligence Page
```typescript
// app/(marketing)/agent-intelligence/page.tsx
export default function AgentIntelligencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Agent-to-Agent Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your DSP into an intelligent, self-optimizing system
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/docs/api">
              <Button size="lg">View API Docs</Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">Live Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Diagram */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <InteractiveA2ADiagram />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain />}
            title="Creative Intelligence"
            description="Predict fatigue 5 days early"
            metric="30% less wasted spend"
          />
          <FeatureCard
            icon={<TrendingUp />}
            title="Bid Optimization"
            description="Real-time incrementality"
            metric="25% higher ROAS"
          />
          <FeatureCard
            icon={<Users />}
            title="Audience Discovery"
            description="Find undervalued segments"
            metric="40% lower CPAs"
          />
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Integration in Minutes
          </h2>
          <CodeTabs examples={[
            {
              label: "Python",
              code: `from precise_ai import PreciseClient

client = PreciseClient(api_key="your_key")

# Check creative fatigue
fatigue = client.check_creative_fatigue(
    creative_id="cr_123",
    campaign_id="camp_456"
)

if fatigue.score > 7:
    client.pause_creative(creative_id)
    client.activate_variant(fatigue.recommended_variant)`
            },
            {
              label: "Node.js",
              code: `import { PreciseAI } from '@precise-ai/sdk';

const precise = new PreciseAI({ apiKey: 'your_key' });

// Real-time bid enhancement
const enhanced = await precise.enhanceBid({
  impressionId: 'imp_123',
  segments: ['luxury_auto'],
  baseBid: 2.50
});

// Bid with confidence
dsp.bid(enhanced.recommendedBid);`
            }
          ]} />
        </div>
      </section>
    </div>
  );
}
```

### 5.2 Interactive Demo Component
```typescript
// components/InteractiveA2ADiagram.tsx
export function InteractiveA2ADiagram() {
  const [activeFlow, setActiveFlow] = useState('creative-fatigue');
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveFlow('creative-fatigue')}>
          Creative Optimization
        </button>
        <button onClick={() => setActiveFlow('bid-enhancement')}>
          Bid Enhancement
        </button>
        <button onClick={() => setActiveFlow('audience-discovery')}>
          Audience Discovery
        </button>
      </div>
      
      <AnimatedFlowDiagram flow={activeFlow} />
      
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">What's Happening:</h3>
        <FlowExplanation flow={activeFlow} />
      </div>
    </div>
  );
}
```

## Phase 6: Beautiful API Docs (Day 11-12)

### 6.1 Interactive API Documentation
- Use Swagger UI or custom React components
- Live API testing in browser
- Copy-paste ready examples
- Language switcher (Python, Node, Go, cURL)

### 6.2 Getting Started Wizard
```typescript
// app/docs/getting-started/page.tsx
export function GettingStartedWizard() {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  
  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 && <CreateAPIKey onComplete={setApiKey} />}
      {step === 2 && <InstallSDK language="python" />}
      {step === 3 && <FirstAPICall apiKey={apiKey} />}
      {step === 4 && <DeployAgent />}
    </div>
  );
}
```

## Demo Day Checklist

### Pre-Demo Setup
- [ ] Supabase database populated with realistic data
- [ ] Campaign images uploaded and displaying
- [ ] Demo DSP agent tested and ready
- [ ] Live activity feed working
- [ ] A2A marketing page deployed

### Demo Flow (10 minutes)
1. **Current State** (2 min)
   - Show media buyer struggling with multiple DSP dashboards
   - Point out missed optimization opportunities

2. **Precise.ai Solution** (3 min)
   - Show unified dashboard with real campaigns
   - Highlight cross-platform insights

3. **Live Agent Demo** (4 min)
   - Start DSP agent
   - Show real-time data flowing in
   - Creative fatigue alert appears
   - Automatic optimization happens
   - Performance improves

4. **Developer Experience** (1 min)
   - Show simple integration code
   - Point to beautiful API docs

### Backup Plans
1. **If Live Demo Fails**: Pre-recorded video backup
2. **If Database is Slow**: Local SQLite fallback
3. **If Agent Crashes**: Manual data push buttons

## Quick Wins for Impact

1. **Notification Toasts**: When agent pushes data
2. **Animated Numbers**: Count up when metrics update  
3. **Status Indicators**: Green dots for active agents
4. **Sound Effects**: Subtle chime for important events
5. **Mobile View**: Ensure perfect responsive design

## Post-Cannes Roadmap
1. Production database security
2. Real DSP partnerships
3. Enterprise onboarding flow
4. Advanced ML models
5. Regulatory compliance

This plan gets you to a compelling, "feels real" demo that will wow at Cannes while setting up the foundation for the actual product.