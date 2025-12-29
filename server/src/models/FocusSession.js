const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        enum: ['focus', 'short', 'long'],
        default: 'focus'
    },
    completed: {
        type: Boolean,
        default: false
    },
    startedAt: {
        type: Date,
        required: true
    },
    endedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for analytics queries
focusSessionSchema.index({ userId: 1, startedAt: -1 });
focusSessionSchema.index({ userId: 1, completed: 1 });

module.exports = mongoose.model('FocusSession', focusSessionSchema);
