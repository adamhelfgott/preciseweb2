import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Save to database (Supabase, Convex, etc.)
    // 2. Send to CRM (HubSpot, Salesforce, etc.)
    // 3. Send notification email
    // 4. Add to email marketing list

    // For now, we'll just log it and return success
    console.log('New contact form submission:', {
      name,
      email,
      company,
      role,
      message,
      timestamp: new Date().toISOString()
    });

    // Simple CSV append for demo (in production use a proper database)
    if (process.env.NODE_ENV === 'production') {
      // You could append to a CSV file or send to a webhook
      const csvLine = `"${new Date().toISOString()}","${name}","${email}","${company || ''}","${role || ''}","${message.replace(/"/g, '""')}"\n`;
      console.log('CSV:', csvLine);
    }

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