import Link from "next/link";
import { Code, Zap, Shield, BookOpen, Github, ArrowRight } from "lucide-react";

const apiEndpoints = [
  {
    method: "POST",
    path: "/api/v1/events",
    description: "Ingest real-time events from DSPs and pixels"
  },
  {
    method: "POST",
    path: "/api/v1/events/batch",
    description: "Bulk ingest up to 1000 events"
  },
  {
    method: "POST",
    path: "/api/v1/metrics",
    description: "Update campaign performance metrics"
  },
  {
    method: "GET",
    path: "/api/v1/attribution/:campaignId",
    description: "Get real-time attribution data"
  },
  {
    method: "POST",
    path: "/api/v1/query",
    description: "Flexible data queries with filters"
  },
  {
    method: "POST",
    path: "/api/v1/webhooks",
    description: "Register webhooks for real-time alerts"
  }
];

const sdks = [
  {
    name: "Python",
    install: "pip install precise-ai",
    icon: "🐍"
  },
  {
    name: "Node.js",
    install: "npm install @precise-ai/sdk",
    icon: "📦"
  },
  {
    name: "Go",
    install: "go get github.com/precise-ai/go-sdk",
    icon: "🔵"
  }
];

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Code className="w-6 h-6 text-electric-blue" />
            <h1 className="text-4xl font-bold text-dark-gray">API Documentation</h1>
          </div>
          
          <p className="text-xl text-medium-gray mb-8 max-w-3xl">
            Everything you need to integrate Precise.ai into your advertising stack. 
            Real-time APIs designed for scale.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/docs/api/getting-started"
              className="inline-flex items-center gap-2 bg-dark-gray text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="https://github.com/precise-ai/examples"
              className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              View Examples
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-dark-gray">Quick Start</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-electric-blue" />
                </div>
                <h3 className="font-semibold">1. Get API Key</h3>
              </div>
              <p className="text-medium-gray mb-4">
                Sign up and generate your API key from the dashboard
              </p>
              <code className="text-sm bg-gray-900 text-green-400 px-3 py-1 rounded">
                Bearer YOUR_API_KEY
              </code>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-electric-blue" />
                </div>
                <h3 className="font-semibold">2. Install SDK</h3>
              </div>
              <p className="text-medium-gray mb-4">
                Choose your preferred language
              </p>
              <div className="space-y-2">
                {sdks.map(sdk => (
                  <div key={sdk.name} className="flex items-center gap-2 text-sm">
                    <span>{sdk.icon}</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {sdk.install}
                    </code>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-electric-blue" />
                </div>
                <h3 className="font-semibold">3. Start Sending</h3>
              </div>
              <p className="text-medium-gray mb-4">
                Push your first event in seconds
              </p>
              <div className="text-sm space-y-1">
                <div className="text-green-600">✓ 99.9% Uptime SLA</div>
                <div className="text-green-600">✓ &lt;50ms Response</div>
                <div className="text-green-600">✓ Auto-retry Logic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-dark-gray">Core Endpoints</h2>
          
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <Link
                key={index}
                href={`/docs/api/${endpoint.path.split('/').pop()}`}
                className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-electric-blue hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`
                      px-3 py-1 rounded text-sm font-mono font-medium
                      ${endpoint.method === 'POST' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                    `}>
                      {endpoint.method}
                    </span>
                    <code className="text-dark-gray font-mono">
                      {endpoint.path}
                    </code>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <p className="mt-2 text-medium-gray">
                  {endpoint.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-dark-gray">Example: Push Campaign Metrics</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`curl -X POST https://api.precise.ai/v1/metrics \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "campaign_id": "camp_123",
    "timestamp": "2025-05-26T10:00:00Z",
    "metrics": {
      "impressions": 150000,
      "clicks": 3200,
      "conversions": 120,
      "spend": 2500.00,
      "revenue": 8500.00
    }
  }'

# Response
{
  "id": "metric_abc123",
  "status": "accepted",
  "timestamp": "2025-05-26T10:00:01Z"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-dark-gray">Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/docs/api/authentication"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-electric-blue transition-colors"
            >
              <Shield className="w-8 h-8 text-electric-blue mb-4" />
              <h3 className="font-semibold mb-2">Authentication</h3>
              <p className="text-medium-gray text-sm">
                API keys, rate limits, and security best practices
              </p>
            </Link>
            
            <Link
              href="/docs/api/webhooks"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-electric-blue transition-colors"
            >
              <Zap className="w-8 h-8 text-electric-blue mb-4" />
              <h3 className="font-semibold mb-2">Webhooks</h3>
              <p className="text-medium-gray text-sm">
                Real-time notifications for campaign events
              </p>
            </Link>
            
            <Link
              href="/docs/api/errors"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-electric-blue transition-colors"
            >
              <BookOpen className="w-8 h-8 text-electric-blue mb-4" />
              <h3 className="font-semibold mb-2">Error Handling</h3>
              <p className="text-medium-gray text-sm">
                Error codes, retry logic, and troubleshooting
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-dark-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-lg mb-8 text-gray-300">
            Join developers building the future of advertising intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="bg-white text-dark-gray px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get API Key
            </Link>
            <Link
              href="https://github.com/precise-ai/examples"
              className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-dark-gray transition-all"
            >
              View Examples
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}