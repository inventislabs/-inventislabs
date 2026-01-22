const Job = require("../models/Job");
const Contact = require("../models/Contact");
const Reply = require("../models/Reply");
const { catchAsync, AppError } = require("../middleware/errorHandler");

// --- Jobs Management ---

exports.createJob = catchAsync(async (req, res, next) => {
  const {
    title,
    location,
    type,
    department,
    description,
    salary,
    experience,
    deadline,
    responsibilities,
    requirements,
    niceToHave,
    jobId,
  } = req.body;

  const newJob = new Job({
    title,
    location,
    type,
    department,
    description,
    salary,
    experience,
    deadline,
    responsibilities,
    requirements,
    niceToHave,
    jobId,
  });

  await newJob.save();

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    data: newJob,
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {
  const {
    pinned,
    status,
    title,
    location,
    type,
    department,
    description,
    salary,
    experience,
    deadline,
    responsibilities,
    requirements,
    niceToHave,
    jobId,
  } = req.body;

  const updates = {};
  if (typeof pinned !== "undefined") updates.pinned = pinned;
  if (status) updates.status = status;
  if (title) updates.title = title;
  if (location) updates.location = location;
  if (type) updates.type = type;
  if (department) updates.department = department;
  if (description) updates.description = description;
  if (salary) updates.salary = salary;
  if (experience) updates.experience = experience;
  if (deadline) updates.deadline = deadline;
  if (responsibilities) updates.responsibilities = responsibilities;
  if (requirements) updates.requirements = requirements;
  if (niceToHave) updates.niceToHave = niceToHave;
  if (jobId) updates.jobId = jobId;

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedJob) {
    return next(new AppError("Job not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    data: updatedJob,
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return next(new AppError("Job not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});

// --- Messages Management ---

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Contact.find().sort({ date: -1 });

  const formattedMessages = messages.map((msg) => ({
    id: msg._id,
    fullName: msg.fullName,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    read: msg.read,
    starred: msg.starred,
    date: msg.date,
  }));

  res.status(200).json({
    success: true,
    count: formattedMessages.length,
    data: formattedMessages,
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Contact.findByIdAndDelete(req.params.id);

  if (!message) {
    return next(new AppError("Message not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});

exports.updateMessage = catchAsync(async (req, res, next) => {
  const { read, starred } = req.body;
  const updateData = {};
  if (read !== undefined) updateData.read = read;
  if (starred !== undefined) updateData.starred = starred;

  const updatedMessage = await Contact.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true },
  );

  if (!updatedMessage) {
    return next(new AppError("Message not found", 404));
  }
});

// --- Email Reply & Forward ---

exports.replyToMessage = catchAsync(async (req, res, next) => {
  const { to, subject, message, originalMessage, recipientName, contactId } =
    req.body;

  if (!to || !subject || !message) {
    return next(new AppError("Missing required fields", 400));
  }

  const { transporter } = require("../services/emailService");

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; }
            .wrapper { width: 100%; padding: 40px 0; background-color: #f5f5f7; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
            .header { background-color: #000000; padding: 40px; text-align: center; }
            .logo-text { color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; margin: 0; }
            .content { padding: 48px 40px; }
            .greeting { font-size: 28px; font-weight: 700; color: #1d1d1f; margin: 0 0 16px 0; letter-spacing: -0.5px; }
            .message { font-size: 16px; line-height: 1.6; color: #424245; margin: 0 0 32px 0; white-space: pre-wrap; }
            .divider { height: 1px; background-color: #e5e5e5; margin: 32px 0; }
            .original-message { background-color: #f5f5f7; border-left: 4px solid #000; padding: 20px; border-radius: 8px; margin-top: 24px; }
            .original-label { font-size: 12px; font-weight: 600; color: #86868b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .original-text { font-size: 14px; color: #1d1d1f; line-height: 1.6; margin: 0; white-space: pre-wrap; }
            .footer { background-color: #f5f5f7; padding: 32px 40px; text-align: center; border-top: 1px solid #e1e1e1; }
            .footer-text { color: #86868b; font-size: 11px; line-height: 1.5; margin: 0; }
            .copyright { color: #86868b; font-size: 11px; margin-top: 16px; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h1 class="logo-text">Inventis Labs</h1>
                </div>
                <div class="content">
                    <h2 class="greeting">Hello, ${recipientName}</h2>
                    <p class="message">${message}</p>
                    ${
                      originalMessage
                        ? `
                    <div class="divider"></div>
                    <div class="original-message">
                        <div class="original-label">Your Original Message</div>
                        <p class="original-text">${originalMessage}</p>
                    </div>
                    `
                        : ""
                    }
                </div>
                <div class="footer">
                    <p class="footer-text">
                        Inventis Labs Pvt. Ltd.<br>
                        Tech Park, Sector 62, Noida<br>
                        Questions? <a href="mailto:support@inventislabs.com" style="color: #1d1d1f; text-decoration: underline;">support@inventislabs.com</a>
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

  await transporter.sendMail({
    from: `"Inventis Labs" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: emailHtml,
  });

  // Save reply to database for history
  if (contactId) {
    await Reply.create({
      contactId: contactId,
      type: "reply",
      to: to,
      subject: subject,
      message: message,
    });
  }

  res.status(200).json({
    success: true,
    message: "Reply sent successfully",
  });
});

exports.forwardMessage = catchAsync(async (req, res, next) => {
  const {
    to,
    subject,
    message,
    originalMessage,
    originalSender,
    originalEmail,
    contactId,
  } = req.body;

  if (!to || !subject || !originalMessage) {
    return next(new AppError("Missing required fields", 400));
  }

  const { transporter } = require("../services/emailService");

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; }
            .wrapper { width: 100%; padding: 40px 0; background-color: #f5f5f7; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
            .header { background-color: #000000; padding: 40px; text-align: center; }
            .logo-text { color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; margin: 0; }
            .content { padding: 48px 40px; }
            .badge { display: inline-block; padding: 6px 12px; background-color: #f5f5f7; color: #1d1d1f; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 24px; }
            .message { font-size: 16px; line-height: 1.6; color: #424245; margin: 0 0 32px 0; white-space: pre-wrap; }
            .divider { height: 1px; background-color: #e5e5e5; margin: 32px 0; }
            .forwarded-message { background-color: #f5f5f7; border-radius: 12px; padding: 24px; margin-top: 24px; }
            .forwarded-header { font-size: 12px; font-weight: 600; color: #86868b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
            .meta-row { display: flex; justify-content: space-between; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #e1e1e1; }
            .meta-label { font-size: 12px; font-weight: 600; color: #86868b; }
            .meta-value { font-size: 12px; color: #1d1d1f; font-weight: 500; }
            .forwarded-text { font-size: 14px; color: #1d1d1f; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; }
            .footer { background-color: #f5f5f7; padding: 32px 40px; text-align: center; border-top: 1px solid #e1e1e1; }
            .footer-text { color: #86868b; font-size: 11px; line-height: 1.5; margin: 0; }
            .copyright { color: #86868b; font-size: 11px; margin-top: 16px; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h1 class="logo-text">Inventis Labs</h1>
                </div>
                <div class="content">
                    <div class="badge">Forwarded Message</div>
                    ${message ? `<p class="message">${message}</p><div class="divider"></div>` : ""}
                    <div class="forwarded-message">
                        <div class="forwarded-header">Original Message</div>
                        <div class="meta-row">
                            <span class="meta-label">From</span>
                            <span class="meta-value">${originalSender} (${originalEmail})</span>
                        </div>
                        <div class="forwarded-text">${originalMessage}</div>
                    </div>
                </div>
                <div class="footer">
                    <p class="footer-text">
                        Inventis Labs Pvt. Ltd.<br>
                        Tech Park, Sector 62, Noida<br>
                        Questions? <a href="mailto:support@inventislabs.com" style="color: #1d1d1f; text-decoration: underline;">support@inventislabs.com</a>
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

  await transporter.sendMail({
    from: `"Inventis Labs" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: emailHtml,
  });

  // Save forward to database for history
  if (contactId) {
    await Reply.create({
      contactId: contactId,
      type: "forward",
      to: to,
      subject: subject,
      message: message || `Forwarded from ${originalSender}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Message forwarded successfully",
  });
});

// Get message conversation history
exports.getMessageHistory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Get original contact message
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(new AppError("Message not found", 404));
  }

  // Get all replies for this contact
  const replies = await Reply.find({ contactId: id }).sort({ sentAt: 1 });

  // Build conversation thread
  const thread = [
    {
      id: contact._id,
      type: "incoming",
      from: contact.fullName,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      date: contact.date,
      isOriginal: true,
    },
    ...replies.map((reply) => ({
      id: reply._id,
      type: reply.type === "reply" ? "outgoing" : "forwarded",
      to: reply.to,
      subject: reply.subject,
      message: reply.message,
      date: reply.sentAt,
      sentBy: reply.sentBy,
    })),
  ];

  res.status(200).json({
    success: true,
    count: thread.length,
    data: thread,
  });
});
