const express = require('express');
const {
    getFocusSessions,
    createFocusSession,
    updateFocusSession,
    getFocusStats
} = require('../controllers/focusController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getFocusSessions)
    .post(createFocusSession);

router.get('/stats', getFocusStats);

router.put('/:id', updateFocusSession);

module.exports = router;
