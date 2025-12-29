const Contact = require('../models/Contact');
const { transporter, getEmailTemplate } = require('../services/emailService');
require('dotenv').config();

exports.submitContact = async (req, res) => {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email) {
        return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    try {
        // 1. Save to MongoDB
        const newContact = new Contact({ fullName, email, subject, message });
        await newContact.save();

        // 2. Send Emails
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

        res.status(200).json({ success: true, message: 'Message saved and emails sent.' });

    } catch (error) {
        console.error('[Error Contact API]', error);
        res.status(500).json({ success: false, message: 'Failed to process request' });
    }
};
