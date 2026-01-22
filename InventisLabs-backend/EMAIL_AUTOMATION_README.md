# 📧 Email Automation System - Inventis Labs

## Overview
Automated email system that instantly sends confirmation emails to users and notification emails to admins when forms are submitted on the Inventis Labs platform.

## ✨ Features

### 1. **Contact Form Automation**
- ✅ Instant confirmation email to user
- ✅ Admin notification with full submission details
- ✅ Professional branded email templates
- ✅ 24-hour response time commitment

### 2. **Newsletter Subscription**
- ✅ Welcome email to new subscribers
- ✅ Admin notification for new subscriptions
- ✅ Duplicate email prevention
- ✅ Privacy policy compliance

### 3. **Job Application System**
- ✅ Application confirmation to candidates
- ✅ Admin notification with candidate details
- ✅ Resume and portfolio link tracking
- ✅ Application status management
- ✅ Prevents duplicate applications

### 4. **Press Kit Downloads**
- ✅ Download confirmation emails (optional)
- ✅ Admin tracking of media downloads
- ✅ Download counter

## 🚀 Setup Instructions

### 1. Gmail Configuration
For Gmail email service, you need an **App Password**:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Use this 16-character password as `EMAIL_PASS` in your .env file

### 2. Environment Variables
Update your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=admin@inventislabs.in
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies
```bash
npm install
```

All required packages are already in package.json:
- `nodemailer` - Email sending
- `dotenv` - Environment configuration

## 📋 API Endpoints

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I'm interested in your EQ Alert system."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received! We'll get back to you within 24 hours."
}
```

### Newsletter Subscription
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "privacy": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email for confirmation."
}
```

### Job Application
```http
POST /api/jobs/apply
Content-Type: application/json

{
  "jobId": "JOB001",
  "position": "IoT Engineer",
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91-9876543210",
  "experience": "3 years",
  "resumeUrl": "https://example.com/resume.pdf",
  "portfolioUrl": "https://portfolio.com",
  "linkedinUrl": "https://linkedin.com/in/janesmith",
  "coverLetter": "I am excited to apply..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully! Check your email for confirmation."
}
```

### Press Kit Download (with optional email)
```http
POST /api/presskit/:id/download
Content-Type: application/json

{
  "email": "journalist@media.com",
  "name": "John Reporter"
}
```

## 🎨 Email Templates

All emails feature:
- ✨ Professional Apple-inspired design
- 📱 Mobile-responsive layout
- 🎯 Clear call-to-action buttons
- 🏢 Branded header and footer
- 📧 Contact information

### Template Types:
1. **Contact Confirmation** - User receives confirmation
2. **Contact Admin Notification** - Admin gets full details
3. **Newsletter Welcome** - New subscriber welcome
4. **Job Application Confirmation** - Candidate confirmation
5. **Job Application Admin** - HR notification with resume link
6. **Press Kit Download** - Media contact confirmation

## 🔧 Code Structure

```
services/
  └── emailService.js          # Core email functionality
      ├── transporter          # Nodemailer configuration
      ├── getEmailTemplate()   # HTML template generator
      ├── sendEmail()          # Send with retry logic
      └── quickEmailTemplates  # Pre-configured templates

controllers/
  ├── contactController.js     # Contact form handler
  ├── newsletterController.js  # Newsletter handler
  ├── jobController.js         # Job application handler
  └── pressKitController.js    # Press kit handler

models/
  ├── Contact.js              # Contact submissions
  ├── Subscriber.js           # Newsletter subscribers
  ├── JobApplication.js       # Job applications
  └── PressKit.js            # Media resources
```

## 🛠️ Advanced Features

### Email Retry Logic
Automatically retries failed email sends up to 3 times with exponential backoff:
```javascript
await sendEmail(mailOptions); // Handles retries automatically
```

### Parallel Email Sending
Sends user and admin emails simultaneously for faster response:
```javascript
await Promise.all([
    sendEmail(userEmail),
    sendEmail(adminEmail)
]);
```

### Non-blocking Admin Notifications
Admin notifications don't block user responses:
```javascript
sendEmail(adminEmail).catch(err => 
    console.error('Admin notification failed:', err.message)
);
```

## 📊 Admin Endpoints (Protected)

### Get All Job Applications
```http
GET /api/jobs/applications
Authorization: Bearer {token}
```

### Get Applications for Specific Job
```http
GET /api/jobs/applications/:jobId
Authorization: Bearer {token}
```

### Update Application Status
```http
PUT /api/jobs/applications/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Interview Scheduled",
  "notes": "First round scheduled for next week"
}
```

## 🧪 Testing

### Test Email Configuration
```bash
node -e "
const { sendEmail } = require('./services/emailService');
sendEmail({
  from: process.env.EMAIL_USER,
  to: 'test@example.com',
  subject: 'Test Email',
  html: '<h1>Test</h1>'
}).then(() => console.log('✅ Email sent'))
  .catch(err => console.error('❌ Failed:', err.message));
"
```

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing email automation"
  }'
```

## 🚨 Error Handling

The system includes comprehensive error handling:
- ✅ Retry logic for temporary failures
- ✅ Detailed error logging
- ✅ User-friendly error messages
- ✅ Non-blocking admin notifications

## 📈 Monitoring

Email logs include:
- ✅ Successful sends: `✅ Email sent successfully to user@example.com`
- ❌ Failed sends: `❌ Email send attempt 1 failed: reason`

## 🔒 Security Features

- ✅ Input validation
- ✅ Rate limiting
- ✅ XSS protection
- ✅ SQL injection prevention
- ✅ Environment variable protection
- ✅ CORS configuration

## 📝 Notes

1. **Gmail Sending Limits**: Gmail allows 500 emails/day for free accounts
2. **Production**: Consider using SendGrid or AWS SES for higher volume
3. **Templates**: Customize templates in `services/emailService.js`
4. **Spam**: Add SPF, DKIM, and DMARC records for better deliverability

## 🔄 Future Enhancements

- [ ] Email queue system (Bull/Redis)
- [ ] Email open tracking
- [ ] Click tracking
- [ ] A/B testing for email templates
- [ ] Scheduled follow-up emails
- [ ] Email analytics dashboard
- [ ] Multiple language support
- [ ] Attachment support for job applications

## 📞 Support

For issues or questions:
- Email: info@inventislabs.in
- Check logs for detailed error messages
- Verify .env configuration
- Test Gmail app password

---
**Last Updated**: January 2026
**Version**: 1.0.0
