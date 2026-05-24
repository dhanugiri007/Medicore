const userModel = require('../models/user.model');
const patientModel = require('../models/patient.model');
const doctorModel = require('../models/doctor.model');

/*
 * - Get All Users
 * - GET /api/admin/users
 */
async function getAllUsers(req, res) {
    try {
        const users = await userModel.find({}, 'name email phone role isActive createdAt');

        return res.status(200).json({ users });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Single User
 * - GET /api/admin/users/:userId
 */
async function getUserById(req, res) {
    try {
        const user = await userModel.findById(req.params.userId, 'name email phone role isActive createdAt');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Activate or Deactivate User
 * - PUT /api/admin/users/:userId/toggle-status
 */
async function toggleUserStatus(req, res) {
    try {
        const user = await userModel.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Cannot deactivate an admin account' });
        }

        user.isActive = !user.isActive;
        await user.save();

        return res.status(200).json({
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get All Patients
 * - GET /api/admin/patients
 */
async function getAllPatients(req, res) {
    try {
        const patients = await patientModel.find()
            .populate('user', 'name email phone isActive');

        return res.status(200).json({ patients });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get All Doctors
 * - GET /api/admin/doctors
 */
async function getAllDoctors(req, res) {
    try {
        const doctors = await doctorModel.find()
            .populate('user', 'name email phone isActive');

        return res.status(200).json({ doctors });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Delete User
 * - DELETE /api/admin/users/:userId
 */
async function deleteUser(req, res) {
    try {
        const user = await userModel.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Cannot delete an admin account' });
        }

        await userModel.findByIdAndDelete(req.params.userId);

        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    toggleUserStatus,
    getAllPatients,
    getAllDoctors,
    deleteUser
};