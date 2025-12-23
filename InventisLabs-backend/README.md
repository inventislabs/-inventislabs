# InventisLabs Backend

Simple Express/Node.js backend for handling emails (Contact Form & Newsletter).

## 🚀 Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure `.env`**
    Create a `.env` file in this directory:
    ```env
    PORT=5000
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ADMIN_EMAIL=your-email@gmail.com
    ```

3.  **Run Server**
    ```bash
    npm run dev
    ```
    Runs on `http://localhost:5000`

## 📡 API Endpoints

*   **POST** `/api/contact`
    *   Body: `{ "fullName": "...", "email": "...", "subject": "...", "message": "..." }`
    *   Action: Sends auto-reply to user + notification to Admin.

*   **POST** `/api/newsletter`
    *   Body: `{ "email": "...", "privacy": true }`
    *   Action: Sends "Welcome" email to subscriber.
