# Lead Capture Implementation Options

## Current Implementation

The contact form and email capture are currently set up to:
1. Save to Convex (if `NEXT_PUBLIC_CONVEX_URL` is configured)
2. Fall back to console logging (always happens for backup)
3. Ready for easy integration with third-party services

## Option 1: Use Convex (Already Set Up)

**Pros:**
- Already integrated in the code
- Real-time database with nice dashboard
- Can query leads directly from Convex dashboard
- Free tier is generous

**Setup:**
1. Create account at https://convex.dev
2. Create new project
3. Deploy the functions: `npx convex deploy`
4. Add env variables:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
   CONVEX_DEPLOY_KEY=your-deploy-key
   ```

**View Leads:**
- Convex Dashboard → Data → contacts table
- Or build admin page using `getRecentContacts` query

## Option 2: Third-Party Form Services

### 2.1 Formspree (Easiest)
**Pros:** No backend needed, just change form action
**Setup:**
```jsx
// Replace form onSubmit with:
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
**Cost:** Free for 50 submissions/month

### 2.2 Netlify Forms
**Pros:** Built into Netlify hosting
**Setup:** Add `data-netlify="true"` to form
**Cost:** Free for 100 submissions/month

### 2.3 Basin
**Pros:** Good analytics, spam filtering
**Setup:** Similar to Formspree
**Cost:** Free for 100 submissions/month

## Option 3: CRM Direct Integration

### 3.1 HubSpot
```javascript
// Add to contact API route:
const hubspotResponse = await fetch(
  `https://api.hubapi.com/crm/v3/objects/contacts`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { email, firstname: name, company, message }
    })
  }
);
```

### 3.2 Salesforce
Similar approach with Salesforce REST API

### 3.3 Airtable (Simple Database)
```javascript
// Very simple to set up:
const base = require('airtable').base('YOUR_BASE_ID');
base('Leads').create([
  { fields: { Name: name, Email: email, Company: company, Message: message }}
]);
```

## Option 4: Email Service Webhook

### 4.1 SendGrid
- Set up Inbound Parse webhook
- Emails to leads@yourdomain.com → webhook → your API

### 4.2 Zapier/Make (No Code)
- Connect form submission to 1000+ apps
- No coding required
- Can send to multiple destinations

## Recommendation

**For Quick Start:** Use Convex (already integrated) or Formspree
**For Production:** HubSpot or Salesforce integration
**For Flexibility:** Zapier to connect multiple services

## Current Code Structure

```
/api/contact → handles form submission
             → tries Convex first
             → logs to console as backup
             → ready for any integration

Contact Form → uses /api/contact endpoint
Email Capture → also uses /api/contact endpoint
```

Both forms are ready - just need to pick a backend!