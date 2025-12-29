// Centralized error handling middleware
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Global error handler
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error for debugging (in production, use proper logging service)
    if (process.env.NODE_ENV !== 'production') {
        console.error('ERROR 💥:', err);
    } else {
        // In production, log to external service (e.g., Sentry, LogRocket)
        console.error('[Error]', {
            message: err.message,
            statusCode: err.statusCode,
            path: req.path,
            method: req.method,
            ip: req.ip,
            timestamp: new Date().toISOString()
        });
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Invalid ID format';
        return res.status(400).json({
            success: false,
            message
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `Duplicate value for ${field}. Please use another value.`;
        return res.status(400).json({
            success: false,
            message
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        return res.status(400).json({
            success: false,
            message,
            errors
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please log in again.'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Your token has expired. Please log in again.'
        });
    }

    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Programming or unknown error: don't leak error details
    return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.'
    });
};

// 404 handler for undefined routes
const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Cannot find ${req.originalUrl} on this server`, 404);
    next(error);
};

// Async error wrapper to catch errors in async route handlers
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = {
    AppError,
    errorHandler,
    notFoundHandler,
    catchAsync
};
