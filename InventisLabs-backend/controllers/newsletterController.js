const Subscriber = require('../models/Subscriber');
const { transporter, getEmailTemplate } = require('../services/emailService');
require('dotenv').config();

exports.subscribe = async (req, res) => {
    const { email, privacy } = req.body;

    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
    if (!privacy) return res.status(400).json({ success: false, message: 'Privacy policy agreement required.' });

    try {
        // 1. Save Subscriber
        // Check for duplicates
        const existing = await Subscriber.findOne({ email });
        if (!existing) {
            const newSubscriber = new Subscriber({ email });
            await newSubscriber.save();
        }

        // 2. Send Email
        const mailOptions = {
            from: `"Inventis Labs Newsletter" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Inventis Labs Newsletter!',
            html: getEmailTemplate('Subscriber', 'newsletter')
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('[Newsletter Error]', error);
        res.status(500).json({ success: false, message: 'Failed to subscribe.' });
    }
};
