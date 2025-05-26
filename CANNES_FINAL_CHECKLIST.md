# Cannes Demo Final Checklist

## Pre-Demo Setup (Night Before)

### Environment Preparation
- [ ] Fresh `npm install`
- [ ] `.env.local` configured with all keys
- [ ] Supabase migrations run
- [ ] `npm run seed:cannes` executed successfully
- [ ] Test all images load (BMW, Nike, etc.)

### Browser Setup
- [ ] Chrome/Safari with tabs pre-loaded (but not logged in)
- [ ] Zoom set to 100% (no awkward scaling)
- [ ] Bookmarks hidden
- [ ] Dev tools closed
- [ ] Ad blockers disabled

### Hidden Control Setup
- [ ] Demo control panel bookmarked: `http://localhost:3000/demo-control`
- [ ] Terminal windows positioned off-screen
- [ ] Demo agent ready but NOT running

## 30 Minutes Before Demo

### Start Services
```bash
# Terminal 1 (hidden)
npm run dev

# Terminal 2 (hidden)  
npx convex dev

# Do NOT start demo agent yet
```

### Verify Everything Works
- [ ] Homepage loads with no console errors
- [ ] Can navigate to Media Buyer dashboard
- [ ] Agent Intelligence page animations work
- [ ] API docs page renders properly

### Prepare Demo Control
- [ ] Open `/demo-control` in separate browser window
- [ ] Move to laptop screen (not external monitor)
- [ ] Test each trigger button works
- [ ] Reset counters to 0

## Demo Time Performance

### The "Cold Start" Illusion
1. Start with Campaigns page showing static data
2. Say: "This is what media buyers see today - disconnected, delayed, disappointing"
3. Let them see the "before" state for 30 seconds

### The "Magic Moment"
1. Say: "Now watch what happens when we connect Precise intelligence..."
2. **Hidden action**: Start demo agent in Terminal 3
   ```bash
   node demo-agent.js continuous
   ```
3. Data starts flowing naturally
4. Point out real-time updates as they happen
5. **Hidden action**: Trigger "Creative Fatigue Alert" from demo control when discussing creative optimization

### The "Business Value" Story
1. Switch to Agent Intelligence page
2. Let animation play while talking
3. Say: "For a DSP like yours, this means..."
4. **Hidden action**: Trigger "DSP Arbitrage" to show cost savings

### The "Easy Integration" Close
1. Show API docs briefly
2. Say: "Most teams are running in 48 hours"
3. Return to dashboard showing improved metrics
4. **Hidden action**: Trigger "Performance Spike" for final impact

## Critical Rules

### Never Say
- "Demo" (say "environment" or "instance")
- "Fake data" (say "representative data")  
- "Test" (say "sandbox" if pressed)
- "Refresh" (let updates flow naturally)

### Always Maintain
- Confidence that this is real technology
- Focus on business value, not technical details
- Eye contact with audience, not screens
- Smooth transitions between sections

### If Something Breaks
- Continue talking about the concept
- Switch to a different tab naturally  
- Have phone ready with backup screenshots
- Say: "Let me show you another aspect while that processes"

## Post-Demo Actions

### Immediate (Same Day)
- [ ] Send follow-up email with:
  - Strategic overview (not technical docs)
  - Meeting request for technical deep-dive
  - Link to agent-intelligence page (not demo control!)

### Next Day
- [ ] Internal debrief on what worked/didn't
- [ ] Update demo based on questions asked
- [ ] Prepare custom demo if they request

### Never Send
- Links to demo control panel
- This checklist or internal docs
- Raw API documentation (send polished version)
- Access to development environment

## The MadHive-Specific Angle

When demoing to MadHive or with MadHive present:

### Emphasize
- "CTV optimization that nobody else can match"
- "You'd see these patterns first as a strategic partner"
- "Imagine being the premium choice for sophisticated advertisers"
- "Your blockchain verification + our intelligence = unstoppable"

### Show
- Creative fatigue on streaming inventory
- Budget flowing to CTV/OTT placements
- Attribution showing CTV's true value
- Arbitrage sometimes favoring MadHive (naturally)

### Never Say
- "MadHive would get preferential treatment"
- "We could tune algorithms for partners"
- "Other DSPs would lose"
- "Exclusive access" (say "early access" instead)

## Final Reminder

**The goal**: They should leave thinking:
1. This technology exists and works today
2. Their competitors might already be using it
3. The ROI is obvious and immediate
4. Integration is trivial for their team

**Not thinking**:
1. This is a clever demo
2. It might work someday
3. This seems complicated
4. They need to evaluate alternatives

The best demo is one where they forget it's a demo and start planning their rollout.