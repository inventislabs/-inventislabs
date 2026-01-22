# InventisLabs Backend

Backend API for InventisLabs website - handles contact forms, newsletters, job postings, press kit management, and **automated email notifications**.

## ✨ Features

- 📧 **Instant Email Automation** - Automatic confirmation emails for all form submissions
- 🔔 **Admin Notifications** - Real-time alerts for new submissions
- 💼 **Job Application System** - Complete hiring workflow with email tracking
- 📰 **Newsletter Management** - Subscriber management with welcome emails
- 📁 **Press Kit Downloads** - Media resource management with tracking
- 🔒 **Secure Admin Panel** - JWT-based authentication
- ⚡ **Rate Limiting & Security** - Production-ready security features

## 🚀 Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure `.env`**
    Create a `.env` file in this directory:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/inventislabs
    
    # Email Configuration (REQUIRED for email automation)
    # For Gmail: Generate an app password at https://myaccount.google.com/apppasswords
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-16-char-app-password
    ADMIN_EMAIL=admin@inventislabs.in
    
    # Frontend URLs
    FRONTEND_URL=http://localhost:5173
    CLIENT_URL=http://localhost:5173
    
    # Admin Authentication
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=changeme
    JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
    ```
    
    > **📧 Email Setup**: See [EMAIL_AUTOMATION_README.md](./EMAIL_AUTOMATION_README.md) for detailed email configuration instructions.

3.  **Start MongoDB**
    ```bash
    # Make sure MongoDB is running
    mongod
    ```

4.  **Run Server**
    ```bash
    npm run dev
    ```
    Server runs on `http://localhost:5000`

5.  **Test Email System** (Optional but recommended)
    ```bash
    node test-email.js
    ```
    This will send test emails to verify your configuration is working.

## 📧 Email Automation

The system automatically sends emails for:

| Event | User Email | Admin Email |
|-------|-----------|-------------|
| **Contact Form** | ✅ Confirmation | ✅ Full details |
| **Newsletter** | ✅ Welcome | ✅ Notification |
| **Job Application** | ✅ Confirmation | ✅ Candidate details + Resume |
| **Press Kit Download** | ✅ Optional | ✅ Track downloads |

**Email Features:**
- 🎨 Professional Apple-inspired templates
- 📱 Mobile-responsive design
- 🔄 Automatic retry on failure (3 attempts)
- ⚡ Parallel sending for speed
- 📊 Detailed logging

See [EMAIL_AUTOMATION_README.md](./EMAIL_AUTOMATION_README.md) for complete documentation.

## 📡 API Endpoints

### Public Endpoints

#### Contact Form
*   **POST** `/api/contact`
    *   Body: `{ "fullName": "...", "email": "...", "subject": "...", "message": "..." }`
    *   Action: Saves to DB + Sends confirmation email to user + Notifies admin
    *   Response: `{ "success": true, "message": "Message received! We'll get back to you within 24 hours." }`

#### Newsletter
*   **POST** `/api/newsletter`
    *   Body: `{ "email": "...", "privacy": true }`
    *   Action: Saves subscriber + Sends welcome email + Notifies admin
    *   Response: `{ "success": true, "message": "Successfully subscribed! Check your email for confirmation." }`

#### Jobs
*   **GET** `/api/jobs`
    *   Returns: List of all open job positions
    
*   **POST** `/api/jobs/apply`
    *   Body: `{ "jobId": "...", "position": "...", "fullName": "...", "email": "...", "phone": "...", "experience": "...", "resumeUrl": "...", "coverLetter": "..." }`
    *   Action: Saves application + Sends confirmation to candidate + Notifies HR team
    *   Response: `{ "success": true, "message": "Application submitted successfully! Check your email for confirmation." }`

#### Press Kit
*   **GET** `/api/presskit`
    *   Query: `?category=logo&featured=true`
    *   Returns: Public press kit items
*   **GET** `/api/presskit/:id`
    *   Returns: Single press kit item details
*   **POST** `/api/presskit/:id/download`
    *   Body: `{ "email": "...", "name": "..." }` (optional)
    *   Action: Tracks download + Sends confirmation email if email provided

### Admin Endpoints (Requires Authentication)

All admin endpoints require `Authorization: Bearer <token>` header.

#### Authentication
*   **POST** `/api/admin/login`
    *   Body: `{ "username": "admin", "password": "changeme" }`
    *   Returns: JWT token

#### Messages
*   **GET** `/api/admin/messages` - Get all contact messages
*   **PATCH** `/api/admin/messages/:id` - Update message (mark as read/starred)
*   **DELETE** `/api/admin/messages/:id` - Delete message

#### Jobs
*   **POST** `/api/admin/jobs` - Create new job posting
*   **PATCH** `/api/admin/jobs/:id` - Update job posting
*   **DELETE** `/api/admin/jobs/:id` - Delete job posting

#### Job Applications
*   **GET** `/api/jobs/applications` - Get all job applications
*   **GET** `/api/jobs/applications/:jobId` - Get applications for specific job
*   **PUT** `/api/jobs/applications/:id` - Update application status
    *   Body: `{ "status": "Interview Scheduled", "notes": "..." }`

#### Press Kit
*   **GET** `/api/admin/presskit` - Get all press kit items (including private)
*   **GET** `/api/admin/presskit/stats` - Get press kit statistics
*   **POST** `/api/admin/presskit` - Create new press kit item
*   **PATCH** `/api/admin/presskit/:id` - Update press kit item
*   **DELETE** `/api/admin/presskit/:id` - Delete press kit item

## 🔒 Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting on all endpoints
- JWT authentication for admin routes
- Input sanitization (NoSQL injection, XSS)
- HTTP Parameter Pollution protection

## 📦 Tech Stack

- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Email**: Nodemailer (with Gmail/SMTP support)
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize
- **Authentication**: JWT (jsonwebtoken)

## 📁 Project Structure

```
InventisLabs-backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── contactController.js     # Contact form + emails
│   ├── newsletterController.js  # Newsletter + welcome emails
│   ├── jobController.js         # Jobs + application emails
│   └── pressKitController.js    # Press kit + download emails
├── middleware/
│   ├── auth.js                  # JWT authentication
│   ├── errorHandler.js          # Error handling
│   ├── security.js              # Security middleware
│   └── validation.js            # Input validation
├── models/
│   ├── Contact.js               # Contact submissions
│   ├── Subscriber.js            # Newsletter subscribers
│   ├── Job.js                   # Job postings
│   ├── JobApplication.js        # Job applications (NEW)
│   └── PressKit.js             # Media resources
├── routes/
│   ├── adminRoutes.js           # Admin endpoints
│   ├── contactRoutes.js         # Contact endpoints
│   ├── jobRoutes.js             # Job + application endpoints
│   ├── newsletterRoutes.js      # Newsletter endpoints
│   └── pressKitRoutes.js        # Press kit endpoints
├── services/
│   └── emailService.js          # Email templates + sending (ENHANCED)
├── .env.example                 # Environment variables template
├── server.js                    # Express server
├── test-email.js                # Email system test script (NEW)
├── EMAIL_AUTOMATION_README.md   # Email documentation (NEW)
└── README.md                    # This file
```

## 🧪 Testing

### Test All Email Templates
```bash
node test-email.js
```

### Test Individual Endpoints
```bash
# Contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","subject":"Test","message":"Testing"}'

# Newsletter
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","privacy":true}'

# Job application
curl -X POST http://localhost:5000/api/jobs/apply \
  -H "Content-Type: application/json" \
  -d '{"jobId":"JOB001","position":"Engineer","fullName":"Test","email":"test@example.com"}'
```

## 🐛 Troubleshooting

### Email Not Sending
1. Check `.env` file has correct `EMAIL_USER` and `EMAIL_PASS`
2. For Gmail, generate an app password (not your regular password)
3. Run `node test-email.js` to diagnose issues
4. Check server logs for detailed error messages

### MongoDB Connection Failed
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/inventislabs
```

### Port Already in Use
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

## 📚 Documentation

- **Email Automation**: [EMAIL_AUTOMATION_README.md](./EMAIL_AUTOMATION_README.md)
- **API Documentation**: See endpoints section above
- **Environment Variables**: See `.env.example`

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
EMAIL_USER=noreply@inventislabs.in
EMAIL_PASS=your-production-password
ADMIN_EMAIL=admin@inventislabs.in
CLIENT_URL=https://inventislabs.in
JWT_SECRET=your-very-strong-random-secret-key
```

### Recommended Email Services for Production
- **SendGrid** - 100 emails/day free
- **AWS SES** - Pay as you go, very cheap
- **Mailgun** - 5000 emails/month free
- **Gmail** - 500 emails/day limit

## 📝 License

Proprietary - Inventis Labs Pvt. Ltd.

## 👨‍💻 Support

For technical support:
- Email: dev@inventislabs.in
- Check logs: Server logs show detailed email send status
- Test script: Run `node test-email.js` to diagnose issues

