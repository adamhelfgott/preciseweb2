/**
 * Precise.ai MCP Tools for DSP Integration
 * These tools can be used by any MCP-compatible system (Claude, DSP agents, etc.)
 */

import { Tool } from '@modelcontextprotocol/sdk';

export const preciseMCPTools = [
  {
    name: 'check_creative_fatigue',
    description: 'Check if a creative needs rotation based on cross-platform performance',
    inputSchema: {
      type: 'object',
      properties: {
        creative_id: { type: 'string', description: 'The creative ID to check' },
        campaign_id: { type: 'string', description: 'The campaign ID' },
        platform: { type: 'string', description: 'Current platform (DV360, Meta, etc.)' }
      },
      required: ['creative_id', 'campaign_id']
    },
    handler: async ({ creative_id, campaign_id, platform }) => {
      const response = await fetch('https://api.precise.ai/v1/mcp/creative-fatigue', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRECISE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ creative_id, campaign_id, platform })
      });
      
      const data = await response.json();
      
      // Format response for easy decision making
      return {
        status: data.fatigue_score > 7 ? 'NEEDS_ROTATION' : 'HEALTHY',
        fatigue_score: data.fatigue_score,
        days_until_critical: data.days_until_critical,
        recommendation: data.recommendation,
        suggested_action: data.fatigue_score > 7 
          ? `Rotate creative within ${data.days_until_critical} days`
          : 'Continue running',
        performance_trend: data.performance_trend,
        cross_platform_insights: data.cross_platform_comparison
      };
    }
  },
  
  {
    name: 'calculate_bid_adjustment',
    description: 'Get real-time bid adjustment based on incrementality and attribution',
    inputSchema: {
      type: 'object',
      properties: {
        impression_context: {
          type: 'object',
          properties: {
            user_segments: { type: 'array', items: { type: 'string' } },
            domain: { type: 'string' },
            geo: { type: 'string' },
            device: { type: 'string' },
            hour_of_day: { type: 'number' }
          }
        },
        campaign_id: { type: 'string' },
        base_bid: { type: 'number' },
        platform: { type: 'string' }
      },
      required: ['impression_context', 'campaign_id', 'base_bid']
    },
    handler: async ({ impression_context, campaign_id, base_bid, platform }) => {
      const response = await fetch('https://api.precise.ai/v1/mcp/bid-adjustment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRECISE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ impression_context, campaign_id, base_bid, platform })
      });
      
      const data = await response.json();
      
      return {
        recommended_bid: data.adjusted_bid,
        adjustment_factor: data.adjustment_factor,
        confidence: data.confidence,
        reasoning: {
          incrementality_score: data.incrementality_score,
          channel_saturation: data.channel_saturation,
          user_value: data.user_value,
          competitive_landscape: data.competitive_landscape
        },
        should_bid: data.adjusted_bid > base_bid * 0.5,
        expected_outcome: {
          probability_of_conversion: data.conversion_probability,
          expected_value: data.expected_value,
          incrementality_lift: data.incrementality_lift
        }
      };
    }
  },
  
  {
    name: 'find_audience_opportunities',
    description: 'Discover undervalued audience segments across platforms',
    inputSchema: {
      type: 'object',
      properties: {
        campaign_goals: {
          type: 'object',
          properties: {
            target_cpa: { type: 'number' },
            target_roas: { type: 'number' },
            category: { type: 'string' }
          }
        },
        current_segments: { type: 'array', items: { type: 'string' } },
        budget: { type: 'number' },
        platform: { type: 'string' }
      },
      required: ['campaign_goals', 'budget']
    },
    handler: async ({ campaign_goals, current_segments, budget, platform }) => {
      const response = await fetch('https://api.precise.ai/v1/mcp/audience-opportunities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRECISE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ campaign_goals, current_segments, budget, platform })
      });
      
      const data = await response.json();
      
      return {
        opportunities: data.opportunities.map(opp => ({
          segment: opp.segment_name,
          potential_reach: opp.reach,
          estimated_cpa: opp.estimated_cpa,
          estimated_roas: opp.estimated_roas,
          competition_level: opp.competition_level,
          best_platform: opp.best_platform,
          savings_vs_current: opp.savings_percentage,
          confidence: opp.confidence,
          rationale: opp.rationale
        })),
        recommended_allocation: data.recommended_budget_split,
        expected_improvement: {
          cpa_reduction: data.expected_cpa_improvement,
          roas_increase: data.expected_roas_improvement,
          reach_expansion: data.expected_reach_increase
        }
      };
    }
  },
  
  {
    name: 'get_campaign_insights',
    description: 'Get real-time campaign performance insights and recommendations',
    inputSchema: {
      type: 'object',
      properties: {
        campaign_id: { type: 'string' },
        time_range: { type: 'string', enum: ['today', '7d', '30d'] },
        insight_types: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['performance', 'attribution', 'creative', 'audience', 'budget']
          }
        }
      },
      required: ['campaign_id']
    },
    handler: async ({ campaign_id, time_range = '7d', insight_types = ['all'] }) => {
      const response = await fetch('https://api.precise.ai/v1/mcp/campaign-insights', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRECISE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ campaign_id, time_range, insight_types })
      });
      
      const data = await response.json();
      
      return {
        summary: data.executive_summary,
        key_metrics: data.metrics,
        insights: data.insights.map(insight => ({
          type: insight.type,
          severity: insight.severity,
          message: insight.message,
          recommendation: insight.recommendation,
          potential_impact: insight.potential_impact,
          action_required: insight.action_required
        })),
        attribution_breakdown: data.attribution,
        optimization_opportunities: data.opportunities,
        predicted_outcomes: data.predictions
      };
    }
  }
];

// Example of how a DSP would use these tools
export class DSPDecisionEngine {
  constructor(mcpClient) {
    this.mcp = mcpClient;
  }
  
  async shouldRotateCreative(creativeId, campaignId, platform) {
    const result = await this.mcp.callTool('check_creative_fatigue', {
      creative_id: creativeId,
      campaign_id: campaignId,
      platform: platform
    });
    
    return result.status === 'NEEDS_ROTATION';
  }
  
  async optimizeBid(impressionContext, campaignId, baseBid, platform) {
    const result = await this.mcp.callTool('calculate_bid_adjustment', {
      impression_context: impressionContext,
      campaign_id: campaignId,
      base_bid: baseBid,
      platform: platform
    });
    
    if (result.should_bid) {
      return {
        bid: result.recommended_bid,
        confidence: result.confidence,
        rationale: result.reasoning
      };
    }
    
    return null; // Don't bid
  }
  
  async discoverNewAudiences(campaignGoals, currentSegments, budget, platform) {
    const result = await this.mcp.callTool('find_audience_opportunities', {
      campaign_goals: campaignGoals,
      current_segments: currentSegments,
      budget: budget,
      platform: platform
    });
    
    // Return top 3 opportunities
    return result.opportunities
      .sort((a, b) => b.savings_vs_current - a.savings_vs_current)
      .slice(0, 3);
  }
}

// Export for use in MCP server
export default preciseMCPTools;