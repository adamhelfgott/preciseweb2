// Data mapping for Luigi's Professional Sports Team campaign
// Based on PDF data with 10x scaling as noted

// MEDIA BUYER (LUIGI)
export const professionalSportsTeamCampaign = {
  // Campaign Overview
  campaign: {
    id: "campaign_sports_2025",
    name: "Professional Sports Team 2025",
    advertiser: "Professional Sports Team",
    userId: "luigi@demo.com",
    type: "Sport Team Ticketing",
    status: "active",
    
    // Performance Metrics (10x scaled)
    metrics: {
      currentCAC: 5.36,
      previousCAC: 10.27,
      cacReduction: 0.46, // 46%
      currentROAS: 28,
      previousROAS: 15,
      roasImprovement: 1.9,
      totalSpend: 112120, // 10x of $11,212
      blendedLTV_CAC: 28,
    },
    
    // Budget and Targeting
    budget: {
      total: 150000,
      spent: 112120,
      remaining: 37880,
      dailyBudget: 5000,
    }
  },

  // Creative Performance Data
  creatives: [
    {
      id: "creative_1",
      name: "Creative 1",
      fatigueScore: 0.62, // 62%
      status: "fatigued",
      metrics: {
        impressions: 22360770, // 10x scaled
        clickRate: 0.0058, // 0.58%
        clicks: 129692,
        conversions: 11180,
        spend: 80499,
        cac: 7.2
      }
    },
    {
      id: "creative_2", 
      name: "Creative 2",
      fatigueScore: 0.28, // 28%
      status: "active",
      metrics: {
        impressions: 7282685, // 10x scaled
        clickRate: 0.0027, // 0.27%
        clicks: 19663,
        conversions: 4370,
        spend: 29131,
        cac: 6.7
      }
    }
  ],

  // 4-Week CAC Forecast
  cacForecast: [
    {
      week: 1,
      predicted: 6.90,
      range: { min: 6.80, max: 8.87 },
      recommendation: "Creative refresh",
      confidence: 0.85
    },
    {
      week: 2,
      predicted: 6.24,
      range: { min: 6.15, max: 6.85 },
      recommendation: "Creative / Publisher Mix optimization",
      confidence: 0.82
    },
    {
      week: 3,
      predicted: 5.57,
      range: { min: 5.45, max: 5.77 },
      recommendation: "Data enhanced Creative",
      confidence: 0.78
    },
    {
      week: 4,
      predicted: 5.36,
      range: { min: 5.31, max: 5.65 },
      recommendation: "Potential Refresh needed",
      confidence: 0.75
    }
  ],

  // Attribution Data
  attribution: {
    windows: [
      {
        name: "Industry Standard",
        model: "30 Day click, 7 Day View",
        roas: 28,
        revenue: 3130000 // 10x of $313,000
      },
      {
        name: "Aggressive",
        model: "7 Day Click",
        roas: 40,
        revenue: 4471430 // 10x of $447,143
      },
      {
        name: "Conservative",
        model: "30 Day Click Only",
        roas: 10,
        revenue: 1117860 // 10x of $111,786
      }
    ],
    
    // Value Attribution Breakdown
    valueAttribution: {
      total: 11210, // 10x of $1,121
      breakdown: [
        {
          source: "1P Data - Marketing",
          percentage: 0.07,
          value: 810,
          cohort: "C0",
          roas: 14.6
        },
        {
          source: "1P Data - Sales",
          percentage: 0.13,
          value: 1500,
          cohort: "C1",
          roas: 34.7
        },
        {
          source: "3P Data - IDR - Audience Acuity",
          percentage: 0.03,
          value: 340,
          cohort: "C2",
          roas: 40.8,
          dataControllerId: "mario@demo.com"
        },
        {
          source: "3P Data - User Affinities - Audience Acuity",
          percentage: 0.11,
          value: 1270,
          cohort: "C3",
          roas: 80.9,
          dataControllerId: "mario@demo.com"
        },
        {
          source: "Precise AI Model",
          percentage: 0.42,
          value: 4700
        },
        {
          source: "Return Path Data",
          percentage: 0.23,
          value: 2600
        }
      ]
    }
  },

  // Channel Performance (replacing social handles with digital channels)
  channels: [
    {
      name: "Tablet",
      spend: 28030,
      conversions: 3920,
      cac: 7.15,
      roas: 25
    },
    {
      name: "Web",
      spend: 44848,
      conversions: 7380,
      cac: 6.08,
      roas: 32
    },
    {
      name: "App",
      spend: 22424,
      conversions: 4100,
      cac: 5.47,
      roas: 35
    },
    {
      name: "CTV",
      spend: 16818,
      conversions: 2150,
      cac: 7.82,
      roas: 22
    }
  ],

  // Campaign Health Indicators
  health: {
    overall: "low risk",
    currentCAC: 5.6,
    targetCAC: 5.0,
    trend: "improving",
    alerts: [
      {
        type: "creative_fatigue",
        severity: "medium",
        message: "Creative 1 showing 62% fatigue - refresh recommended",
        creativeId: "creative_1"
      }
    ]
  },

  // Data Provider Connection (for Mario's view)
  dataProviderMetrics: {
    campaignRevenue: 1600, // 10x of $160 noted in PDF
    dataAssets: [
      {
        name: "Identity Resolution",
        queries: 234000, // 10x of 23,400
        revenue: 560
      },
      {
        name: "Live Sports Fan",
        queries: 112000, // 10x of 11,200
        revenue: 890
      },
      {
        name: "Location Context",
        queries: 42000, // 10x of 4,200
        revenue: 150
      }
    ]
  },

  // DATA CONTROLLER (MARIO)
  // Cryptographic proof (for transparency)
  proofOfData: {
    dataId: "0x3f261e2c687a7d3c941dcc31d7d5df56c187ae3a09f428e1d03185a193f2c757",
    timestamp: "2025-05-15T11:17:15-04:00",
    blockHeight: 810502,
    vpIds: "384484",
    transactionContract: "0xa61Aa9C70cD62c0Dc03C5338e1f99c8F0eB56982",
    transactionHash: "0x408dedb0fca4c38e86a2ea1065f180a02abcb94dd24cf0f2db8d75978bd85a97",
    explorerUrl: "https://block-explorer.prod.alice.net/tx/0x408dedb0fca4c38e86a2ea1065f180a02abcb94dd24cf0f2db8d75978bd85a97?tab=index"
  }
};

// Additional campaigns for portfolio view
export const additionalCampaigns = [
  {
    id: "campaign_12340",
    name: "Ad Campaign",
    spend: 12340,
    status: "active"
  },
  {
    id: "campaign_8230",
    name: "Ad Campaign",
    spend: 8230,
    status: "active"
  },
  {
    id: "campaign_5670",
    name: "Professional Sports Campaign", 
    spend: 4810,
    status: "paused"
  },
  {
    id: "campaign_4510",
    name: "Ad Campaign",
    spend: 4510,
    status: "completed"
  }
];