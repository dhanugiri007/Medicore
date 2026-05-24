const express = require('express');
const adminPrescriptionController = require('../controllers/admin.prescription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isAdmin);

// GET /api/admin/prescriptions
router.get('/', adminPrescriptionController.getAllPrescriptions);

// GET /api/admin/prescriptions/:prescriptionId
router.get('/:prescriptionId', adminPrescriptionController.getPrescriptionById);

module.exports = router;