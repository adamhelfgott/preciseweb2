# OMG Unified Dashboard - API Specification v1.0

## API Overview

The OMG Unified Dashboard API provides programmatic access to campaign management, cross-platform analytics, and AI-powered optimizations. This RESTful API serves as the integration point between the dashboard UI and the underlying Precise.ai/Madhive infrastructure.

## Base Configuration

### Endpoints
- **Production**: `https://api.precise.ai/omg/v1`
- **Staging**: `https://api-staging.precise.ai/omg/v1`
- **Agency-specific**: `https://api.{agency}.precise.ai/v1` (white-label)

### Authentication
```http
Authorization: Bearer {JWT_TOKEN}
X-Agency-ID: {AGENCY_ID}
X-API-Version: 1.0
```

### Rate Limits
- **Standard**: 1,000 requests/minute
- **Bulk operations**: 100 requests/minute
- **Real-time endpoints**: 10,000 requests/minute

## Core API Endpoints

### 1. Campaign Management

#### List Campaigns
```http
GET /campaigns?advertiserId={id}&status={status}&platform={platform}

Response:
{
  "campaigns": [
    {
      "id": "camp_123",
      "name": "Genesis Q4 2024",
      "advertiserId": "adv_genesis",
      "status": "active",
      "budget": {
        "total": 2500000,
        "spent": 1823000,
        "remaining": 677000,
        "currency": "USD"
      },
      "dateRange": {
        "start": "2024-10-01",
        "end": "2024-12-31"
      },
      "platforms": [
        {
          "id": "hulu",
          "name": "Hulu",
          "budget": 800000,
          "spent": 623000,
          "metrics": {
            "impressions": 42300000,
            "reach": 12500000,
            "frequency": 3.4,
            "cpm": 14.73
          }
        }
      ],
      "performance": {
        "kpi": "conversions",
        "target": 15000,
        "actual": 12847,
        "pacing": 85.6
      }
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 147,
    "hasMore": true
  }
}
```

#### Create Campaign
```http
POST /campaigns

Request:
{
  "name": "Holiday Push 2024",
  "advertiserId": "adv_target",
  "budget": {
    "total": 5000000,
    "currency": "USD"
  },
  "dateRange": {
    "start": "2024-11-15",
    "end": "2024-12-31"
  },
  "targeting": {
    "demographics": {
      "age": "25-54",
      "gender": "all",
      "income": "50k+"
    },
    "geography": {
      "type": "zipai",
      "segments": ["tech-forward", "family-suburban"]
    }
  },
  "platforms": [
    {
      "id": "hulu",
      "budget": 2000000,
      "bidStrategy": "max-reach"
    },
    {
      "id": "madhive",
      "budget": 3000000,
      "bidStrategy": "target-cpa",
      "targetCPA": 25
    }
  ]
}

Response:
{
  "campaign": {
    "id": "camp_789",
    "status": "pending",
    "createdAt": "2024-10-15T10:30:00Z",
    "activationStatus": {
      "hulu": "pending_approval",
      "madhive": "ready"
    }
  }
}
```

#### Update Campaign
```http
PATCH /campaigns/{campaignId}

Request:
{
  "status": "paused",
  "budget": {
    "total": 5500000
  },
  "platforms": [
    {
      "id": "hulu",
      "budget": 2500000
    }
  ]
}
```

### 2. Real-Time Metrics

#### Get Live Metrics
```http
GET /campaigns/{campaignId}/metrics/live

Response:
{
  "metrics": {
    "timestamp": "2024-10-15T14:32:45Z",
    "impressions": {
      "last5min": 125000,
      "last1hour": 1450000,
      "today": 8234000
    },
    "spend": {
      "last5min": 1875.50,
      "last1hour": 21750.00,
      "today": 123456.78
    },
    "performance": {
      "ctr": 0.0234,
      "viewability": 0.943,
      "completionRate": 0.876
    },
    "pacing": {
      "daily": {
        "target": 150000,
        "actual": 123456.78,
        "percentage": 82.3
      }
    }
  }
}
```

#### Subscribe to Real-Time Updates
```http
WebSocket: wss://api.precise.ai/omg/v1/ws

// Subscribe to campaign updates
{
  "action": "subscribe",
  "channels": ["campaign.metrics.camp_123", "alerts.camp_123"]
}

// Receive updates
{
  "channel": "campaign.metrics.camp_123",
  "data": {
    "impressions": 42301500,
    "spend": 623150.25,
    "timestamp": "2024-10-15T14:33:00Z"
  }
}
```

### 3. Cross-Platform Analytics

#### Unified Reach & Frequency
```http
GET /analytics/reach-frequency?campaignIds={ids}&dateRange={range}

Response:
{
  "reachFrequency": {
    "totalReach": 25600000,
    "avgFrequency": 4.2,
    "platformOverlap": {
      "hulu_disney": 3200000,
      "hulu_madhive": 2100000,
      "all_three": 450000
    },
    "incrementalReach": {
      "hulu": 12000000,
      "disney": 8500000,
      "madhive": 5100000
    },
    "frequencyDistribution": {
      "1": 8500000,
      "2-3": 10200000,
      "4-6": 5400000,
      "7+": 1500000
    }
  }
}
```

#### Attribution Paths
```http
GET /analytics/attribution?campaignId={id}&window=30&model=multitouch

Response:
{
  "attribution": {
    "totalConversions": 15234,
    "paths": [
      {
        "touchpoints": [
          {"platform": "hulu", "format": "video", "timestamp": "2024-10-01T10:00:00Z"},
          {"platform": "madhive", "format": "display", "timestamp": "2024-10-02T15:00:00Z"},
          {"platform": "disney", "format": "video", "timestamp": "2024-10-03T20:00:00Z"}
        ],
        "conversions": 2341,
        "avgTimeToConvert": "3.2 days",
        "value": 125000
      }
    ],
    "platformContribution": {
      "hulu": 0.42,
      "madhive": 0.31,
      "disney": 0.27
    }
  }
}
```

### 4. ZipAI Intelligence

#### Get Micro-Cultural Insights
```http
GET /zipai/insights?campaignId={id}&zipCodes={zips}

Response:
{
  "insights": {
    "segments": [
      {
        "id": "tech-forward-millennials",
        "name": "Tech Forward Millennials",
        "zipCodes": ["94107", "94103", "94102"],
        "population": 125000,
        "indexVsAverage": 2.34,
        "performance": {
          "ctr": 0.0456,
          "conversionRate": 0.0234,
          "avgOrderValue": 156.78
        },
        "recommendations": [
          "Increase budget allocation by 25%",
          "Test mobile-first creative",
          "Daypart shift to evening hours"
        ]
      }
    ],
    "geographicHeatmap": {
      "url": "https://api.precise.ai/zipai/heatmap/camp_123.png",
      "topZipCodes": [
        {"zip": "94107", "index": 3.45, "spend": 12000},
        {"zip": "10013", "index": 2.89, "spend": 8500}
      ]
    }
  }
}
```

#### Optimize by Micro-Culture
```http
POST /zipai/optimize

Request:
{
  "campaignId": "camp_123",
  "optimizationType": "auto-shift",
  "parameters": {
    "targetSegments": ["tech-forward", "urban-professionals"],
    "budgetShiftLimit": 0.20,
    "performanceThreshold": 1.5
  }
}

Response:
{
  "optimization": {
    "id": "opt_456",
    "status": "executing",
    "changes": [
      {
        "segment": "tech-forward-millennials",
        "budgetChange": "+25%",
        "estimatedImpact": {
          "conversions": "+450",
          "roas": "+0.34"
        }
      }
    ],
    "estimatedCompletion": "2024-10-15T15:00:00Z"
  }
}
```

### 5. AI Optimizations

#### Get Recommendations
```http
GET /ai/recommendations?campaignId={id}&type={type}

Response:
{
  "recommendations": [
    {
      "id": "rec_789",
      "type": "budget-shift",
      "priority": "high",
      "insight": "Hulu performing 34% above benchmark",
      "action": "Shift $50K from Disney+ to Hulu",
      "estimatedImpact": {
        "conversions": "+234",
        "efficiency": "+12%"
      },
      "confidence": 0.89
    },
    {
      "id": "rec_790",
      "type": "creative-fatigue",
      "priority": "medium",
      "insight": "Creative A showing 15% CTR decline",
      "action": "Rotate to Creative B variant",
      "estimatedImpact": {
        "ctr": "+0.008",
        "engagement": "+18%"
      },
      "confidence": 0.76
    }
  ]
}
```

#### Execute Optimization
```http
POST /ai/optimizations/execute

Request:
{
  "recommendationId": "rec_789",
  "parameters": {
    "executeImmediately": true,
    "notifyStakeholders": true
  }
}

Response:
{
  "execution": {
    "id": "exec_123",
    "status": "in_progress",
    "steps": [
      {"step": "pause_campaigns", "status": "completed"},
      {"step": "reallocate_budget", "status": "in_progress"},
      {"step": "resume_campaigns", "status": "pending"}
    ],
    "estimatedCompletion": "2024-10-15T14:35:00Z"
  }
}
```

### 6. Platform Controls

#### Get Platform Inventory
```http
GET /platforms/{platformId}/inventory?targeting={params}

Response:
{
  "inventory": {
    "available": true,
    "forecasted": {
      "impressions": 125000000,
      "reach": 35000000,
      "avgCpm": 18.50
    },
    "segments": [
      {
        "id": "prime_video_viewers",
        "size": 12000000,
        "cpmPremium": 1.25
      }
    ]
  }
}
```

#### Update Platform Settings
```http
PATCH /platforms/{platformId}/settings

Request:
{
  "campaignId": "camp_123",
  "bidStrategy": "target-cpa",
  "targetCPA": 30,
  "frequencyCap": {
    "impressions": 6,
    "period": "week"
  },
  "dayparting": {
    "monday": ["06:00-09:00", "17:00-23:00"],
    "tuesday": ["06:00-09:00", "17:00-23:00"]
  }
}
```

### 7. Reporting & Exports

#### Generate Report
```http
POST /reports/generate

Request:
{
  "type": "cross-platform-performance",
  "campaignIds": ["camp_123", "camp_456"],
  "dateRange": {
    "start": "2024-10-01",
    "end": "2024-10-31"
  },
  "metrics": ["reach", "frequency", "conversions", "roas"],
  "groupBy": ["platform", "daypart", "creative"],
  "format": "pdf"
}

Response:
{
  "report": {
    "id": "report_789",
    "status": "generating",
    "estimatedCompletion": "2024-10-15T14:40:00Z",
    "downloadUrl": null
  }
}
```

#### Download Report
```http
GET /reports/{reportId}/download

Response: Binary PDF/CSV file
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INVALID_CAMPAIGN_ID",
    "message": "Campaign camp_999 not found",
    "details": {
      "campaignId": "camp_999",
      "suggestion": "Use GET /campaigns to list valid campaign IDs"
    },
    "timestamp": "2024-10-15T14:35:00Z",
    "requestId": "req_abc123"
  }
}
```

### Error Codes
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## SDK Examples

### JavaScript/TypeScript
```typescript
import { PreciseOMG } from '@precise/omg-sdk';

const client = new PreciseOMG({
  apiKey: process.env.PRECISE_API_KEY,
  agencyId: 'omd'
});

// Get campaign metrics
const metrics = await client.campaigns.getMetrics('camp_123', {
  metrics: ['impressions', 'spend', 'conversions'],
  interval: '5min'
});

// Execute optimization
const result = await client.ai.executeRecommendation('rec_789', {
  autoApprove: true
});
```

### Python
```python
from precise_omg import PreciseOMGClient

client = PreciseOMGClient(
    api_key=os.environ['PRECISE_API_KEY'],
    agency_id='omd'
)

# Get ZipAI insights
insights = client.zipai.get_insights(
    campaign_id='camp_123',
    zip_codes=['94107', '10013']
)

# Create campaign
campaign = client.campaigns.create({
    'name': 'Q4 Push',
    'budget': {'total': 1000000, 'currency': 'USD'},
    'platforms': ['hulu', 'madhive']
})
```

## Webhooks

### Configuration
```http
POST /webhooks

Request:
{
  "url": "https://your-domain.com/webhooks/precise",
  "events": ["campaign.status.changed", "optimization.completed", "alert.triggered"],
  "secret": "your-webhook-secret"
}
```

### Event Types
- `campaign.created`
- `campaign.status.changed`
- `campaign.budget.exceeded`
- `optimization.recommended`
- `optimization.completed`
- `alert.triggered`
- `report.ready`

### Webhook Payload
```json
{
  "event": "optimization.completed",
  "timestamp": "2024-10-15T14:40:00Z",
  "data": {
    "optimizationId": "opt_123",
    "campaignId": "camp_456",
    "result": "success",
    "impact": {
      "budgetShifted": 50000,
      "estimatedImprovement": 0.12
    }
  },
  "signature": "sha256=..."
}
```