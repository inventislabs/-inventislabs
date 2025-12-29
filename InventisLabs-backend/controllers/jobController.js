const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ pinned: -1, postedDate: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};
