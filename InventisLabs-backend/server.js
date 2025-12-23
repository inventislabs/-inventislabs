const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

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
    let mainText = 'Thank you for reaching out to us. We have received your message and our team is currently reviewing it. We aim to respond to all inquiries within 24 hours.';
    let greeting = `Hello, ${name}`;

    if (isNewsletter) {
        title = 'Welcome to the Community';
        mainText = 'Thank you for subscribing to the Inventis Labs newsletter. You\'re now part of a community dedicated to building a safer future with advanced earthquake early warning technology.';
    } else if (isAdmin) {
        title = 'New Contact Submission';
        mainText = 'You have received a new message from the contact form. Here are the details:';
        greeting = 'New Submission';
    }

    const detailsHtml = isAdmin ? `
        <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin: 24px 0; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px;"><strong>Name:</strong> <span style="color: #111827;">${name}</span></p>
            <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px;"><strong>Email:</strong> <span style="color: #111827;">${details.email}</span></p>
            <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px;"><strong>Subject:</strong> <span style="color: #111827;">${details.subject}</span></p>
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed #d1d5db;">
                <strong style="display: block; margin-bottom: 8px; color: #374151; font-size: 14px;">Message:</strong>
                <p style="margin: 0; white-space: pre-wrap; color: #4b5563; font-size: 14px; line-height: 1.6;">${details.message}</p>
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
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            body { margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; background-color: #f3f4f6; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
            .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 48px 40px; text-align: center; position: relative; overflow: hidden; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none; }
            .logo-text { color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; margin: 0; position: relative; z-index: 10; }
            .content { padding: 48px 40px; color: #374151; }
            .greeting { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 24px; line-height: 1.3; }
            .badge { display: inline-block; padding: 6px 16px; background-color: #eff6ff; color: #2563eb; border-radius: 9999px; font-size: 14px; font-weight: 600; margin-bottom: 24px; }
            .message { font-size: 16px; line-height: 1.8; color: #4b5563; margin-bottom: 32px; }
            .cta-button { display: inline-block; background-color: #2563eb; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; transition: background-color 0.2s; text-align: center; width: auto; min-width: 160px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); }
            .divider { height: 1px; background-color: #e5e7eb; margin: 40px 0; }
            .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
            .feature-item { background: #f9fafb; padding: 20px; border-radius: 16px; }
            .feature-title { font-weight: 700; color: #111827; font-size: 14px; margin-bottom: 8px; display: block; }
            .feature-text { font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0; }
            .footer { background-color: #f9fafb; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb; }
            .social-links { margin-bottom: 24px; }
            .social-icon { display: inline-block; width: 36px; height: 36px; background-color: #e5e7eb; border-radius: 50%; margin: 0 6px; line-height: 36px; color: #6b7280; text-decoration: none; font-size: 14px; }
            .footer-text { color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0; }
            .copyright { color: #9ca3af; font-size: 12px; margin-top: 16px; font-weight: 500; }
            @media (max-width: 600px) {
                .container { width: 100%; border-radius: 0; }
                .header { padding: 40px 24px; }
                .content { padding: 32px 24px; }
                .features-grid { grid-template-columns: 1fr; }
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
                    <div class="badge">${title}</div>
                    <h2 class="greeting">${greeting}</h2>
                    <p class="message">
                        ${mainText}
                    </p>
                    
                    ${detailsHtml}
                    
                    ${!isAdmin ? `
                    <div class="divider"></div>
                    
                    <div class="features-grid">
                        <div class="feature-item">
                            <span class="feature-title">Real-time Detection</span>
                            <p class="feature-text">Advanced sensor networks providing instant earthquake alerts.</p>
                        </div>
                        <div class="feature-item">
                            <span class="feature-title">Mass Coverage</span>
                            <p class="feature-text">Protecting communities with widespread regional monitoring.</p>
                        </div>
                    </div>

                    <div style="text-align: center;">
                        <a href="http://localhost:5173" class="cta-button">Visit Website</a>
                    </div>
                    ` : ''}
                </div>
                <div class="footer">
                    <div class="social-links">
                        <a href="#" class="social-icon">Li</a>
                        <a href="#" class="social-icon">Kw</a>
                        <a href="#" class="social-icon">Fb</a>
                        <a href="#" class="social-icon">In</a>
                    </div>
                    <p class="footer-text">
                        Tech Park, Sector 62, Noida, Uttar Pradesh 201301<br>
                        Questions? Email us at <a href="mailto:info@inventislabs.in" style="color: #2563eb; text-decoration: none;">info@inventislabs.in</a>
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

app.post('/api/contact', async (req, res) => {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email) {
        return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    try {
        const mailOptionsUser = {
            from: `"Inventis Labs Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `We received your message: ${subject || 'Inquiry'}`,
            html: getEmailTemplate(fullName, 'contact')
        };

        const mailOptionsAdmin = {
            from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: `New Contact Submission: ${subject || 'Website Inquiry'}`,
            html: getEmailTemplate(fullName, 'admin', { email, subject, message })
        };

        await Promise.all([
            transporter.sendMail(mailOptionsUser),
            transporter.sendMail(mailOptionsAdmin)
        ]);

        res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('[Error Sending Email]', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

app.post('/api/newsletter', async (req, res) => {
    const { email, privacy } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (!privacy) {
        return res.status(400).json({ success: false, message: 'Privacy policy agreement required.' });
    }

    try {
        const mailOptions = {
            from: `"Inventis Labs Newsletter" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Inventis Labs Newsletter!',
            html: getEmailTemplate('Subscriber', 'newsletter')
        };

        await transporter.sendMail(mailOptions);

        console.log(`[Newsletter] New subscriber: ${email}`);
        res.status(200).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('[Newsletter Error]', error);
        res.status(500).json({ success: false, message: 'Failed to subscribe.' });
    }
});

app.get('/', (req, res) => {
    res.send('Inventis Labs Email Service is Running');
});

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📧 configured with user: ${process.env.EMAIL_USER ? 'Set' : 'Not Set'}\n`);
});
