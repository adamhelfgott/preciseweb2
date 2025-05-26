# Precise.ai Demo Walkthrough (Internal Only)

⚠️ **CONFIDENTIAL**: This document is for internal use only. Never show these URLs or controls during a demo.

## Overview

The Precise.ai demo is designed to appear as a fully functional, production system. All demo controls are hidden from the main application to maintain the illusion of reality.

## Demo Setup (Before Presentation)

### 1. Prepare Your Screens

**Screen 1 (Presenter's laptop - not visible to audience)**
- Tab 1: Demo Control Panel - `http://localhost:3000/demo-control`
- Tab 2: This walkthrough document
- Tab 3: Terminal running demo agent (minimized)

**Screen 2 (Main display - visible to audience)**
- Tab 1: Precise.ai Homepage - `http://localhost:3000`
- Tab 2: Media Buyer Dashboard - `http://localhost:3000/app/campaigns`
- Tab 3: Agent Intelligence - `http://localhost:3000/agent-intelligence`
- Tab 4: API Docs - `http://localhost:3000/docs/api`

### 2. Start Background Services

```bash
# Terminal 1 (hidden)
npm run dev

# Terminal 2 (hidden)
npx convex dev

# Terminal 3 (hidden) - Don't start yet, wait for demo
cd examples/demo-dsp-agent
# Will run: node demo-agent.js continuous
```

## Demo Flow Script

### Act 1: The Problem (2 minutes)

**On main screen: Show Media Buyer Dashboard**

"This is what media buyers deal with today - multiple DSPs, no unified view, no real-time optimization."

- Point out static numbers
- Mention creative fatigue going unnoticed
- Talk about wasted spend

### Act 2: The Solution (3 minutes)

**Behind the scenes: Start the demo agent**
```bash
# In Terminal 3 (hidden)
node demo-agent.js continuous
```

**On main screen: Watch data flow in**

"Now watch what happens when we connect Precise.ai's intelligence layer..."

- Numbers start updating in real-time
- Creative fatigue alerts appear
- Performance metrics improve

**Behind the scenes: Trigger specific events from Demo Control Panel**
- Click "Creative Fatigue Alert" when talking about creative optimization
- Click "DSP Arbitrage" when discussing cross-platform optimization
- Click "Performance Spike" to show immediate impact

### Act 3: The Technology (2 minutes)

**On main screen: Switch to Agent Intelligence page**

"This isn't magic - it's intelligent agent communication."

- Show the interactive diagram
- Explain 50ms response time
- Demonstrate code examples

**On main screen: Switch to API Docs**

"Integration takes minutes, not months."

- Show simple API structure
- Point out SDK options
- Mention enterprise support

### Act 4: Strategic Value (3 minutes)

**On main screen: Return to Media Buyer Dashboard**

"Let me show you the business impact..."

**Behind the scenes: Trigger "Budget Reallocation" from Demo Control**

- Watch as budgets automatically shift
- Explain the ROI improvement
- Talk about competitive advantage

"For a DSP like MadHive, this means..."
- Leading in CTV optimization
- Winning more bids with better data
- Setting industry standards

## Key Demo Points

### Always Emphasize

1. **Real-Time Nature**: "This is happening now, not in a report tomorrow"
2. **Cross-Platform Intelligence**: "No single DSP can see this"
3. **Privacy-First**: "Data never moves, only insights"
4. **Immediate ROI**: "Clients see results in days, not months"

### Never Mention

1. Demo controls or fake data
2. Technical limitations
3. Future features as current
4. Specific client names (unless approved)

## Handling Questions

### "Is this real data?"
"This is a demonstration environment with realistic data patterns. In production, you'd see your actual campaigns."

### "How quickly can we integrate?"
"Most DSPs are running within 48 hours. We provide dedicated support for enterprise partners."

### "What about data privacy?"
"We're privacy-first. Your data never leaves your infrastructure. We only process insights and recommendations."

### "How does pricing work?"
"We have flexible models - per-decision, performance-based, or enterprise agreements. Let's discuss what works for your scale."

## Emergency Procedures

### If the demo crashes:
1. Switch to slides (backup deck ready)
2. Say: "Let me show you the architecture while that refreshes"
3. Restart on hidden screen, switch back when ready

### If data stops flowing:
1. Check demo agent in Terminal 3
2. Use Demo Control Panel to trigger manual events
3. Say: "The system is optimizing - let me show you how that works"

### If asked to see something not built:
"That's in our enterprise tier. I'd love to show you that in a dedicated session."

## Post-Demo

### Reset for next demo:
```bash
# In Demo Control Panel
Click "Reset" button

# Restart demo agent
Ctrl+C in Terminal 3
node demo-agent.js continuous
```

### Follow-up materials:
- Send strategic deck (not technical details)
- Schedule technical deep-dive
- Introduce to partnership team

## Secret URLs (Never Share)

- Demo Control: `/demo-control`
- Admin Mode: Add `?admin=true` to any URL
- Debug Panel: `/api/debug` (if implemented)
- Reset Data: `/api/reset-demo` (if implemented)

## Remember

**The best demo is one where they forget it's a demo.** Keep the focus on business value, not technical implementation. Let them imagine their campaigns running through Precise.ai, not wonder how the demo works.

**For MadHive specifically**: Emphasize CTV optimization, transparency, and how Precise makes them the premium choice for sophisticated advertisers.