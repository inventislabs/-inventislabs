const { body, param, validationResult } = require("express-validator");

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Contact form validation
const validateContact = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email must not exceed 255 characters"),

  body("subject")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Subject must not exceed 200 characters"),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Message must not exceed 2000 characters"),

  handleValidationErrors,
];

// Newsletter subscription validation
const validateNewsletter = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email must not exceed 255 characters"),

  handleValidationErrors,
];

// Job creation validation
const validateJob = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("jobId")
    .trim()
    .notEmpty()
    .withMessage("Job ID is required")
    .matches(/^[A-Z0-9-]+$/)
    .withMessage(
      "Job ID can only contain uppercase letters, numbers, and hyphens",
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Description must be between 10 and 5000 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location must not exceed 100 characters"),

  body("type")
    .optional()
    .trim()
    .isIn(["Full-time", "Part-time", "Contract", "Internship"])
    .withMessage("Invalid job type"),

  body("department")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Department must not exceed 100 characters"),

  body("salary")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Salary must not exceed 100 characters"),

  body("experience")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Experience must not exceed 100 characters"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format for deadline"),

  handleValidationErrors,
];

// Job update validation
const validateJobUpdate = [
  param("id").isMongoId().withMessage("Invalid job ID"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("status")
    .optional()
    .isIn(["open", "closed"])
    .withMessage("Status must be either open or closed"),

  body("pinned")
    .optional()
    .isBoolean()
    .withMessage("Pinned must be a boolean value"),

  handleValidationErrors,
];

// MongoDB ID validation
const validateMongoId = [
  param("id").isMongoId().withMessage("Invalid ID format"),

  handleValidationErrors,
];

// Message update validation
const validateMessageUpdate = [
  param("id").isMongoId().withMessage("Invalid message ID"),

  body("read")
    .optional()
    .isBoolean()
    .withMessage("Read must be a boolean value"),

  body("starred")
    .optional()
    .isBoolean()
    .withMessage("Starred must be a boolean value"),

  handleValidationErrors,
];

// Pilot Request validation
const validatePilotRequest = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("organizationType")
    .trim()
    .notEmpty()
    .withMessage("Organization type is required")
    .isIn([
      "Government / PSU",
      "Private Enterprise",
      "Smart City",
      "Industrial",
      "Educational",
      "Research",
      "Other",
    ])
    .withMessage("Invalid organization type"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[+]?[\d\s()-]{10,20}$/)
    .withMessage("Please provide a valid phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Location must be between 3 and 200 characters"),

  body("areaOfInterest")
    .notEmpty()
    .withMessage("Area of interest is required")
    .custom((value) => {
      const validAreas = [
        "State-wide EEW",
        "City / Smart City EEW",
        "Industrial Plant EEW",
        "Structural Monitoring",
        "IoT Development",
      ];
      const areas = Array.isArray(value) ? value : [value];
      return areas.every((area) => validAreas.includes(area));
    })
    .withMessage("Invalid area of interest selected"),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage("Message must not exceed 3000 characters"),

  handleValidationErrors,
];

module.exports = {
  validateContact,
  validateNewsletter,
  validateJob,
  validateJobUpdate,
  validateMongoId,
  validateMessageUpdate,
  validatePilotRequest,
  handleValidationErrors,
};
