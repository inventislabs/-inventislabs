const mongoose = require('mongoose');

const pressKitSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['logo', 'brand-assets', 'media', 'documents', 'screenshots', 'other']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        default: 'download'
    },
    fileType: {
        type: String,
        default: 'application/octet-stream'
    },
    fileSize: {
        type: Number,
        default: 0
    },
    thumbnailUrl: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    metadata: {
        dimensions: String,
        format: String,
        colorMode: String,
        version: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
pressKitSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('PressKit', pressKitSchema);
