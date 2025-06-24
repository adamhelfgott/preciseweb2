import { client } from '../lib/client'

// Helper to create documents
async function createDocument(doc: any) {
  try {
    const result = await client.create(doc)
    console.log(`✅ Created ${doc._type}: ${doc._id || result._id}`)
    return result
  } catch (error) {
    console.error(`❌ Failed to create ${doc._type}:`, error)
    throw error
  }
}

// Clear existing data (optional - comment out if you want to keep existing data)
async function clearExistingData() {
  console.log('🧹 Clearing existing data...')
  const types = ['heroSection', 'logoBar', 'howItWorksSection', 'valueProposition', 'teamMember', 'ctaSection', 'navigation', 'footer', 'caseStudy', 'pageHero', 'processStep', 'benefitCard', 'faq', 'testimonial', 'calculatorSection', 'integrationPartner']
  
  for (const type of types) {
    try {
      await client.delete({ query: `*[_type == "${type}"]` })
      console.log(`✅ Cleared ${type}`)
    } catch (error) {
      console.log(`⚠️  No ${type} to clear`)
    }
  }
}

async function seedData() {
  console.log('🌱 Starting comprehensive data seed...')
  
  // Clear existing data first
  await clearExistingData()
  
  // Hero Section
  await createDocument({
    _type: 'heroSection',
    _id: 'hero-main',
    headline: 'Verified Activation for Modern Marketing',
    subheadline: 'Where trusted data meets exceptional performance. Precise enables secure data collaboration that drives real results — with cryptographic validation of every action, from source to outcome.',
    primaryButtonText: 'Activate Campaigns',
    primaryButtonHref: '/get-started',
    secondaryButtonText: 'Prove Value',
    secondaryButtonHref: '/how-it-works',
  })

  // Logo Bar
  await createDocument({
    _type: 'logoBar',
    _id: 'logo-bar-main',
    title: 'Trusted by leaders across the ecosystem',
    logos: [
      { 
        _key: 'logo1',
        company: 'Walmart', 
        logo: { _type: 'image', asset: { _ref: 'image-placeholder-walmart' } } 
      },
      { 
        _key: 'logo2',
        company: 'Disney', 
        logo: { _type: 'image', asset: { _ref: 'image-placeholder-disney' } } 
      },
      { 
        _key: 'logo3',
        company: 'Nike', 
        logo: { _type: 'image', asset: { _ref: 'image-placeholder-nike' } } 
      },
      { 
        _key: 'logo4',
        company: 'Netflix', 
        logo: { _type: 'image', asset: { _ref: 'image-placeholder-netflix' } } 
      },
      { 
        _key: 'logo5',
        company: 'Spotify', 
        logo: { _type: 'image', asset: { _ref: 'image-placeholder-spotify' } } 
      },
    ],
  })

  // How It Works Section
  await createDocument({
    _type: 'howItWorksSection',
    _id: 'how-it-works-main',
    title: 'How Precise Works',
    subtitle: 'A better way to collaborate with data while maintaining privacy and control',
    steps: [
      {
        _key: 'step1',
        number: 1,
        title: 'Connect Your Systems',
        description: 'Integrate your existing data infrastructure without moving or copying sensitive information',
        icon: 'database',
      },
      {
        _key: 'step2',
        number: 2,
        title: 'Set Governance Rules',
        description: 'Define exactly how your data can be used with granular controls and privacy settings',
        icon: 'shield',
      },
      {
        _key: 'step3',
        number: 3,
        title: 'Enable Collaboration',
        description: 'Let authorized partners query your data through secure, privacy-preserving computation',
        icon: 'users',
      },
      {
        _key: 'step4',
        number: 4,
        title: 'Track Value Creation',
        description: 'See exactly how your data drives results with cryptographic proof of every interaction',
        icon: 'trending-up',
      },
    ],
  })

  // Value Propositions
  const valueProps = [
    {
      _id: 'value-prop-privacy',
      title: 'Privacy-First Architecture',
      description: 'Your data never leaves your control. Process queries locally with differential privacy and secure multi-party computation.',
      icon: 'lock',
      benefits: [
        { _key: 'b1', text: 'SOC2 Type II certified' },
        { _key: 'b2', text: 'GDPR & CCPA compliant' },
        { _key: 'b3', text: 'Zero-trust security model' },
      ],
    },
    {
      _id: 'value-prop-performance',
      title: 'Proven Performance',
      description: 'Drive measurable results with AI-powered optimization and real-time campaign intelligence.',
      icon: 'trending-up',
      benefits: [
        { _key: 'b1', text: '47% average CAC reduction' },
        { _key: 'b2', text: '3.2x ROAS improvement' },
        { _key: 'b3', text: '92% forecast accuracy' },
      ],
    },
    {
      _id: 'value-prop-fairvalue',
      title: 'Fair Value Distribution',
      description: 'Get paid based on actual impact with our Valence Enhanced Shapley attribution system.',
      icon: 'dollar-sign',
      benefits: [
        { _key: 'b1', text: 'Cryptographic proof of value' },
        { _key: 'b2', text: 'Weekly automated payments' },
        { _key: 'b3', text: 'Transparent attribution' },
      ],
    },
  ]

  for (const prop of valueProps) {
    await createDocument({ _type: 'valueProposition', ...prop })
  }

  // Team Members
  const teamMembers = [
    {
      _id: 'team-jesse-redniss',
      name: 'Jesse Redniss',
      role: 'CEO',
      background: ['Qonsent', 'WarnerMedia'],
      image: { _type: 'image', asset: { _ref: 'image-team-jesse' } },
      linkedin: 'https://www.linkedin.com/in/jesse-redniss-8a49691/',
      order: 1,
    },
    {
      _id: 'team-adam-helfgott',
      name: 'Adam Helfgott',
      role: 'Co-Founder',
      background: ['MadHive'],
      image: { _type: 'image', asset: { _ref: 'image-team-adam' } },
      linkedin: 'https://www.linkedin.com/in/adamhelfgott',
      order: 2,
    },
    {
      _id: 'team-kevin-oneill',
      name: "Kevin O'Neill",
      role: 'Chief Product Officer',
      background: ['DNAStack', 'Splash'],
      image: { _type: 'image', asset: { _ref: 'image-team-kevin' } },
      linkedin: 'https://www.linkedin.com/in/kevoneill',
      order: 3,
    },
    {
      _id: 'team-ed-laws',
      name: 'Ed Laws',
      role: 'Chief Operations Officer',
      background: ['InMobi', 'Yahoo'],
      image: { _type: 'image', asset: { _ref: 'image-team-ed' } },
      linkedin: 'https://www.linkedin.com/in/edwardlaws',
      order: 4,
    },
    {
      _id: 'team-justin-gutschmidt',
      name: 'Justin Gutschmidt',
      role: 'Chief Revenue Officer',
      background: ['Premion'],
      image: { _type: 'image', asset: { _ref: 'image-team-justin' } },
      linkedin: 'https://www.linkedin.com/in/jgutschmidt',
      order: 5,
    },
    {
      _id: 'team-matt-barlin',
      name: 'Matt Barlin',
      role: 'Chief Science Officer',
      background: ['Valence'],
      image: { _type: 'image', asset: { _ref: 'image-team-matt' } },
      linkedin: 'https://www.linkedin.com/in/matthew-barlin',
      order: 6,
    },
    {
      _id: 'team-seth-redniss',
      name: 'Seth Redniss',
      role: 'General Counsel',
      background: ['Redniss Law'],
      image: { _type: 'image', asset: { _ref: 'image-team-seth' } },
      linkedin: 'https://www.linkedin.com/in/seth-redniss-005b7b14',
      order: 7,
    },
    {
      _id: 'team-greg-couture',
      name: 'Greg Couture',
      role: 'Technology',
      background: ['NBCU', 'Qonsent'],
      image: { _type: 'image', asset: { _ref: 'image-team-greg-c' } },
      linkedin: 'https://www.linkedin.com/in/greg-couture-785551',
      order: 8,
    },
    {
      _id: 'team-greg-pier',
      name: 'Greg Pier',
      role: 'Implementation & Solutions Design',
      background: ['Qonsent'],
      image: { _type: 'image', asset: { _ref: 'image-team-greg-p' } },
      linkedin: null,
      order: 9,
    },
    {
      _id: 'team-angelica-haase',
      name: 'Angelica Haase',
      role: 'Client Operations',
      background: ['Qonsent'],
      image: { _type: 'image', asset: { _ref: 'image-team-angelica' } },
      linkedin: 'https://www.linkedin.com/in/angelica-haase-mba-815a93143/',
      order: 10,
    },
    {
      _id: 'team-mary-sculley',
      name: 'Mary Sculley',
      role: 'Sales & Impact',
      background: ['NBCU', 'WarnerMedia'],
      image: { _type: 'image', asset: { _ref: 'image-team-mary' } },
      linkedin: 'https://www.linkedin.com/in/mary-sculley-48a18b17',
      order: 11,
    },
  ]

  for (const member of teamMembers) {
    await createDocument({ _type: 'teamMember', ...member })
  }

  // CTA Section
  await createDocument({
    _type: 'ctaSection',
    _id: 'cta-main',
    headline: 'Ready to transform your data strategy?',
    subheadline: 'Join leading brands already using Precise to unlock the full value of their data assets.',
    primaryButtonText: 'Start Free Trial',
    primaryButtonHref: '/get-started',
    secondaryButtonText: 'Schedule Demo',
    secondaryButtonHref: '/contact',
  })

  // Navigation
  await createDocument({
    _type: 'navigation',
    _id: 'nav-main',
    links: [
      { _key: 'nav1', label: 'How it works', href: '/how-it-works' },
      { _key: 'nav2', label: 'For data sellers', href: '/data-sellers' },
      { _key: 'nav3', label: 'For media buyers', href: '/media-buyers' },
      { _key: 'nav4', label: 'For measurement', href: '/measurement-partners' },
      { _key: 'nav5', label: 'For platforms', href: '/platforms' },
      { _key: 'nav6', label: 'Company', href: '/company' },
    ],
  })

  // Footer
  await createDocument({
    _type: 'footer',
    _id: 'footer-main',
    brandName: 'Precise',
    brandTagline: 'Infrastructure for the AI Data Economy',
    sections: [
      {
        _key: 'section1',
        title: 'Product',
        links: [
          { _key: 'link1', label: 'How it works', href: '/how-it-works' },
          { _key: 'link2', label: 'For data controllers', href: '/data-owners' },
          { _key: 'link3', label: 'For advertisers', href: '/advertisers' },
          { _key: 'link4', label: 'Case studies', href: '/case-studies' },
          { _key: 'link5', label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        _key: 'section2',
        title: 'Developers',
        links: [
          { _key: 'link1', label: 'Documentation', href: '/developers' },
          { _key: 'link2', label: 'API Reference', href: '/developers/api' },
          { _key: 'link3', label: 'SDKs', href: '/developers/sdks' },
          { _key: 'link4', label: 'Examples', href: '/developers/examples' },
        ],
      },
      {
        _key: 'section3',
        title: 'Company',
        links: [
          { _key: 'link1', label: 'About', href: '/company' },
          { _key: 'link2', label: 'Blog', href: '/blog' },
          { _key: 'link3', label: 'Careers', href: '/careers' },
          { _key: 'link4', label: 'Contact', href: '/contact' },
        ],
      },
      {
        _key: 'section4',
        title: 'Legal',
        links: [
          { _key: 'link1', label: 'Privacy Policy', href: '/privacy' },
          { _key: 'link2', label: 'Terms of Service', href: '/terms' },
          { _key: 'link3', label: 'Security', href: '/security' },
          { _key: 'link4', label: 'Compliance', href: '/compliance' },
        ],
      },
    ],
    socialLinks: [
      { _key: 'social1', platform: 'Twitter', url: 'https://twitter.com/precise', label: 'Twitter' },
      { _key: 'social2', platform: 'GitHub', url: 'https://github.com/precise', label: 'GitHub' },
      { _key: 'social3', platform: 'LinkedIn', url: 'https://linkedin.com/company/precise', label: 'LinkedIn' },
    ],
    securityBadges: [
      { _key: 'badge1', label: 'SOC 2 Type II' },
      { _key: 'badge2', label: 'GDPR Compliant' },
      { _key: 'badge3', label: 'ISO 27001' },
      { _key: 'badge4', label: 'CCPA Compliant' },
    ],
  })

  // Case Studies
  const caseStudies = [
    {
      _id: 'case-study-nike',
      client: 'Nike',
      logo: { _type: 'image', asset: { _ref: 'image-logo-nike' } },
      industry: 'Retail',
      challenge: 'Nike needed to reduce customer acquisition costs while maintaining campaign performance across multiple channels.',
      solution: 'Implemented Precise AI-powered optimization with multi-touch attribution and creative fatigue detection.',
      results: [
        { _key: 'r1', metric: '52% CAC reduction', description: 'Lowered customer acquisition costs' },
        { _key: 'r2', metric: '3.4x ROAS', description: 'Improved return on ad spend' },
        { _key: 'r3', metric: '27% higher LTV', description: 'Increased customer lifetime value' },
      ],
      testimonial: {
        quote: "Precise's AI copilot transformed how we manage campaigns. We're seeing performance improvements we didn't think were possible.",
        author: 'Sarah Chen',
        role: 'VP of Digital Marketing',
        company: 'Nike',
      },
      image: { _type: 'image', asset: { _ref: 'image-case-study-nike' } },
      slug: { current: 'nike-reduces-cac-52-percent' },
    },
    {
      _id: 'case-study-spotify',
      client: 'Spotify',
      logo: { _type: 'image', asset: { _ref: 'image-logo-spotify' } },
      industry: 'Entertainment',
      challenge: 'Spotify wanted to better understand the incremental impact of their advertising campaigns.',
      solution: 'Deployed incrementality testing with holdout groups and Valence Enhanced Shapley attribution.',
      results: [
        { _key: 'r1', metric: '41% lift validation', description: 'Proved true campaign impact' },
        { _key: 'r2', metric: '2.8x efficiency', description: 'Improved media efficiency' },
        { _key: 'r3', metric: '$4.2M saved', description: 'Annual cost savings' },
      ],
      testimonial: {
        quote: "Finally, we have mathematical proof of what's actually driving results. The transparency is game-changing.",
        author: 'Marcus Johnson',
        role: 'Director of Performance Marketing',
        company: 'Spotify',
      },
      image: { _type: 'image', asset: { _ref: 'image-case-study-spotify' } },
      slug: { current: 'spotify-proves-41-percent-lift' },
    },
    {
      _id: 'case-study-walmart',
      client: 'Walmart',
      logo: { _type: 'image', asset: { _ref: 'image-logo-walmart' } },
      industry: 'Retail',
      challenge: 'Walmart needed to optimize budget allocation across 15+ DSPs while maintaining privacy compliance.',
      solution: 'Implemented DSP arbitrage system with federated learning for privacy-preserving optimization.',
      results: [
        { _key: 'r1', metric: '2.3x performance', description: 'Through intelligent arbitrage' },
        { _key: 'r2', metric: '100% compliant', description: 'Maintained privacy standards' },
        { _key: 'r3', metric: '18% budget saved', description: 'Reduced wasted spend' },
      ],
      testimonial: {
        quote: "Precise lets us optimize across all our platforms without compromising on privacy. It's the best of both worlds.",
        author: 'Jennifer Martinez',
        role: 'SVP of Digital Innovation',
        company: 'Walmart',
      },
      image: { _type: 'image', asset: { _ref: 'image-case-study-walmart' } },
      slug: { current: 'walmart-optimizes-15-dsps' },
    },
  ]

  for (const study of caseStudies) {
    await createDocument({ _type: 'caseStudy', ...study })
  }

  // Page Heroes
  const pageHeroes = [
    {
      _id: 'hero-data-owners',
      page: 'data-owners',
      headline: 'Your Data, Your Control, Your Revenue',
      subheadline: 'Turn your first-party data into a sustainable revenue stream without becoming a data broker. Stay compliant, maintain control, and get paid fairly for the value you create.',
      primaryButtonText: 'Calculate Your Revenue',
      primaryButtonHref: '#calculator',
      secondaryButtonText: 'See How It Works',
      secondaryButtonHref: '#how-it-works',
    },
    {
      _id: 'hero-advertisers',
      page: 'advertisers',
      headline: 'AI-Powered AdOps Command Center',
      subheadline: 'Reduce CAC by 47% with predictive optimization, creative fatigue detection, and multi-DSP arbitrage. Your AI copilot for campaign performance.',
      primaryButtonText: 'See Live Demo',
      primaryButtonHref: '/demo',
      secondaryButtonText: 'View Case Studies',
      secondaryButtonHref: '/case-studies',
    },
  ]

  for (const hero of pageHeroes) {
    await createDocument({ _type: 'pageHero', ...hero })
  }

  // Process Steps for Data Owners
  const processSteps = [
    {
      _id: 'process-step-1',
      stepNumber: 1,
      title: 'Deploy Infrastructure',
      description: 'Install our federated learning nodes in your environment. Your data never moves.',
      icon: 'server',
      details: [
        { _key: 'd1', text: 'One-command deployment' },
        { _key: 'd2', text: 'Runs in your cloud' },
        { _key: 'd3', text: 'SOC2 certified' },
      ],
    },
    {
      _id: 'process-step-2',
      stepNumber: 2,
      title: 'Set Governance',
      description: 'Define exactly how your data can be queried with granular privacy controls.',
      icon: 'shield',
      details: [
        { _key: 'd1', text: 'Differential privacy' },
        { _key: 'd2', text: 'Query approval rules' },
        { _key: 'd3', text: 'Audit logging' },
      ],
    },
    {
      _id: 'process-step-3',
      stepNumber: 3,
      title: 'Enable Queries',
      description: 'Advertisers can now query your data through privacy-preserving computation.',
      icon: 'search',
      details: [
        { _key: 'd1', text: 'No raw data access' },
        { _key: 'd2', text: 'Aggregated insights only' },
        { _key: 'd3', text: 'You approve each query type' },
      ],
    },
    {
      _id: 'process-step-4',
      stepNumber: 4,
      title: 'Track Value',
      description: 'See exactly how your data improves campaign performance with cryptographic proof.',
      icon: 'trending-up',
      details: [
        { _key: 'd1', text: 'Valence Enhanced Shapley' },
        { _key: 'd2', text: 'Real impact metrics' },
        { _key: 'd3', text: 'Weekly payments' },
      ],
    },
  ]

  for (const step of processSteps) {
    await createDocument({ _type: 'processStep', ...step })
  }

  // Benefits for Data Owners
  const dataOwnerBenefits = [
    {
      _id: 'benefit-control',
      title: 'Maintain Full Control',
      description: 'Your data never leaves your servers. You approve every query type and maintain controller status under GDPR/CCPA.',
      icon: 'lock',
      order: 1,
    },
    {
      _id: 'benefit-revenue',
      title: 'Predictable Revenue',
      description: 'Get paid weekly based on actual value creation. Our ML models predict earnings potential with 94% accuracy.',
      icon: 'dollar-sign',
      order: 2,
    },
    {
      _id: 'benefit-compliance',
      title: 'Stay Compliant',
      description: 'Built-in privacy preservation with differential privacy, secure enclaves, and full audit trails.',
      icon: 'shield-check',
      order: 3,
    },
    {
      _id: 'benefit-insights',
      title: 'Market Intelligence',
      description: 'See real-time demand for your data segments and optimize pricing based on market conditions.',
      icon: 'trending-up',
      order: 4,
    },
  ]

  for (const benefit of dataOwnerBenefits) {
    await createDocument({ _type: 'benefitCard', ...benefit })
  }

  // FAQs for Data Owners
  const faqs = [
    {
      _id: 'faq-1',
      question: 'How is this different from being a data broker?',
      answer: 'Data brokers collect and sell third-party data. With Precise, you only share insights from your own first-party data through privacy-preserving queries. You maintain full control and never transfer raw data.',
      category: 'general',
      order: 1,
    },
    {
      _id: 'faq-2',
      question: 'What about GDPR and CCPA compliance?',
      answer: 'You remain a data controller, not a processor. All queries use differential privacy and secure multi-party computation. Full audit logs ensure compliance.',
      category: 'compliance',
      order: 2,
    },
    {
      _id: 'faq-3',
      question: 'How do I know my data is secure?',
      answer: 'Your data never leaves your infrastructure. Queries run in secure enclaves with cryptographic verification. We\'re SOC2 Type II certified and undergo regular security audits.',
      category: 'security',
      order: 3,
    },
    {
      _id: 'faq-4',
      question: 'How is revenue calculated?',
      answer: 'Our Valence Enhanced Shapley system calculates your data\'s contribution to campaign success. You\'re paid based on actual incrementality and value creation, not just usage.',
      category: 'revenue',
      order: 4,
    },
    {
      _id: 'faq-5',
      question: 'What kind of queries can advertisers run?',
      answer: 'Only aggregated queries that you pre-approve. Common examples include audience overlap analysis, conversion rate modeling, and attribution insights. No individual-level data is ever exposed.',
      category: 'queries',
      order: 5,
    },
    {
      _id: 'faq-6',
      question: 'How quickly can I get started?',
      answer: 'Most organizations are live within 2 weeks. Our white-glove implementation team handles deployment, and our infrastructure runs alongside your existing systems.',
      category: 'implementation',
      order: 6,
    },
  ]

  for (const faq of faqs) {
    await createDocument({ _type: 'faq', ...faq })
  }

  // Testimonials
  const testimonials = [
    {
      _id: 'testimonial-1',
      quote: "We've unlocked $2.4M in annual revenue from data we were already collecting. The best part? Our legal team loves that we maintain full control.",
      author: 'Michael Chen',
      role: 'VP of Data Strategy',
      company: 'Fortune 500 Retailer',
      image: { _type: 'image', asset: { _ref: 'image-testimonial-1' } },
      featured: true,
    },
    {
      _id: 'testimonial-2',
      quote: "Precise lets us monetize our data assets without the compliance headaches. It's privacy-preserving revenue generation at its finest.",
      author: 'Sarah Williams',
      role: 'Chief Data Officer',
      company: 'Leading Publisher',
      image: { _type: 'image', asset: { _ref: 'image-testimonial-2' } },
      featured: true,
    },
    {
      _id: 'testimonial-3',
      quote: "The market intelligence alone is worth it. We discovered our loyalty data was 3x more valuable than we thought.",
      author: 'David Park',
      role: 'Director of Analytics',
      company: 'Global QSR Brand',
      image: { _type: 'image', asset: { _ref: 'image-testimonial-3' } },
      featured: true,
    },
  ]

  for (const testimonial of testimonials) {
    await createDocument({ _type: 'testimonial', ...testimonial })
  }

  // Calculator Section
  await createDocument({
    _type: 'calculatorSection',
    _id: 'calculator-main',
    title: 'Calculate Your Revenue Potential',
    subtitle: 'See how much your data could be worth with Precise',
    fields: [
      {
        _key: 'field1',
        label: 'Monthly Active Users',
        placeholder: '1,000,000',
        multiplier: 0.05,
      },
      {
        _key: 'field2',
        label: 'Data Categories',
        placeholder: '5',
        multiplier: 1.2,
      },
      {
        _key: 'field3',
        label: 'Update Frequency',
        placeholder: 'Daily',
        multiplier: 1.5,
      },
    ],
    resultText: 'Estimated Annual Revenue',
  })

  // Benefits for Advertisers
  const advertiserBenefits = [
    {
      _id: 'benefit-ai-optimization',
      title: 'AI-Powered Optimization',
      description: 'Predictive CAC forecasting, creative fatigue detection, and automated budget reallocation across DSPs.',
      icon: 'brain',
      order: 1,
    },
    {
      _id: 'benefit-unified-view',
      title: 'Unified Campaign View',
      description: 'See all your campaigns across every platform in one place with real-time performance metrics.',
      icon: 'layers',
      order: 2,
    },
    {
      _id: 'benefit-incrementality',
      title: 'True Incrementality',
      description: 'Prove real impact with holdout testing and multi-touch attribution powered by machine learning.',
      icon: 'trending-up',
      order: 3,
    },
    {
      _id: 'benefit-privacy-safe',
      title: 'Privacy-Safe Activation',
      description: 'Access premium audiences without handling raw data. Full compliance with global privacy regulations.',
      icon: 'shield',
      order: 4,
    },
  ]

  for (const benefit of advertiserBenefits) {
    await createDocument({ _type: 'benefitCard', ...benefit })
  }

  // Integration Partners
  const integrations = [
    {
      _id: 'integration-dv360',
      name: 'Google DV360',
      category: 'dsp',
      logo: { _type: 'image', asset: { _ref: 'image-logo-dv360' } },
      order: 1,
    },
    {
      _id: 'integration-ttd',
      name: 'The Trade Desk',
      category: 'dsp',
      logo: { _type: 'image', asset: { _ref: 'image-logo-ttd' } },
      order: 2,
    },
    {
      _id: 'integration-amazon',
      name: 'Amazon DSP',
      category: 'dsp',
      logo: { _type: 'image', asset: { _ref: 'image-logo-amazon' } },
      order: 3,
    },
    {
      _id: 'integration-meta',
      name: 'Meta',
      category: 'platform',
      logo: { _type: 'image', asset: { _ref: 'image-logo-meta' } },
      order: 4,
    },
    {
      _id: 'integration-liveramp',
      name: 'LiveRamp',
      category: 'identity',
      logo: { _type: 'image', asset: { _ref: 'image-logo-liveramp' } },
      order: 5,
    },
    {
      _id: 'integration-neustar',
      name: 'TransUnion',
      category: 'identity',
      logo: { _type: 'image', asset: { _ref: 'image-logo-transunion' } },
      order: 6,
    },
  ]

  for (const integration of integrations) {
    await createDocument({ _type: 'integrationPartner', ...integration })
  }

  // How It Works Page Content - Media Buyer Metrics
  await createDocument({
    _type: 'howItWorksMetrics',
    _id: 'metrics-media-buyer',
    userType: 'media-buyer',
    title: 'AI-Powered Campaign Optimization at Scale',
    metrics: [
      {
        _key: 'm1',
        value: '-47%',
        label: 'CAC Reduction',
        description: 'Average across 50+ campaigns',
      },
      {
        _key: 'm2',
        value: '3.2x',
        label: 'ROAS Improvement',
        description: 'With multi-touch attribution',
      },
      {
        _key: 'm3',
        value: '92%',
        label: 'Forecast Accuracy',
        description: '4-week CAC predictions',
      },
    ],
  })

  // How It Works Page Content - Data Controller Benefits
  await createDocument({
    _type: 'howItWorksMetrics',
    _id: 'metrics-data-controller',
    userType: 'data-controller',
    title: 'Market Intelligence Without Sharing Your Data',
    metrics: [
      {
        _key: 'm1',
        value: '$127K',
        label: 'Avg Monthly Revenue',
        description: 'Per data controller',
      },
      {
        _key: 'm2',
        value: '100%',
        label: 'Privacy Maintained',
        description: 'Data never leaves your control',
      },
      {
        _key: 'm3',
        value: '94%',
        label: 'Value Attribution',
        description: 'Accuracy of Shapley calculations',
      },
    ],
  })

  console.log('✅ Comprehensive seed complete!')
}

// Run the seed
seedData().catch(console.error)