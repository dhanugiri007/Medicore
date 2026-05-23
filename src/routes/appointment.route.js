const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isPatient } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isPatient);

// POST /api/appointments
router.post('/', appointmentController.bookAppointment);

// GET /api/appointments
router.get('/', appointmentController.getMyAppointments);

// PUT /api/appointments/:appointmentId/cancel
router.put('/:appointmentId/cancel', appointmentController.cancelAppointment);

module.exports = router;