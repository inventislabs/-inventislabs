const Analytics = require('../models/Analytics');

exports.trackVisit = async (req, res) => {
    const { visitorId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        let analytics = await Analytics.findOne({ date: today });
        if (!analytics) {
            analytics = new Analytics({ date: today });
        }

        analytics.pageViews += 1;
        if (visitorId && !analytics.uniqueVisitors.includes(visitorId)) {
            analytics.uniqueVisitors.push(visitorId);
        }

        await analytics.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Tracking Error:', error);
        res.status(500).json({ success: false });
    }
};

exports.getStats = async (req, res) => {
    try {
        // Get last 30 days
        const stats = await Analytics.find().sort({ date: -1 }).limit(30);

        // Transform for frontend
        const formattedStats = stats.map(day => ({
            date: day.date,
            views: day.pageViews,
            visitors: day.uniqueVisitors.length
        })).reverse(); // Oldest first for charts

        res.status(200).json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};
