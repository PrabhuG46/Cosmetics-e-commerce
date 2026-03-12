// backend/utils/emailService.js
// Sends OTP via email using Resend

require('dotenv').config();
const { Resend } = require('resend');

// Initialize Resend with the provided API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send Contact Form inquiry email to studio owner
 * @param {string} senderName  - Customer full name
 * @param {string} senderEmail - Customer email
 * @param {string} message     - Customer message
 * @returns {boolean}          - true if sent successfully
 */
async function sendContactEmail(senderName, senderEmail, message) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Gwen Beauty Studio Contact <onboarding@resend.dev>',
      to: 'prabhuak2446@gmail.com',
      replyTo: senderEmail,
      subject: `New Inquiry from ${senderName} — Gwen Beauty Studio`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; color: #2c2c2c;">
          <div style="background: #2c2c2c; padding: 28px 32px; text-align: center;">
            <h1 style="color: #f4f0eb; letter-spacing: 4px; font-size: 16px; margin: 0; text-transform: uppercase;">Gwen Beauty Studio</h1>
            <p style="color: #aaa; margin: 6px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">New Contact Inquiry</p>
          </div>

          <div style="padding: 36px 32px; background: #faf9f6; border: 1px solid #e8e0d8; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; width: 110px;">From</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600;">${senderName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${senderEmail}" style="color: #2c2c2c;">${senderEmail}</a></td>
              </tr>
            </table>

            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 10px;">Message</p>
            <div style="background: #f0ebe4; padding: 20px; border-radius: 2px; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${message}</div>

            <p style="margin-top: 28px; font-size: 13px; color: #aaa; text-align: center;">
              Hit <strong>Reply</strong> to respond directly to ${senderName}.
            </p>
          </div>

          <div style="padding: 18px 32px; text-align: center; background: #f0ebe4;">
            <p style="font-size: 11px; color: #aaa; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
              &copy; 2025 Gwen Beauty Studio. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Contact Email Error from Resend:', error);
      return false;
    }

    console.log(`✅ Contact inquiry from ${senderName} (${senderEmail}) delivered — ID: ${data.id}`);
    return true;
  } catch (error) {
    console.error('❌ Contact Email Catch Error:', error.message);
    return false;
  }
}

module.exports = { sendContactEmail };
