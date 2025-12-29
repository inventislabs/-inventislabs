const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const getEmailTemplate = (name, type = 'contact', details = {}) => {
    const isNewsletter = type === 'newsletter';
    const isAdmin = type === 'admin';

    let title = 'Message Received';
    let mainText = 'Thank you for reaching out. We have received your message and our team is currently reviewing it. We aim to respond within 24 hours.';
    let greeting = `Hello, ${name}`;

    if (isNewsletter) {
        title = 'Welcome to the Community';
        mainText = 'Thank you for subscribing to the Inventis Labs newsletter. You\'re now part of a community dedicated to building a safer future with advanced earthquake early warning technology.';
    } else if (isAdmin) {
        title = 'New Submission';
        mainText = 'You have received a new contact form submission. Details are provided below:';
        greeting = 'Admin Notification';
    }

    const detailsHtml = isAdmin ? `
        <div style="background-color: #f5f5f7; border-radius: 16px; padding: 24px; margin: 32px 0;">
            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                <tr>
                    <td style="padding-bottom: 16px; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
                    <td style="padding-bottom: 16px; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.email}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Subject</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.subject}</td>
                </tr>
            </table>
            <div style="margin-top: 16px;">
                <p style="color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Message</p>
                <p style="color: #1d1d1f; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details.message}</p>
            </div>
        </div>
    ` : '';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inventis Labs</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; padding: 40px 0; background-color: #f5f5f7; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
            .header { background-color: #000000; padding: 40px; text-align: center; }
            .logo-text { color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; margin: 0; }
            .content { padding: 48px 40px; }
            .status-badge { display: inline-block; padding: 6px 12px; background-color: #f5f5f7; color: #1d1d1f; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 32px; }
            .greeting { font-size: 28px; font-weight: 700; color: #1d1d1f; margin: 0 0 16px 0; letter-spacing: -0.5px; }
            .message { font-size: 16px; line-height: 1.6; color: #424245; margin: 0 0 32px 0; }
            .cta-button { display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 28px; border-radius: 99px; text-decoration: none; font-weight: 500; font-size: 14px; transition: opacity 0.2s; text-align: center; border: 1px solid rgba(0,0,0,0); }
            .cta-button:hover { opacity: 0.8; }
            .divider { height: 1px; background-color: #e5e5e5; margin: 40px 0; }
            .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
            .feature-item { text-align: left; }
            .feature-title { font-weight: 600; color: #1d1d1f; font-size: 14px; margin-bottom: 4px; display: block; }
            .feature-text { font-size: 13px; color: #86868b; line-height: 1.4; margin: 0; }
            .footer { background-color: #f5f5f7; padding: 32px 40px; text-align: center; border-top: 1px solid #e1e1e1; }
            .footer-links { margin-bottom: 24px; }
            .footer-link { color: #86868b; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500; }
            .footer-link:hover { color: #1d1d1f; }
            .footer-text { color: #86868b; font-size: 11px; line-height: 1.5; margin: 0; }
            .copyright { color: #86868b; font-size: 11px; margin-top: 16px; }
            @media only screen and (max-width: 600px) {
                .container { width: 100%; border-radius: 0; }
                .features-grid { grid-template-columns: 1fr; }
                .content { padding: 32px 24px; }
                .header { padding: 32px 24px; }
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h1 class="logo-text">Inventis Labs</h1>
                </div>
                <div class="content">
                    <div class="status-badge">${title}</div>
                    <h2 class="greeting">${greeting}</h2>
                    <p class="message">${mainText}</p>
                    ${detailsHtml}
                    ${!isAdmin ? `
                    <div class="divider"></div>
                    <div class="features-grid">
                        <div class="feature-item">
                            <span class="feature-title">Real-time Detection</span>
                            <p class="feature-text">Precision sensors for instant alerts.</p>
                        </div>
                        <div class="feature-item">
                            <span class="feature-title">Global Coverage</span>
                            <p class="feature-text">Monitoring communities everywhere.</p>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <a href="${CLIENT_URL}" class="cta-button">Visit Website</a>
                    </div>
                    ` : ''}
                </div>
                <div class="footer">
                    <div class="footer-links">
                        <a href="#" class="footer-link">LinkedIn</a>
                        <a href="#" class="footer-link">Twitter</a>
                        <a href="#" class="footer-link">Instagram</a>
                    </div>
                    <p class="footer-text">
                        Inventis Labs Pvt. Ltd.<br>
                        Tech Park, Sector 62, Noida<br>
                        Questions? <a href="mailto:info@inventislabs.in" style="color: #1d1d1f; text-decoration: underline;">info@inventislabs.in</a>
                    </p>
                    <div class="copyright">
                        &copy; ${new Date().getFullYear()} Inventis Labs Pvt. Ltd.
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { transporter, getEmailTemplate };
