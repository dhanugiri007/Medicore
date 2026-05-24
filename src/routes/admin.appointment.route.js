const express = require('express');
const adminAppointmentController = require('../controllers/admin.appointment.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isAdmin);

// GET /api/admin/appointments
router.get('/', adminAppointmentController.getAllAppointments);

// GET /api/admin/appointments/:appointmentId
router.get('/:appointmentId', adminAppointmentController.getAppointmentById);

// PUT /api/admin/appointments/:appointmentId/cancel
router.put('/:appointmentId/cancel', adminAppointmentController.cancelAppointment);

module.exports = router;