const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); 
const { isAdmin } = require('../middleware/adminMiddleware');

// Rotte 
router.get('/all', protect, isAdmin, appointmentController.getAllAppointments);

router.post('/', protect, appointmentController.createAppointment);
router.get('/', protect, appointmentController.getMyAppointments);
router.put('/:id/status', protect, appointmentController.updateStatus);
router.get('/artist', protect, appointmentController.getArtistAppointments);

module.exports = router;