const express = require('express');
const doctorPrescriptionController = require('../controllers/doctor.prescription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isDoctor } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isDoctor);

// POST /api/doctor/prescriptions
router.post('/', doctorPrescriptionController.writePrescription);

// GET /api/doctor/prescriptions
router.get('/', doctorPrescriptionController.getDoctorPrescriptions);

// PUT /api/doctor/prescriptions/:prescriptionId
router.put('/:prescriptionId', doctorPrescriptionController.updatePrescription);

module.exports = router;