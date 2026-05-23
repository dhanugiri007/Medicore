const express = require('express');
const patientController = require('../controllers/patient.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isPatient } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isPatient);

// POST /api/patient/profile
router.post('/profile', patientController.createPatientProfile);

// GET /api/patient/profile
router.get('/profile', patientController.getMyProfile);

// PUT /api/patient/profile
router.put('/profile', patientController.updatePatientProfile);

// GET /api/patient/doctors
router.get('/doctors', patientController.getAvailableDoctors);

module.exports = router;