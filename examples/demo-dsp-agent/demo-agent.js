#!/usr/bin/env node

/**
 * Demo DSP Agent for Cannes
 * This agent simulates a real DSP pushing data to Precise.ai
 * Run with: node demo-agent.js
 */

const API_BASE = process.env.PRECISE_API_URL || 'http://localhost:3000/api/v1';
const API_KEY = process.env.PRECISE_API_KEY || 'demo-dv360-key';

// Realistic campaign data
const campaigns = [
  {
    id: 'dv360_bmw_summer',
    name: 'BMW Summer Drive Event 2025',
    creatives: ['bmw-hero', 'bmw-lifestyle', 'bmw-performance']
  },
  {
    id: 'dv360_nike_airmax',
    name: 'Nike Air Max Reimagined',
    creatives: ['nike-hero', 'nike-motion']
  }
];

// Simulate realistic metrics
function generateMetrics(campaignId) {
  const baseMetrics = {
    impressions: Math.floor(Math.random() * 50000) + 100000,
    clicks: Math.floor(Math.random() * 2000) + 1000,
    conversions: Math.floor(Math.random() * 50) + 20,
    spend: Math.random() * 1000 + 500
  };
  
  return {
    campaign_id: campaignId,
    timestamp: new Date().toISOString(),
    metrics: {
      ...baseMetrics,
      ctr: ((baseMetrics.clicks / baseMetrics.impressions) * 100).toFixed(2),
      cvr: ((baseMetrics.conversions / baseMetrics.clicks) * 100).toFixed(2),
      cpc: (baseMetrics.spend / baseMetrics.clicks).toFixed(2),
      cpa: (baseMetrics.spend / baseMetrics.conversions).toFixed(2),
      revenue: baseMetrics.conversions * (Math.random() * 100 + 50)
    },
    dimensions: {
      dsp: 'DV360',
      region: 'US-CA',
      device_type: Math.random() > 0.5 ? 'mobile' : 'desktop'
    }
  };
}

// Push metrics to Precise.ai
async function pushMetrics(metrics) {
  try {
    const response = await fetch(`${API_BASE}/metrics`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metrics)
    });
    
    if (!response.ok) {
      console.error(`Failed to push metrics: ${response.status}`);
      return false;
    }
    
    const result = await response.json();
    console.log(`✅ Pushed metrics for ${metrics.campaign_id}`);
    return true;
  } catch (error) {
    console.error('Error pushing metrics:', error);
    return false;
  }
}

// Check creative fatigue
async function checkCreativeFatigue(creativeId, campaignId) {
  try {
    const response = await fetch(`${API_BASE}/creative/fatigue`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creative_id: creativeId,
        campaign_id: campaignId,
        check_cross_platform: true
      })
    });
    
    if (!response.ok) {
      console.error(`Failed to check fatigue: ${response.status}`);
      return null;
    }
    
    const result = await response.json();
    
    if (result.fatigue_score > 7) {
      console.log(`⚠️  Creative ${creativeId} has high fatigue (${result.fatigue_score}/10)`);
      console.log(`   Recommendation: ${result.recommendation}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error checking fatigue:', error);
    return null;
  }
}

// Push batch events
async function pushEvents(events) {
  try {
    const response = await fetch(`${API_BASE}/events/batch`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ events })
    });
    
    if (!response.ok) {
      console.error(`Failed to push events: ${response.status}`);
      return false;
    }
    
    console.log(`✅ Pushed ${events.length} events`);
    return true;
  } catch (error) {
    console.error('Error pushing events:', error);
    return false;
  }
}

// Main demo scenario
async function runDemoScenario() {
  console.log('🚀 Starting DV360 Demo Agent');
  console.log(`📡 API: ${API_BASE}`);
  console.log('----------------------------\n');
  
  // Scenario 1: Push performance metrics
  console.log('📊 Pushing campaign performance data...');
  for (const campaign of campaigns) {
    const metrics = generateMetrics(campaign.id);
    await pushMetrics(metrics);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for demo effect
  }
  
  console.log('\n');
  
  // Scenario 2: Check creative fatigue
  console.log('🎨 Checking creative fatigue...');
  await checkCreativeFatigue('bmw-lifestyle', 'dv360_bmw_summer');
  await checkCreativeFatigue('nike-motion', 'dv360_nike_airmax');
  
  console.log('\n');
  
  // Scenario 3: Push real-time events
  console.log('📈 Streaming real-time events...');
  const events = [];
  
  for (let i = 0; i < 10; i++) {
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    const eventType = ['impression', 'click', 'conversion'][Math.floor(Math.random() * 3)];
    
    events.push({
      event_type: eventType,
      entity_type: 'campaign',
      entity_id: campaign.id,
      properties: {
        dsp: 'DV360',
        creative_id: campaign.creatives[Math.floor(Math.random() * campaign.creatives.length)],
        cost: Math.random() * 5,
        timestamp: new Date().toISOString(),
        user_segments: ['luxury_auto', 'high_income'],
        device_type: Math.random() > 0.5 ? 'mobile' : 'desktop',
        geo: {
          country: 'US',
          state: 'CA',
          city: 'Los Angeles'
        }
      }
    });
  }
  
  await pushEvents(events);
  
  console.log('\n✨ Demo scenario complete!');
}

// Continuous mode for live demos
async function runContinuousMode() {
  console.log('🔄 Running in continuous mode...');
  console.log('Press Ctrl+C to stop\n');
  
  setInterval(async () => {
    // Push metrics every 30 seconds
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    const metrics = generateMetrics(campaign.id);
    await pushMetrics(metrics);
    
    // Occasionally check fatigue
    if (Math.random() > 0.7) {
      const creative = campaign.creatives[Math.floor(Math.random() * campaign.creatives.length)];
      await checkCreativeFatigue(creative, campaign.id);
    }
  }, 30000);
  
  // Push events every 5 seconds
  setInterval(async () => {
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    const event = {
      event_type: ['impression', 'click', 'conversion'][Math.floor(Math.random() * 3)],
      entity_type: 'campaign',
      entity_id: campaign.id,
      properties: {
        dsp: 'DV360',
        creative_id: campaign.creatives[Math.floor(Math.random() * campaign.creatives.length)],
        cost: Math.random() * 5,
        timestamp: new Date().toISOString()
      }
    };
    
    await pushEvents([event]);
  }, 5000);
}

// Command line interface
const args = process.argv.slice(2);
const mode = args[0] || 'demo';

if (mode === 'continuous') {
  runContinuousMode();
} else {
  runDemoScenario();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down demo agent...');
  process.exit(0);
});