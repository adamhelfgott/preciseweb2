import { NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role, message, source = 'contact-form' } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Convex if available
    if (process.env.NEXT_PUBLIC_CONVEX_URL) {
      try {
        // Only initialize Convex client if URL is provided
        const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
        await convex.mutation(api.contacts.createContact, {
          name,
          email,
          company: company || undefined,
          role: role || undefined,
          message,
          source,
        });
      } catch (convexError) {
        console.error('Convex error:', convexError);
        // Continue even if Convex fails - don't lose the lead
      }
    }

    // Log for backup (in case Convex is not configured)
    console.log('New contact form submission:', {
      name,
      email,
      company,
      role,
      message,
      source,
      timestamp: new Date().toISOString()
    });

    // Simple CSV log for production backup
    if (process.env.NODE_ENV === 'production') {
      const csvLine = `"${new Date().toISOString()}","${name}","${email}","${company || ''}","${role || ''}","${source}","${message.replace(/"/g, '""')}"\n`;
      console.log('CSV:', csvLine);
    }

    // Future integrations:
    // - Send to CRM (HubSpot, Salesforce)
    // - Send notification email (SendGrid, Postmark)
    // - Add to email list (Mailchimp, ConvertKit)
    // - Send Slack notification

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. We\'ll be in touch within 24 hours.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}