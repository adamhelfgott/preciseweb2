import Link from "next/link";
import { Building2, Users, Target, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-dark-gray">
            Building the Intelligence Layer for Advertising
          </h1>
          <p className="text-xl text-medium-gray mb-8">
            Precise.ai connects the fragmented advertising ecosystem, enabling 
            privacy-preserving collaboration that drives better outcomes for everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-dark-gray">Our Mission</h2>
              <p className="text-lg text-medium-gray mb-4">
                We believe advertising should be intelligent, not invasive. 
                By creating a privacy-first intelligence layer, we enable:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-green mt-1">✓</span>
                  <span>Better outcomes with less data exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-green mt-1">✓</span>
                  <span>Fair value distribution across the ecosystem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-green mt-1">✓</span>
                  <span>Real-time optimization without compromising privacy</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-electric-blue to-bright-purple rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">$200B+</h3>
              <p className="text-lg mb-4">Wasted annually on inefficient advertising</p>
              <p className="text-sm opacity-90">
                We're on a mission to eliminate this waste through intelligent, 
                privacy-preserving technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-gray">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">
                Data never moves. Only insights flow.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="font-semibold mb-2">Performance Driven</h3>
              <p className="text-sm text-gray-600">
                Every decision backed by real results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bright-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-bright-purple" />
              </div>
              <h3 className="font-semibold mb-2">Ecosystem Minded</h3>
              <p className="text-sm text-gray-600">
                We succeed when everyone succeeds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-coral/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-warm-coral" />
              </div>
              <h3 className="font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-sm text-gray-600">
                Built for scale, security, and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-gray">Leadership Team</h2>
          <p className="text-center text-gray-600 mb-12">
            Veterans from Google, Meta, Amazon, and leading ad tech companies
          </p>
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-lg text-gray-600">
              Our team brings decades of experience building advertising technology at scale. 
              We've seen the problems firsthand and are committed to solving them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-gray">
            Ready to Transform Your Advertising?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the companies building the future of intelligent advertising
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-primary">
              Get Started
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}