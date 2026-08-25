import nodemailer from 'nodemailer';

interface LeadEmailPayload {
  name: string;
  phone: string;
  email?: string;
  projectInterest?: string;
  preferredDate?: string;
  message?: string;
}

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'propertiespavan@gmail.com';

/**
 * Sends a stylized HTML email alert to Pavan Kumar when a new customer submits a site visit / inquiry.
 */
export async function sendLeadNotificationEmail(lead: LeadEmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Clean phone for WhatsApp / Tel links
    const cleanPhone = (lead.phone || '').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
      `Hello ${lead.name}, this is Pavan Kumar from Pavan Properties. Thank you for your inquiry on ${lead.projectInterest || 'our verified layouts'}. I would be pleased to assist with your site visit schedule and documentation.`
    )}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f6ee; margin: 0; padding: 24px; color: #142334; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #eae3e0; overflow: hidden; box-shadow: 0 4px 16px rgba(20, 35, 52, 0.06); }
            .header { background: #142334; color: #ffffff; padding: 28px; text-align: center; }
            .header h1 { margin: 0 0 4px; font-size: 22px; font-family: Georgia, serif; color: #ffffff; }
            .header p { margin: 0; font-size: 13px; color: #c9ad98; letter-spacing: 1px; text-transform: uppercase; }
            .content { padding: 28px; }
            .badge { display: inline-block; background: #f4f0ea; color: #715343; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 16px; border: 1px solid #eae3e0; }
            .field-row { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f4f0ea; }
            .label { font-size: 11px; text-transform: uppercase; color: #715343; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { font-size: 16px; color: #142334; font-weight: 600; }
            .value-highlight { font-size: 18px; color: #a67d64; font-weight: 700; }
            .actions { margin-top: 28px; text-align: center; display: flex; gap: 12px; justify-content: center; }
            .btn-wa { display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-right: 8px; }
            .btn-call { display: inline-block; background: #142334; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; }
            .footer { background: #f9f6ee; padding: 16px 28px; text-align: center; font-size: 11px; color: #715343; border-top: 1px solid #eae3e0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>PAVAN PROPERTIES</h1>
              <p>New Site Visit & Customer Inquiry</p>
            </div>
            <div class="content">
              <span class="badge">🚨 Direct Lead from Website</span>
              
              <div class="field-row">
                <div class="label">Customer Full Name</div>
                <div class="value">${lead.name}</div>
              </div>

              <div class="field-row">
                <div class="label">Mobile / Phone Number</div>
                <div class="value-highlight">
                  <a href="tel:${cleanPhone}" style="color: #142334; text-decoration: none;">+91 ${cleanPhone}</a>
                </div>
              </div>

              ${lead.email ? `
              <div class="field-row">
                <div class="label">Customer Email Address</div>
                <div class="value"><a href="mailto:${lead.email}" style="color: #142334;">${lead.email}</a></div>
              </div>` : ''}

              <div class="field-row">
                <div class="label">Property / Layout Interested In</div>
                <div class="value" style="color: #a67d64;">${lead.projectInterest || 'General Inquiry'}</div>
              </div>

              ${lead.preferredDate ? `
              <div class="field-row">
                <div class="label">Preferred Site Visit Date & Time</div>
                <div class="value">${lead.preferredDate}</div>
              </div>` : ''}

              ${lead.message ? `
              <div class="field-row">
                <div class="label">Customer Message / Requirements</div>
                <div class="value" style="font-weight: 400; font-size: 14px; line-height: 1.5;">${lead.message}</div>
              </div>` : ''}

              <div class="actions">
                <a href="${whatsappUrl}" class="btn-wa">📲 Chat on WhatsApp</a>
                <a href="tel:${cleanPhone}" class="btn-call">📞 Call Customer</a>
              </div>
            </div>

            <div class="footer">
              Sent automatically to <strong>${ADMIN_EMAIL}</strong> • Pavan Properties Real Estate Portal
            </div>
          </div>
        </body>
      </html>
    `;

    // If SMTP credentials are configured, send email via nodemailer
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Pavan Properties Lead Alert" <${smtpUser}>`,
        to: ADMIN_EMAIL,
        replyTo: lead.email || undefined,
        subject: `🏡 New Site Visit Inquiry: ${lead.name} — ${lead.projectInterest || 'Pavan Properties'}`,
        html: htmlContent,
      });

      console.log('✅ Lead email notification sent successfully to', ADMIN_EMAIL, info.messageId);
      return { success: true, messageId: info.messageId };
    } else {
      // Fallback info when SMTP_USER/SMTP_PASS are not yet set
      console.log(`📧 [Lead Notification Prepared for ${ADMIN_EMAIL}] Customer: ${lead.name} (${lead.phone}) for ${lead.projectInterest}`);
      return { success: true };
    }
  } catch (error: any) {
    console.error('❌ Failed to dispatch lead notification email:', error.message);
    return { success: false, error: error.message };
  }
}
