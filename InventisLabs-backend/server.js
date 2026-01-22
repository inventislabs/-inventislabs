const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Import Security Middleware
const {
  apiLimiter,
  submissionLimiter,
  adminLimiter,
  sanitizeData,
  xssProtection,
  hppProtection,
} = require("./middleware/security");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const { adminLogin } = require("./middleware/auth");

// Import Routes
const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pressKitRoutes = require("./routes/pressKitRoutes");
const pilotRequestRoutes = require("./routes/pilotRequestRoutes");

const app = express();

// Trust proxy (important for rate limiting behind reverse proxies like nginx)
app.set("trust proxy", 1);

// Security Headers - Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xssFilter: true,
    hidePoweredBy: true,
  }),
);

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://www.inventislabs.com",
      "http://localhost:3000",
      "http://localhost:5173",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Body Parser Middleware (with size limits to prevent DoS)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data Sanitization against NoSQL query injection
app.use(sanitizeData);

// Data Sanitization against XSS
app.use(xssProtection);

// Prevent HTTP Parameter Pollution
app.use(hppProtection);

// Database Connection
connectDB();

// Apply general API rate limiting
app.use("/api", apiLimiter);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventis Labs API Running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Admin login route (before auth middleware)
app.post("/api/admin/login", adminLimiter, adminLogin);

// Routes with specific rate limiters
app.use("/api/contact", submissionLimiter, contactRoutes);
app.use("/api/newsletter", submissionLimiter, newsletterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/presskit", pressKitRoutes);
app.use("/api/pilot-request", submissionLimiter, pilotRequestRoutes);
app.use("/api/admin", adminLimiter, adminRoutes);

// 404 Handler - Must be after all routes
app.use(notFoundHandler);

// Global Error Handler - Must be last
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Security features enabled`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!  Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!  Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

module.exports = app;
