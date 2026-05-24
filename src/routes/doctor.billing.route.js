const express = require('express');
const doctorBillingController = require('../controllers/doctor.billing.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isDoctor } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isDoctor);

// POST /api/doctor/billing
router.post('/', doctorBillingController.generateBill);

// GET /api/doctor/billing
router.get('/', doctorBillingController.getDoctorBills);

module.exports = router;