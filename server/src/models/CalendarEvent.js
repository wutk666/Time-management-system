const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide an event title'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    allDay: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '#8b5cf6'
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

// Update timestamp on save
calendarEventSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Index for date range queries
calendarEventSchema.index({ userId: 1, startDate: 1 });

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
