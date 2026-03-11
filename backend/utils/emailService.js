// backend/utils/emailService.js
// Sends OTP via email using Resend

require('dotenv').config();
const { Resend } = require('resend');

// Initialize Resend with the provided API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send OTP via email
 * @param {string} email  - Recipient email address
 * @param {string} otp    - 6-digit OTP code
 * @returns {boolean}     - true if sent successfully
 */
async function sendOTPEmail(email, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Gwen Beauty Studio <onboarding@resend.dev>',
      to: email,
      subject: `${otp} is your Gwen Beauty OTP`,
      html: `
                <div style="font-family: 'Georgia', serif; max-width: 520px; margin: 0 auto; color: #2c2c2c;">
                    <div style="background: #2c2c2c; padding: 32px; text-align: center;">
                        <h1 style="color: #f4f0eb; letter-spacing: 4px; font-size: 18px; margin: 0; text-transform: uppercase;">Gwen Beauty Studio</h1>
                    </div>

                    <div style="padding: 40px 32px; background: #faf9f6; border: 1px solid #e8e0d8;">
                        <p style="font-size: 15px; margin-bottom: 8px;">Hello,</p>
                        <p style="font-size: 15px; color: #666; line-height: 1.8; margin-bottom: 32px;">
                            Please use the following One-Time Password to complete your registration. This code expires in <strong>5 minutes</strong>.
                        </p>

                        <div style="text-align: center; margin: 36px 0;">
                            <div style="display: inline-block; background: #2c2c2c; color: #f4f0eb; font-size: 38px; font-weight: bold; letter-spacing: 12px; padding: 20px 40px; border-radius: 2px;">
                                ${otp}
                            </div>
                        </div>

                        <p style="font-size: 13px; color: #999; text-align: center; margin-top: 32px;">
                            If you did not request this code, please ignore this email.<br>
                            Never share your OTP with anyone.
                        </p>
                    </div>

                    <div style="padding: 20px 32px; text-align: center; background: #f0ebe4;">
                        <p style="font-size: 11px; color: #aaa; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
                            &copy; 2025 Gwen Beauty Studio. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
    });

    if (error) {
      console.error("❌ Email OTP Error from Resend:", error);
      return false;
    }

    console.log(`✅ OTP email sent to ${email} — Message ID: ${data.id}`);
    return true;
  } catch (error) {
    console.error("❌ Email OTP Catch Error:", error.message);
    return false;
  }
}

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

module.exports = { sendOTPEmail, sendContactEmail };
