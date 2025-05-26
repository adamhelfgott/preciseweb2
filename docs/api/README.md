# Precise.ai API Documentation

## Overview

The Precise.ai API enables agent systems and external integrations to feed data into the platform. All APIs use JSON and require authentication via API keys.

## Base URL

```
Production: https://api.precise.ai/v1
Development: http://localhost:3000/api/v1
```

## Authentication

All API requests require an API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

API keys are scoped to organizations and can be managed in the Settings > API Keys section of the dashboard.

## Rate Limits

- Standard: 1000 requests per hour
- Enterprise: 10000 requests per hour

## Endpoints

### Event Ingestion API

**POST /api/v1/events**

Ingest real-time events from DSPs, pixels, and other tracking systems.

```bash
curl -X POST https://api.precise.ai/v1/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "impression",
    "entity_type": "campaign",
    "entity_id": "camp_123",
    "properties": {
      "dsp": "DV360",
      "creative_id": "cr_456",
      "placement_id": "pl_789",
      "cost": 0.0025,
      "timestamp": "2025-05-26T10:30:00Z",
      "user_segments": ["automotive", "luxury"],
      "device_type": "mobile",
      "geo": {
        "country": "US",
        "state": "CA",
        "dma": "803"
      }
    }
  }'
```

### Batch Events API

**POST /api/v1/events/batch**

Ingest multiple events in a single request (max 1000 events).

```bash
curl -X POST https://api.precise.ai/v1/events/batch \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
        "event_type": "impression",
        "entity_type": "campaign",
        "entity_id": "camp_123",
        "properties": {...}
      },
      {
        "event_type": "click",
        "entity_type": "campaign",
        "entity_id": "camp_123",
        "properties": {...}
      }
    ]
  }'
```

### Metrics API

**POST /api/v1/metrics**

Update campaign performance metrics.

```bash
curl -X POST https://api.precise.ai/v1/metrics \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "camp_123",
    "timestamp": "2025-05-26T10:00:00Z",
    "metrics": {
      "impressions": 150000,
      "clicks": 3200,
      "conversions": 120,
      "spend": 2500.00,
      "revenue": 8500.00,
      "ctr": 0.0213,
      "cvr": 0.0375,
      "cpc": 0.78,
      "cpa": 20.83,
      "roas": 3.40
    },
    "dimensions": {
      "dsp": "DV360",
      "creative_id": "cr_456",
      "audience_segment": "luxury_auto"
    }
  }'
```

### Attribution API

**GET /api/v1/attribution/:campaignId**

Get attribution data for a campaign.

```bash
curl -X GET https://api.precise.ai/v1/attribution/camp_123 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response:
```json
{
  "campaign_id": "camp_123",
  "attribution_window": "30d",
  "model": "data_driven",
  "touchpoints": [
    {
      "channel": "display",
      "dsp": "DV360",
      "contribution": 0.35,
      "revenue_attributed": 2975.00
    },
    {
      "channel": "social",
      "dsp": "Meta",
      "contribution": 0.45,
      "revenue_attributed": 3825.00
    }
  ],
  "total_revenue": 8500.00,
  "attributed_conversions": 120
}
```

### Query API

**POST /api/v1/query**

Flexible query endpoint for complex data retrieval.

```bash
curl -X POST https://api.precise.ai/v1/query \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query_type": "campaign_performance",
    "filters": {
      "date_range": {
        "start": "2025-05-01",
        "end": "2025-05-26"
      },
      "dsps": ["DV360", "Amazon"],
      "min_spend": 1000
    },
    "group_by": ["dsp", "creative_id"],
    "metrics": ["impressions", "clicks", "spend", "roas"]
  }'
```

## Webhook System

### Webhook Registration

**POST /api/v1/webhooks**

Register webhooks to receive real-time updates.

```bash
curl -X POST https://api.precise.ai/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-system.com/webhook",
    "events": [
      "campaign.budget_exceeded",
      "creative.fatigue_detected",
      "attribution.model_updated",
      "data_asset.usage_tracked"
    ],
    "secret": "your_webhook_secret"
  }'
```

### Webhook Payload Examples

**Creative Fatigue Alert**
```json
{
  "event": "creative.fatigue_detected",
  "timestamp": "2025-05-26T10:45:00Z",
  "data": {
    "campaign_id": "camp_123",
    "creative_id": "cr_456",
    "fatigue_score": 8.5,
    "recommendation": "Replace creative within 48 hours",
    "performance_drop": -15.2
  }
}
```

**Budget Alert**
```json
{
  "event": "campaign.budget_exceeded",
  "timestamp": "2025-05-26T11:00:00Z",
  "data": {
    "campaign_id": "camp_123",
    "budget": 10000,
    "spent": 10250,
    "overage_percentage": 2.5,
    "recommendation": "Pause campaign or increase budget"
  }
}
```

## Agent System Integration

### DSP Agents

DSP agents should push data every 5-15 minutes:

```python
import requests
import json
from datetime import datetime

class PreciseAIAgent:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.precise.ai/v1"
        
    def push_campaign_metrics(self, campaign_data):
        """Push campaign performance data to Precise.ai"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        # Aggregate metrics
        metrics = {
            "campaign_id": campaign_data["id"],
            "timestamp": datetime.utcnow().isoformat(),
            "metrics": {
                "impressions": campaign_data["impressions"],
                "clicks": campaign_data["clicks"],
                "spend": campaign_data["spend"],
                # ... more metrics
            }
        }
        
        response = requests.post(
            f"{self.base_url}/metrics",
            headers=headers,
            json=metrics
        )
        return response.json()
```

### Pixel/Tag Agents

For real-time event streaming:

```javascript
class PrecisePixelAgent {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.eventBuffer = [];
    this.flushInterval = 5000; // 5 seconds
    
    setInterval(() => this.flushEvents(), this.flushInterval);
  }
  
  trackEvent(event) {
    this.eventBuffer.push({
      event_type: event.type,
      entity_type: 'campaign',
      entity_id: event.campaignId,
      properties: {
        timestamp: new Date().toISOString(),
        ...event.data
      }
    });
    
    // Flush if buffer is getting large
    if (this.eventBuffer.length >= 100) {
      this.flushEvents();
    }
  }
  
  async flushEvents() {
    if (this.eventBuffer.length === 0) return;
    
    const events = [...this.eventBuffer];
    this.eventBuffer = [];
    
    try {
      await fetch('https://api.precise.ai/v1/events/batch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events })
      });
    } catch (error) {
      // Re-add events to buffer on failure
      this.eventBuffer = [...events, ...this.eventBuffer];
    }
  }
}
```

## Error Handling

All endpoints return standard HTTP status codes:

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request format
- `401 Unauthorized` - Missing or invalid API key
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

Error Response Format:
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field: campaign_id",
    "details": {
      "field": "campaign_id",
      "requirement": "UUID format"
    }
  }
}
```

## Best Practices

1. **Batch Events**: Use batch endpoints when sending multiple events
2. **Retry Logic**: Implement exponential backoff for failed requests
3. **Data Validation**: Validate data before sending to avoid errors
4. **Timestamp Format**: Always use ISO 8601 format for timestamps
5. **ID Format**: Use UUIDs for all entity IDs
6. **Webhook Security**: Verify webhook signatures to ensure authenticity

## SDK Support

Official SDKs available for:
- Python: `pip install precise-ai`
- Node.js: `npm install @precise-ai/sdk`
- Go: `go get github.com/precise-ai/go-sdk`

## Support

- API Status: https://status.precise.ai
- Developer Forum: https://developers.precise.ai
- Email: api-support@precise.ai