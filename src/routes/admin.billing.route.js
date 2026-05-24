const express = require('express');
const adminBillingController = require('../controllers/admin.billing.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isAdmin);

// GET /api/admin/billing
router.get('/', adminBillingController.getAllBills);

// GET /api/admin/billing/:billId
router.get('/:billId', adminBillingController.getBillById);

// PUT /api/admin/billing/:billId/mark-paid
router.put('/:billId/mark-paid', adminBillingController.markBillAsPaid);

module.exports = router;