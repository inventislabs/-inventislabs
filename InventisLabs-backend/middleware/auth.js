const jwt = require('jsonwebtoken');

// Simple admin authentication middleware
// In production, this should be replaced with a proper authentication system
const authenticateAdmin = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

        // Attach admin info to request
        req.admin = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired.'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Authentication failed.'
        });
    }
};

// Generate admin token (for login)
const generateAdminToken = (adminId, email) => {
    return jwt.sign(
        { id: adminId, email, role: 'admin' },
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        { expiresIn: '24h' }
    );
};

// Admin login function (basic implementation)
const adminLogin = (req, res) => {
    try {
        const { username, password } = req.body;

        // In production, validate against database with hashed passwords
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const token = generateAdminToken('admin-001', username);

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                expiresIn: '24h'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    } catch (error) {
        console.error('[Admin Login Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
};

module.exports = {
    authenticateAdmin,
    generateAdminToken,
    adminLogin
};
