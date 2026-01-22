const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const {
  sendEmail,
  getEmailTemplate,
  quickEmailTemplates,
} = require("../services/emailService");
require("dotenv").config();

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ pinned: -1, postedDate: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

exports.submitJobApplication = async (req, res) => {
  const {
    jobId,
    position,
    fullName,
    email,
    phone,
    experience,
    resumeUrl,
    portfolioUrl,
    linkedinUrl,
    coverLetter,
  } = req.body;

  // Validation
  if (!jobId || !position || !fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Job ID, position, name, and email are required.",
    });
  }

  try {
    // 1. Check if user already applied for this job
    const existingApplication = await JobApplication.findOne({ email, jobId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this position.",
      });
    }

    // 2. Save application to database
    const newApplication = new JobApplication({
      jobId,
      position,
      fullName,
      email,
      phone,
      experience,
      resumeUrl,
      portfolioUrl,
      linkedinUrl,
      coverLetter,
    });
    await newApplication.save();

    // 3. Send confirmation email to applicant
    const userEmailTemplate = quickEmailTemplates.jobApplicationConfirmation(
      fullName,
      position,
    );
    const mailOptionsUser = {
      from: `"Inventis Labs Careers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: userEmailTemplate.subject,
      html: getEmailTemplate(fullName, userEmailTemplate.type, { position }),
    };

    // 4. Send notification to admin/HR
    const adminEmailTemplate =
      quickEmailTemplates.adminJobApplicationNotification(fullName, position);
    const mailOptionsAdmin = {
      from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: adminEmailTemplate.subject,
      html: getEmailTemplate(fullName, adminEmailTemplate.type, {
        email,
        phone,
        position,
        experience,
        resumeUrl,
        portfolioUrl,
        linkedinUrl,
        coverLetter,
      }),
    };

    // Send both emails in parallel
    await Promise.all([
      sendEmail(mailOptionsUser),
      sendEmail(mailOptionsAdmin),
    ]);

    res.status(200).json({
      success: true,
      message:
        "Application submitted successfully! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("[Job Application Error]", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit application. Please try again.",
    });
  }
};

// Admin: Get all job applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedDate: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("[Get Applications Error]", error);
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
    });
  }
};

// Admin: Get applications for a specific job
exports.getApplicationsByJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await JobApplication.find({ jobId }).sort({
      appliedDate: -1,
    });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("[Get Applications By Job Error]", error);
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
    });
  }
};

// Admin: Update application status
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("[Update Application Error]", error);
    res.status(500).json({
      success: false,
      message: "Error updating application",
    });
  }
};
