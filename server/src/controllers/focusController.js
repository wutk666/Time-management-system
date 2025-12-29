const FocusSession = require('../models/FocusSession');

// @desc    Get all focus sessions for user
// @route   GET /api/focus
// @access  Private
exports.getFocusSessions = async (req, res, next) => {
    try {
        const { startDate, endDate, type } = req.query;

        let query = { userId: req.user.id };

        if (type) {
            query.type = type;
        }

        if (startDate && endDate) {
            query.startedAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const sessions = await FocusSession.find(query).sort({ startedAt: -1 });

        res.status(200).json({
            success: true,
            count: sessions.length,
            sessions
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create focus session
// @route   POST /api/focus
// @access  Private
exports.createFocusSession = async (req, res, next) => {
    try {
        req.body.userId = req.user.id;

        const session = await FocusSession.create(req.body);

        res.status(201).json({
            success: true,
            session
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update focus session
// @route   PUT /api/focus/:id
// @access  Private
exports.updateFocusSession = async (req, res, next) => {
    try {
        let session = await FocusSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Focus session not found'
            });
        }

        if (session.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        session = await FocusSession.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            session
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get focus statistics
// @route   GET /api/focus/stats
// @access  Private
exports.getFocusStats = async (req, res, next) => {
    try {
        const totalSessions = await FocusSession.countDocuments({ userId: req.user.id, completed: true });

        const totalMinutes = await FocusSession.aggregate([
            { $match: { userId: req.user._id, completed: true } },
            { $group: { _id: null, total: { $sum: '$duration' } } }
        ]);

        const sessionsByType = await FocusSession.aggregate([
            { $match: { userId: req.user._id, completed: true } },
            { $group: { _id: '$type', count: { $sum: 1 }, totalDuration: { $sum: '$duration' } } }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalSessions,
                totalMinutes: totalMinutes[0]?.total || 0,
                byType: sessionsByType
            }
        });
    } catch (error) {
        next(error);
    }
};
