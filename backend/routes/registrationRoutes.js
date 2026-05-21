const express = require('express');
const { registerForEvent, getMyRegistrations, cancelRegistration, getEventRegistrations } = require('../controllers/registrationController');
const { protect, organizer } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, registerForEvent)
  .get(protect, getMyRegistrations);

router.route('/:id')
  .put(protect, cancelRegistration);

router.route('/event/:eventId')
  .get(protect, organizer, getEventRegistrations);

module.exports = router;
