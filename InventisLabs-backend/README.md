# InventisLabs Backend

Backend API for InventisLabs website - handles contact forms, newsletters, job postings, and press kit management.

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
    
    # Email Configuration
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ADMIN_EMAIL=your-email@gmail.com
    
    # Frontend URLs
    FRONTEND_URL=http://localhost:5173
    CLIENT_URL=http://localhost:5173
    
    # Admin Authentication
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=changeme
    JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
    ```

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

## 📡 API Endpoints

### Public Endpoints

#### Contact Form
*   **POST** `/api/contact`
    *   Body: `{ "fullName": "...", "email": "...", "subject": "...", "message": "..." }`
    *   Action: Sends auto-reply to user + notification to Admin

#### Newsletter
*   **POST** `/api/newsletter`
    *   Body: `{ "email": "...", "privacy": true }`
    *   Action: Sends welcome email to subscriber

#### Jobs
*   **GET** `/api/jobs`
    *   Returns: List of all open job positions

#### Press Kit
*   **GET** `/api/presskit`
    *   Query: `?category=logo&featured=true`
    *   Returns: Public press kit items
*   **GET** `/api/presskit/:id`
    *   Returns: Single press kit item details
*   **POST** `/api/presskit/:id/download`
    *   Action: Tracks download count

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
- **Email**: Nodemailer
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize
- **Authentication**: JWT (jsonwebtoken)

