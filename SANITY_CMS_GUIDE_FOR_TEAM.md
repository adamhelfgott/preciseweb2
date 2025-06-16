# Sanity CMS Guide for Precise.ai Marketing Team

## Why Two CMS Systems Exist

### The Real Story
When I was implementing CMS for your site, I started with Sanity (the industry standard). However, when I got to certain pages like Pricing and Contact that have forms and interactive elements, I realized:

1. **Sanity is great for content** but not ideal for pages with forms, calculators, or real-time interactions
2. **You already had Convex set up** for your chat features and real-time data
3. **Some pages needed both** - content management AND form handling

So I created a Convex-based CMS for those specific pages because:
- **Pricing Page**: Has a form that collects leads - Convex can store both the content AND form submissions
- **Contact Page**: Has contact form - needs to handle form data
- **Company Page**: I built this before realizing you already had team data in Sanity
- **Agent Intelligence**: Has interactive demos that need real-time updates

### What This Means for You

**USE SANITY (Primary CMS)** for 90% of content:
- ✅ All marketing copy
- ✅ Navigation & Footer  
- ✅ Hero sections
- ✅ Benefits, features, testimonials
- ✅ Case studies
- ✅ Legal pages
- **Access**: https://preciseweb.vercel.app/studio

**USE CONVEX (Only When Needed)** for:
- ❌ Actually, you probably don't need to use it
- ⚠️ Only if you need to update Company, Pricing, Contact, or Agent Intelligence pages
- **Access**: https://preciseweb.vercel.app/cms-admin

### The Bottom Line
I overcomplicated things by creating two systems. Just use Sanity Studio for everything. The Convex CMS is there as a backup but you can ignore it.

## How to Login to Sanity Studio

1. Go to https://preciseweb.vercel.app/studio
2. Click "Login" 
3. Use your Sanity account credentials (same as sanity.io)
4. If you don't have access, ask Adam to invite you to the project

## What You Can Edit in Sanity

### ✅ Global Elements
- **Navigation Links** - Menu items and order
- **Footer** - All footer content, links, social media, security badges

### ✅ Homepage
- **Hero Section** - Headline, subheadline, CTA buttons
- **Value Props** - All value proposition cards
- **How It Works** - Steps and descriptions
- **Logo Bar** - Client logos and headline
- **Team Section** - Team member info, photos, bios
- **CTA Section** - Bottom call-to-action

### ✅ Marketing Pages

#### Data Owners/Controllers Page
- Hero section text and CTAs
- Benefits section (all benefit cards)
- Process steps
- Testimonials
- FAQ items

#### Advertisers/Media Buyers Page  
- Hero section with animation terms
- Benefits section
- Integration platforms
- How it works steps

#### Platforms Page
- Hero section
- Platform types and descriptions
- Integration features

#### Measurement Partners Page
- Hero section
- Integration benefits
- Attribution flow steps

#### Case Studies Page
- Individual case studies (client, challenge, solution, results)
- Hero section
- CTA section

#### Compliance Page
- Hero title and description
- Key benefits
- Data broker comparison
- Technical architecture features
- Compliance standards
- CTA section

### ✅ Legal Pages
- **Privacy Policy** - Full policy content with sections
- **Terms of Service** - Full terms content with sections

## What's NOT in Sanity (Uses Convex Instead)

These pages use the alternative CMS at `/cms-admin`:
- Company/Team page structure
- Pricing page content
- Contact page info
- Agent Intelligence page

## How to Edit Content

### Finding Content
1. Login to Sanity Studio
2. Look at the left sidebar for document types:
   - `Hero Sections` - For page heroes
   - `Navigation Links` - For menu items
   - `Team Members` - For team info
   - `Case Studies` - For case study content
   - `Page Content` - For various page sections
   - `Legal Pages` - For privacy/terms

### Editing Process
1. Click on the document type
2. Select the specific item to edit
3. Make your changes in the form fields
4. Click "Publish" (bottom right) to make changes live
5. Changes appear immediately on the website

### Best Practices
- Always preview before publishing
- Use consistent formatting
- Don't delete fields - leave them empty if not needed
- Save drafts frequently
- Add alt text for images

## Common Tasks

### Update Navigation Menu
1. Go to "Navigation Links"
2. Edit label or href
3. Change order number to reorder items
4. Publish

### Add a Team Member
1. Go to "Team Members"
2. Click "+" to create new
3. Fill in name, role, bio, image
4. Set order number for position
5. Publish

### Update Hero Text
1. Go to "Hero Sections"
2. Find the page you want (Home, Data Owners, etc.)
3. Update headline, description, or CTA text
4. Publish

### Edit Case Study
1. Go to "Case Studies"
2. Select the case study
3. Update any field (results, testimonial, etc.)
4. Publish

## Troubleshooting

### Can't see changes?
- Make sure you clicked "Publish" not just saved
- Try hard refresh (Cmd+Shift+R on Mac)
- Check you're on the right URL (preciseweb.vercel.app)

### Can't login?
- Contact Adam for access
- Make sure you're using your Sanity account

### Content looks broken?
- Don't panic! The site has fallback content
- Contact dev team if formatting issues persist

## Contact for Help

- **Sanity Access**: Adam Helfgott
- **Technical Issues**: Development team
- **Content Questions**: Marketing lead

## Important URLs

- **Live Site**: https://preciseweb.vercel.app
- **Sanity Studio**: https://preciseweb.vercel.app/studio
- **Backup CMS**: https://preciseweb.vercel.app/cms-admin (only if needed)