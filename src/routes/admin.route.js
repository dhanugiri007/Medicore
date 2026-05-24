const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isAdmin);

// GET /api/admin/users
router.get('/users', adminController.getAllUsers);

// GET /api/admin/users/:userId
router.get('/users/:userId', adminController.getUserById);

// PUT /api/admin/users/:userId/toggle-status
router.put('/users/:userId/toggle-status', adminController.toggleUserStatus);

// DELETE /api/admin/users/:userId
router.delete('/users/:userId', adminController.deleteUser);

// GET /api/admin/patients
router.get('/patients', adminController.getAllPatients);

// GET /api/admin/doctors
router.get('/doctors', adminController.getAllDoctors);

module.exports = router;