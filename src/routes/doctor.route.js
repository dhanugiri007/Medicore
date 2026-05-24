const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { isDoctor } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware, isDoctor);

// POST /api/doctor/profile
router.post('/profile', doctorController.createDoctorProfile);

// GET /api/doctor/profile
router.get('/profile', doctorController.getMyProfile);

// PUT /api/doctor/profile
router.put('/profile', doctorController.updateDoctorProfile);

module.exports = router;