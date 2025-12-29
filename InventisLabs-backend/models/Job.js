const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // e.g. Full-time, Remote, Contract
    department: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String },
    experience: { type: String },
    deadline: { type: Date },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    niceToHave: { type: [String], default: [] },
    status: { type: String, default: 'Open', enum: ['Open', 'Closed'] },
    pinned: { type: Boolean, default: false },
    postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
