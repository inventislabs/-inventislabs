const PilotRequest = require("../models/PilotRequest");
const {
  sendEmail,
  getEmailTemplate,
  quickEmailTemplates,
} = require("../services/emailService");
require("dotenv").config();

exports.submitPilotRequest = async (req, res) => {
  const {
    fullName,
    organizationType,
    phone,
    email,
    location,
    areaOfInterest,
    message,
  } = req.body;

  // Validation
  if (
    !fullName ||
    !organizationType ||
    !phone ||
    !email ||
    !location ||
    !areaOfInterest
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  try {
    // 1. Save to MongoDB
    const newRequest = new PilotRequest({
      fullName,
      organizationType,
      phone,
      email,
      location,
      areaOfInterest: Array.isArray(areaOfInterest)
        ? areaOfInterest
        : [areaOfInterest],
      message,
    });
    await newRequest.save();

    // 2. Send confirmation email to user
    const userEmailTemplate =
      quickEmailTemplates.pilotRequestConfirmation(fullName);
    const mailOptionsUser = {
      from: `"Inventis Labs Enterprise" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: userEmailTemplate.subject,
      html: getEmailTemplate(fullName, userEmailTemplate.type, {
        organizationType,
        location,
        areaOfInterest: Array.isArray(areaOfInterest)
          ? areaOfInterest.join(", ")
          : areaOfInterest,
      }),
    };

    // 3. Send notification to admin
    const adminEmailTemplate =
      quickEmailTemplates.adminPilotRequestNotification(
        fullName,
        organizationType,
      );
    const mailOptionsAdmin = {
      from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: adminEmailTemplate.subject,
      html: getEmailTemplate(fullName, adminEmailTemplate.type, {
        email,
        organizationType,
        phone,
        location,
        areaOfInterest: Array.isArray(areaOfInterest)
          ? areaOfInterest.join(", ")
          : areaOfInterest,
        message,
      }),
    };

    // Send emails in parallel
    await Promise.all([
      sendEmail(mailOptionsUser),
      sendEmail(mailOptionsAdmin),
    ]);

    res.status(200).json({
      success: true,
      message:
        "Request submitted successfully! Our team will contact you within 24-48 hours.",
    });
  } catch (error) {
    console.error("[Pilot Request Error]", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit request. Please try again.",
    });
  }
};

// Admin: Get all pilot requests
exports.getAllPilotRequests = async (req, res) => {
  try {
    const requests = await PilotRequest.find().sort({ submittedDate: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("[Get Pilot Requests Error]", error);
    res.status(500).json({
      success: false,
      message: "Error fetching requests",
    });
  }
};

// Admin: Get single pilot request
exports.getPilotRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await PilotRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("[Get Pilot Request Error]", error);
    res.status(500).json({
      success: false,
      message: "Error fetching request",
    });
  }
};

// Admin: Update pilot request status
exports.updatePilotRequest = async (req, res) => {
  const { id } = req.params;
  const { status, priority, notes, read } = req.body;

  try {
    const request = await PilotRequest.findByIdAndUpdate(
      id,
      { status, priority, notes, read },
      { new: true },
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request updated successfully",
      data: request,
    });
  } catch (error) {
    console.error("[Update Pilot Request Error]", error);
    res.status(500).json({
      success: false,
      message: "Error updating request",
    });
  }
};

// Admin: Delete pilot request
exports.deletePilotRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await PilotRequest.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    console.error("[Delete Pilot Request Error]", error);
    res.status(500).json({
      success: false,
      message: "Error deleting request",
    });
  }
};
