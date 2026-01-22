const Subscriber = require("../models/Subscriber");
const {
  sendEmail,
  getEmailTemplate,
  quickEmailTemplates,
} = require("../services/emailService");
require("dotenv").config();

exports.subscribe = async (req, res) => {
  const { email, privacy } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  if (!privacy)
    return res
      .status(400)
      .json({ success: false, message: "Privacy policy agreement required." });

  try {
    // 1. Check for duplicates
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed to our newsletter!",
      });
    }

    // 2. Save new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // 3. Send welcome email
    const emailTemplate = quickEmailTemplates.newsletterWelcome();
    const mailOptions = {
      from: `"Inventis Labs Newsletter" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailTemplate.subject,
      html: getEmailTemplate("Subscriber", emailTemplate.type),
    };

    await sendEmail(mailOptions);

    // 4. Notify admin (optional)
    const adminMailOptions = {
      from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Newsletter Subscription: ${email}`,
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    };

    // Send admin notification without blocking response
    sendEmail(adminMailOptions).catch((err) =>
      console.error("Admin notification failed:", err.message),
    );

    res.status(200).json({
      success: true,
      message: "Successfully subscribed! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("[Newsletter Error]", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again.",
    });
  }
};
