const express = require('express');
const billingController = require('../controllers/billing.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isPatient } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isPatient);

// GET /api/billing
router.get('/', billingController.getMyBills);

// GET /api/billing/:billId
router.get('/:billId', billingController.getBillById);

module.exports = router;