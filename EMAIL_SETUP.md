# Email Setup for Contact Form

## Overview
The contact form now sends emails to info@precise.ai when submitted. You need to configure SMTP settings in your environment variables.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com          # Your SMTP server
SMTP_PORT=587                     # Usually 587 for TLS, 465 for SSL
SMTP_SECURE=false                 # true for 465, false for other ports
SMTP_USER=your-email@gmail.com    # Your email address
SMTP_PASS=your-app-password       # Your email password or app-specific password
```

## Email Service Options

### Option 1: Gmail (Recommended for testing)
1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password: https://myaccount.google.com/apppasswords
3. Use the app password as `SMTP_PASS`

### Option 2: SendGrid (Recommended for production)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Option 3: AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-smtp-username
SMTP_PASS=your-aws-smtp-password
```

### Option 4: Resend (Modern alternative)
For Resend, you'd modify the code to use their SDK instead of SMTP:
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
```

## Installation

First, install nodemailer:
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Email Format

The email sent to info@precise.ai includes:
- Subject: "New Contact Form Submission from [Name]"
- From: Your SMTP email (appears as "Precise Contact Form")
- Reply-To: The sender's email (so you can reply directly)
- Body: Formatted HTML table with all form fields

## Testing

1. Set up your environment variables
2. Submit a test form
3. Check info@precise.ai inbox
4. Check console logs for any errors

## Notes

- Email sending is non-blocking - form submission succeeds even if email fails
- All submissions are still logged to console as backup
- Convex storage (if configured) still works independently