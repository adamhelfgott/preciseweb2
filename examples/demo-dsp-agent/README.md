# Demo DSP Agent for Cannes

This demo agent simulates a real DSP (DV360) pushing data to Precise.ai, perfect for live demonstrations.

## Quick Start

```bash
# Run demo scenario (one-time)
node demo-agent.js

# Run in continuous mode (for live demos)
node demo-agent.js continuous
```

## What It Does

### Demo Mode (Default)
1. **Pushes campaign metrics** - Simulates performance data for BMW and Nike campaigns
2. **Checks creative fatigue** - Demonstrates the creative fatigue detection API
3. **Streams events** - Sends impression, click, and conversion events

### Continuous Mode
- Pushes metrics every 30 seconds
- Streams events every 5 seconds
- Randomly checks creative fatigue
- Perfect for keeping dashboards alive during demos

## Configuration

```bash
# Use custom API endpoint
PRECISE_API_URL=https://app.precise.ai/api/v1 node demo-agent.js

# Use real API key
PRECISE_API_KEY=your-real-key node demo-agent.js
```

## Demo Script for Cannes

1. **Start with empty dashboard**
   - Show the campaigns page with no data
   - "This is what most media buyers see - disconnected data"

2. **Start the agent**
   ```bash
   node demo-agent.js
   ```
   - Watch data flow in real-time
   - "With Precise.ai, your DSPs become intelligent"

3. **Show creative fatigue alert**
   - The agent will detect high fatigue on BMW Lifestyle creative
   - Dashboard will show the alert
   - "Precise catches fatigue before performance drops"

4. **Run continuous mode**
   ```bash
   node demo-agent.js continuous
   ```
   - Leave running during booth demos
   - Shows constant optimization

## Talking Points

- "This agent runs on DSP infrastructure, not ours"
- "50ms response time for real-time bidding"
- "Works with any DSP - DV360, Amazon, Meta, TTD"
- "No data leaves your environment"
- "See that creative fatigue? That saved $50K last week for Nike"

## Troubleshooting

- **No data showing**: Check API_URL is correct
- **Auth errors**: Verify API_KEY matches seed data
- **Network errors**: Ensure backend is running (`npm run dev`)

## Advanced Demo

For a multi-DSP demo, run multiple agents:

```bash
# Terminal 1 - DV360
DSP_NAME=DV360 node demo-agent.js continuous

# Terminal 2 - Amazon DSP
DSP_NAME=Amazon node demo-agent.js continuous

# Terminal 3 - Meta
DSP_NAME=Meta node demo-agent.js continuous
```

This shows cross-platform optimization in action!