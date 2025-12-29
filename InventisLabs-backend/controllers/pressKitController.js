const PressKit = require('../models/PressKit');
const { catchAsync } = require('../middleware/errorHandler');

// Get all press kit items (public)
exports.getAllPressKitItems = catchAsync(async (req, res) => {
    const { category, featured } = req.query;

    const filter = { isPublic: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const items = await PressKit.find(filter).sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
        success: true,
        count: items.length,
        data: items
    });
});

// Get single press kit item (public)
exports.getPressKitItem = catchAsync(async (req, res) => {
    const item = await PressKit.findById(req.params.id);

    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Press kit item not found'
        });
    }

    res.status(200).json({
        success: true,
        data: item
    });
});

// Track download (public)
exports.trackDownload = catchAsync(async (req, res) => {
    const item = await PressKit.findByIdAndUpdate(
        req.params.id,
        { $inc: { downloadCount: 1 } },
        { new: true }
    );

    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Press kit item not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Download tracked',
        data: item
    });
});

// Admin: Get all press kit items (including private)
exports.adminGetAllPressKitItems = catchAsync(async (req, res) => {
    try {
        const items = await PressKit.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        console.error('Error in adminGetAllPressKitItems:', error);
        throw error;
    }
});

// Admin: Create press kit item
exports.createPressKitItem = catchAsync(async (req, res) => {
    try {
        console.log('Creating press kit item with data:', JSON.stringify(req.body, null, 2));

        const item = await PressKit.create(req.body);

        console.log('Press kit item created successfully:', item._id);

        res.status(201).json({
            success: true,
            message: 'Press kit item created successfully',
            data: item
        });
    } catch (error) {
        console.error('Error creating press kit item:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        if (error.errors) {
            console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
        }
        throw error;
    }
});

// Admin: Update press kit item
exports.updatePressKitItem = catchAsync(async (req, res) => {
    const item = await PressKit.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Press kit item not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Press kit item updated successfully',
        data: item
    });
});

// Admin: Delete press kit item
exports.deletePressKitItem = catchAsync(async (req, res) => {
    const item = await PressKit.findByIdAndDelete(req.params.id);

    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Press kit item not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Press kit item deleted successfully'
    });
});

// Admin: Get statistics
exports.getPressKitStats = catchAsync(async (req, res) => {
    const totalItems = await PressKit.countDocuments();
    const publicItems = await PressKit.countDocuments({ isPublic: true });
    const totalDownloads = await PressKit.aggregate([
        { $group: { _id: null, total: { $sum: '$downloadCount' } } }
    ]);

    const categoryBreakdown = await PressKit.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
        success: true,
        data: {
            totalItems,
            publicItems,
            privateItems: totalItems - publicItems,
            totalDownloads: totalDownloads[0]?.total || 0,
            categoryBreakdown
        }
    });
});
