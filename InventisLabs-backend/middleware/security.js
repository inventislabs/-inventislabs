const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Rate limiting for general API requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiting for contact/newsletter submissions
const submissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 submissions per hour
    message: 'Too many submissions from this IP, please try again after an hour.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Very strict rate limiting for admin routes
const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per 15 minutes
    message: 'Too many admin requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Data sanitization against NoSQL query injection
const sanitizeData = mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`[Security] Sanitized key: ${key} in request from IP: ${req.ip}`);
    },
});

// XSS protection middleware
const xssProtection = xss();

// HTTP Parameter Pollution protection
const hppProtection = hpp();

module.exports = {
    apiLimiter,
    submissionLimiter,
    adminLimiter,
    sanitizeData,
    xssProtection,
    hppProtection,
};
