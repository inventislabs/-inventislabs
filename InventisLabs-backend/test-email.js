/**
 * Email System Test Script
 * Run this to verify your email configuration is working
 * Usage: node test-email.js
 */

require("dotenv").config();
const { sendEmail, getEmailTemplate } = require("./services/emailService");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

async function testEmailSystem() {
  console.log(
    `${colors.blue}════════════════════════════════════════${colors.reset}`,
  );
  console.log(`${colors.blue}   Email Automation System Test${colors.reset}`);
  console.log(
    `${colors.blue}════════════════════════════════════════${colors.reset}\n`,
  );

  // Check environment variables
  console.log("📋 Checking configuration...\n");

  const requiredVars = ["EMAIL_USER", "EMAIL_PASS", "ADMIN_EMAIL"];
  let configValid = true;

  requiredVars.forEach((varName) => {
    if (process.env[varName]) {
      console.log(`${colors.green}✓${colors.reset} ${varName}: Configured`);
    } else {
      console.log(`${colors.red}✗${colors.reset} ${varName}: Missing`);
      configValid = false;
    }
  });

  if (!configValid) {
    console.log(
      `\n${colors.red}❌ Configuration incomplete. Please update your .env file.${colors.reset}`,
    );
    process.exit(1);
  }

  console.log("\n" + "─".repeat(40) + "\n");

  // Test 1: Contact Form Email
  console.log("📧 Test 1: Contact Form Confirmation Email\n");
  try {
    const contactEmail = {
      from: `"Inventis Labs Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: "[TEST] Contact Form Confirmation",
      html: getEmailTemplate("Test User", "contact"),
    };

    await sendEmail(contactEmail);
    console.log(
      `${colors.green}✓ Contact confirmation email sent successfully${colors.reset}\n`,
    );
  } catch (error) {
    console.log(
      `${colors.red}✗ Contact email failed: ${error.message}${colors.reset}\n`,
    );
  }

  // Test 2: Newsletter Email
  console.log("📧 Test 2: Newsletter Welcome Email\n");
  try {
    const newsletterEmail = {
      from: `"Inventis Labs Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "[TEST] Newsletter Welcome",
      html: getEmailTemplate("Test Subscriber", "newsletter"),
    };

    await sendEmail(newsletterEmail);
    console.log(
      `${colors.green}✓ Newsletter email sent successfully${colors.reset}\n`,
    );
  } catch (error) {
    console.log(
      `${colors.red}✗ Newsletter email failed: ${error.message}${colors.reset}\n`,
    );
  }

  // Test 3: Job Application Email
  console.log("📧 Test 3: Job Application Confirmation\n");
  try {
    const jobEmail = {
      from: `"Inventis Labs Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "[TEST] Job Application Received",
      html: getEmailTemplate("Test Applicant", "job-application", {
        position: "IoT Engineer",
      }),
    };

    await sendEmail(jobEmail);
    console.log(
      `${colors.green}✓ Job application email sent successfully${colors.reset}\n`,
    );
  } catch (error) {
    console.log(
      `${colors.red}✗ Job application email failed: ${error.message}${colors.reset}\n`,
    );
  }

  // Test 4: Admin Notification
  console.log("📧 Test 4: Admin Notification Email\n");
  try {
    const adminEmail = {
      from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "[TEST] Admin Notification",
      html: getEmailTemplate("Test User", "admin", {
        email: "test@example.com",
        subject: "Test Inquiry",
        message:
          "This is a test message to verify admin notifications are working correctly.",
      }),
    };

    await sendEmail(adminEmail);
    console.log(
      `${colors.green}✓ Admin notification email sent successfully${colors.reset}\n`,
    );
  } catch (error) {
    console.log(
      `${colors.red}✗ Admin notification failed: ${error.message}${colors.reset}\n`,
    );
  }

  // Test 5: Job Application Admin Notification
  console.log("📧 Test 5: Job Application Admin Notification\n");
  try {
    const jobAdminEmail = {
      from: `"Inventis Labs Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "[TEST] New Job Application",
      html: getEmailTemplate("Test Candidate", "job-application-admin", {
        email: "candidate@example.com",
        phone: "+91-9876543210",
        position: "Senior IoT Engineer",
        experience: "5 years",
        resumeUrl: "https://example.com/resume.pdf",
        coverLetter: "This is a test cover letter.",
      }),
    };

    await sendEmail(jobAdminEmail);
    console.log(
      `${colors.green}✓ Job application admin email sent successfully${colors.reset}\n`,
    );
  } catch (error) {
    console.log(
      `${colors.red}✗ Job application admin email failed: ${error.message}${colors.reset}\n`,
    );
  }

  console.log("─".repeat(40) + "\n");
  console.log(`${colors.green}✅ Email system test completed!${colors.reset}`);
  console.log(
    `${colors.yellow}📥 Check ${process.env.EMAIL_USER} for test emails${colors.reset}\n`,
  );
  console.log(
    `${colors.blue}════════════════════════════════════════${colors.reset}\n`,
  );
}

// Run tests
testEmailSystem().catch((error) => {
  console.error(
    `\n${colors.red}❌ Test failed with error:${colors.reset}`,
    error,
  );
  process.exit(1);
});
