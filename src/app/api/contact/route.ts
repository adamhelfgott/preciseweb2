import { NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

    // Send email notification
    try {
      const roleLabels: Record<string, string> = {
        'media-buyer': 'Media Buyer / Advertiser',
        'data-owner': 'Data Owner / Publisher',
        'platform': 'Platform / Technology Partner',
        'other': 'Other'
      };

      const mailOptions = {
        from: `"Precise Contact Form" <${process.env.SMTP_USER}>`,
        to: 'info@precise.ai',
        subject: `New Contact Form Submission from ${name}`,
        text: `
New contact form submission:

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Role: ${roleLabels[role] || role || 'Not provided'}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Role:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${roleLabels[role] || role || 'Not provided'}</td>
            </tr>
          </table>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
        `,
        replyTo: email, // This allows replying directly to the sender
      };

      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to info@precise.ai');
      } else {
        console.log('Email not sent - SMTP not configured');
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the whole request if email fails
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