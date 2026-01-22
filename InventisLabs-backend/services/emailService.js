const nodemailer = require("nodemailer");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending function with retry logic
const sendEmail = async (mailOptions, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${mailOptions.to}`);
      return info;
    } catch (error) {
      console.error(`❌ Email send attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

const getEmailTemplate = (name, type = "contact", details = {}) => {
  const isNewsletter = type === "newsletter";
  const isAdmin = type === "admin";
  const isJobApplication = type === "job-application";
  const isJobApplicationAdmin = type === "job-application-admin";
  const isPressKitRequest = type === "presskit-request";
  const isPilotRequest = type === "pilot-request";
  const isPilotRequestAdmin = type === "pilot-request-admin";

  let title = "Message Received";
  let mainText =
    "Thank you for reaching out. We have received your message and our team is currently reviewing it. We aim to respond within 24 hours.";
  let greeting = `Hello, ${name}`;

  if (isNewsletter) {
    title = "Welcome to the Community";
    mainText =
      "Thank you for subscribing to the Inventis Labs newsletter. You're now part of a community dedicated to building a safer future with advanced earthquake early warning technology.";
  } else if (isAdmin) {
    title = "New Contact Submission";
    mainText =
      "You have received a new contact form submission. Details are provided below:";
    greeting = "Admin Notification";
  } else if (isJobApplication) {
    title = "Application Received";
    mainText = `Thank you for applying for the <strong>${details.position || "position"}</strong> role at Inventis Labs. We have received your application and our hiring team is currently reviewing it. We will be in touch within 5-7 business days regarding the next steps.`;
  } else if (isJobApplicationAdmin) {
    title = "New Job Application";
    mainText = `A new application has been received for <strong>${details.position || "a position"}</strong>. Candidate details are provided below:`;
    greeting = "Hiring Team Notification";
  } else if (isPressKitRequest) {
    title = "Press Kit Downloaded";
    mainText =
      "Thank you for your interest in Inventis Labs. Your requested press kit materials have been prepared. If you need any additional information or have questions, please don't hesitate to reach out to our media team.";
  } else if (isPilotRequest) {
    title = "Enterprise Request Received";
    mainText = `Thank you for your interest in Inventis Labs' earthquake early warning solutions. We have received your pilot request for <strong>${details.areaOfInterest || "your selected areas"}</strong>. Our enterprise team will review your requirements and contact you within 24-48 hours to discuss the next steps.`;
  } else if (isPilotRequestAdmin) {
    title = "New Enterprise Pilot Request";
    mainText = `A new pilot request has been received from <strong>${details.organizationType}</strong> in ${details.location}. Priority review required.`;
    greeting = "Enterprise Team Notification";
  }

  const detailsHtml = isAdmin
    ? `
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
    `
    : isJobApplicationAdmin
      ? `
        <div style="background-color: #f5f5f7; border-radius: 16px; padding: 24px; margin: 32px 0;">
            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                <tr>
                    <td style="padding-bottom: 16px; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Name</td>
                    <td style="padding-bottom: 16px; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.email}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.phone || "N/A"}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Position</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.position}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Experience</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.experience || "N/A"}</td>
                </tr>
                ${
                  details.resumeUrl
                    ? `
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Resume</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; text-align: right;">
                        <a href="${details.resumeUrl}" style="color: #007aff; text-decoration: none; font-size: 14px; font-weight: 500;">Download Resume</a>
                    </td>
                </tr>
                `
                    : ""
                }
            </table>
            ${
              details.coverLetter
                ? `
            <div style="margin-top: 16px;">
                <p style="color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Cover Letter</p>
                <p style="color: #1d1d1f; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details.coverLetter}</p>
            </div>
            `
                : ""
            }
        </div>
    `
      : isPilotRequestAdmin
        ? `
        <div style="background-color: #f5f5f7; border-radius: 16px; padding: 24px; margin: 32px 0;">
            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                <tr>
                    <td style="padding-bottom: 16px; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Contact Name</td>
                    <td style="padding-bottom: 16px; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Organization Type</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.organizationType}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.email}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Location</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.location}</td>
                </tr>
                <tr>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Area of Interest</td>
                    <td style="padding: 16px 0; border-bottom: 1px solid #e1e1e1; color: #1d1d1f; font-size: 14px; font-weight: 500; text-align: right;">${details.areaOfInterest}</td>
                </tr>
            </table>
            ${
              details.message
                ? `
            <div style="margin-top: 16px;">
                <p style="color: #86868b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Requirements</p>
                <p style="color: #1d1d1f; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details.message}</p>
            </div>
            `
                : ""
            }
        </div>
    `
        : "";

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
                    ${
                      !isAdmin && !isJobApplicationAdmin && !isPilotRequestAdmin
                        ? `
                    ${
                      isJobApplication
                        ? `
                    <div style="background-color: #f5f5f7; border-radius: 12px; padding: 20px; margin: 24px 0;">
                        <p style="margin: 0; color: #1d1d1f; font-size: 14px; line-height: 1.6;">
                            <strong>What happens next?</strong><br>
                            1. Our hiring team reviews your application<br>
                            2. Qualified candidates will be contacted for an interview<br>
                            3. We'll keep you updated on your application status
                        </p>
                    </div>
                    `
                        : ""
                    }
                    ${
                      isPilotRequest
                        ? `
                    <div style="background-color: #f5f5f7; border-radius: 12px; padding: 20px; margin: 24px 0;">
                        <p style="margin: 0; color: #1d1d1f; font-size: 14px; line-height: 1.6;">
                            <strong>Next Steps:</strong><br>
                            1. Our enterprise team will review your requirements<br>
                            2. We'll prepare a customized solution proposal<br>
                            3. A dedicated account manager will reach out within 24-48 hours<br>
                            4. We'll schedule a detailed consultation call
                        </p>
                    </div>
                    `
                        : ""
                    }
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
                    `
                        : `
                    <div style="text-align: center; margin-top: 24px;">
                        <a href="${CLIENT_URL}/admin" class="cta-button">View in Admin Panel</a>
                    </div>
                    `
                    }
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
                        Questions? <a href="mailto:support@zohomail.com" style="color: #1d1d1f; text-decoration: underline;">support@zohomail.com</a>
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

// Quick email templates for different scenarios
const quickEmailTemplates = {
  contactConfirmation: (name) => ({
    subject: "We received your message",
    type: "contact",
  }),
  newsletterWelcome: () => ({
    subject: "Welcome to Inventis Labs Newsletter!",
    type: "newsletter",
  }),
  jobApplicationConfirmation: (name, position) => ({
    subject: `Application Received - ${position}`,
    type: "job-application",
  }),
  pressKitDownload: (name) => ({
    subject: "Press Kit Materials - Inventis Labs",
    type: "presskit-request",
  }),
  adminContactNotification: (name, subject) => ({
    subject: `New Contact: ${subject || "Website Inquiry"}`,
    type: "admin",
  }),
  adminJobApplicationNotification: (name, position) => ({
    subject: `New Application: ${position} - ${name}`,
    type: "job-application-admin",
  }),
  pilotRequestConfirmation: (name) => ({
    subject: "Enterprise Pilot Request Received - Inventis Labs",
    type: "pilot-request",
  }),
  adminPilotRequestNotification: (name, organizationType) => ({
    subject: `🚨 New Enterprise Request: ${organizationType} - ${name}`,
    type: "pilot-request-admin",
  }),
};

module.exports = {
  transporter,
  getEmailTemplate,
  sendEmail,
  quickEmailTemplates,
};
