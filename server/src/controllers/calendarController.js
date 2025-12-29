const CalendarEvent = require('../models/CalendarEvent');

// @desc    Get all calendar events for user
// @route   GET /api/calendar
// @access  Private
exports.getEvents = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        let query = { userId: req.user.id };

        if (startDate && endDate) {
            query.startDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const events = await CalendarEvent.find(query).sort({ startDate: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create calendar event
// @route   POST /api/calendar
// @access  Private
exports.createEvent = async (req, res, next) => {
    try {
        req.body.userId = req.user.id;

        const event = await CalendarEvent.create(req.body);

        res.status(201).json({
            success: true,
            event
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update calendar event
// @route   PUT /api/calendar/:id
// @access  Private
exports.updateEvent = async (req, res, next) => {
    try {
        let event = await CalendarEvent.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        event = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete calendar event
// @route   DELETE /api/calendar/:id
// @access  Private
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await CalendarEvent.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
