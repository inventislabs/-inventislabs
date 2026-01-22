const Contact = require("../models/Contact");
const {
  sendEmail,
  getEmailTemplate,
  quickEmailTemplates,
} = require("../services/emailService");
require("dotenv").config();

exports.submitContact = async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Name and Email are required." });
  }

  try {
    // 1. Save to MongoDB
    const newContact = new Contact({ fullName, email, subject, message });
    await newContact.save();

    // 2. Send Emails
    const userEmailTemplate = quickEmailTemplates.contactConfirmation(fullName);
    const mailOptionsUser = {
      from: `"Inventis Labs Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: userEmailTemplate.subject,
      html: getEmailTemplate(fullName, userEmailTemplate.type),
    };

    const adminEmailTemplate = quickEmailTemplates.adminContactNotification(
      fullName,
      subject,
    );
    const mailOptionsAdmin = {
      from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: adminEmailTemplate.subject,
      html: getEmailTemplate(fullName, adminEmailTemplate.type, {
        email,
        subject,
        message,
      }),
    };

    // Send emails in parallel with retry logic
    await Promise.all([
      sendEmail(mailOptionsUser),
      sendEmail(mailOptionsAdmin),
    ]);

    res.status(200).json({
      success: true,
      message: "Message received! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("[Error Contact API]", error);
    res.status(500).json({
      success: false,
      message: "Failed to process request. Please try again.",
    });
  }
};
