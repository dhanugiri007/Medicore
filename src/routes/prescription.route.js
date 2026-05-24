const express = require('express');
const prescriptionController = require('../controllers/prescription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isPatient } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isPatient);

// GET /api/prescriptions
router.get('/', prescriptionController.getMyPrescriptions);

// GET /api/prescriptions/:prescriptionId
router.get('/:prescriptionId', prescriptionController.getPrescriptionById);

module.exports = router;