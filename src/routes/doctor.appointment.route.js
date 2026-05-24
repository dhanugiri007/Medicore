const express = require('express');
const doctorAppointmentController = require('../controllers/doctor.appointment.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isDoctor } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isDoctor);

// GET /api/doctor/appointments
router.get('/', doctorAppointmentController.getDoctorAppointments);

// GET /api/doctor/appointments/:appointmentId
router.get('/:appointmentId', doctorAppointmentController.getAppointmentById);

// PUT /api/doctor/appointments/:appointmentId/confirm
router.put('/:appointmentId/confirm', doctorAppointmentController.confirmAppointment);

// PUT /api/doctor/appointments/:appointmentId/complete
router.put('/:appointmentId/complete', doctorAppointmentController.completeAppointment);

// PUT /api/doctor/appointments/:appointmentId/cancel
router.put('/:appointmentId/cancel', doctorAppointmentController.cancelAppointment);

module.exports = router;