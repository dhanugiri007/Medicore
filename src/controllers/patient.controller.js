const patientModel = require('../models/patient.model');
const userModel = require('../models/user.model');

/*
 * - Create Patient Profile
 * - POST /api/patient/profile
 */
async function createPatientProfile(req, res) {
    try {
        const { age, gender, bloodGroup, address, allergies, medicalHistory, emergencyContact } = req.body;

        const alreadyExists = await patientModel.findOne({ user: req.user._id });

        if (alreadyExists) {
            return res.status(422).json({ message: 'Patient profile already exists' });
        }

        const patient = await patientModel.create({
            user: req.user._id,
            age,
            gender,
            bloodGroup,
            address,
            allergies,
            medicalHistory,
            emergencyContact
        });

        return res.status(201).json({
            message: 'Patient profile created successfully',
            patient
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get My Patient Profile
 * - GET /api/patient/profile
 */
async function getMyProfile(req, res) {
    try {
        const patient = await patientModel.findOne({ user: req.user._id }).populate('user', 'name email phone');

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        return res.status(200).json({ patient });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Update Patient Profile
 * - PUT /api/patient/profile
 */
async function updatePatientProfile(req, res) {
    try {
        const { age, gender, bloodGroup, address, allergies, medicalHistory, emergencyContact } = req.body;

        const patient = await patientModel.findOneAndUpdate(
            { user: req.user._id },
            { age, gender, bloodGroup, address, allergies, medicalHistory, emergencyContact },
            { new: true, runValidators: true }
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        return res.status(200).json({
            message: 'Patient profile updated successfully',
            patient
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Available Doctors
 * - GET /api/patient/doctors
 */
async function getAvailableDoctors(req, res) {
    try {
        const doctors = await userModel.find({ role: 'doctor', isActive: true }, 'name email phone');

        return res.status(200).json({ doctors });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createPatientProfile,
    getMyProfile,
    updatePatientProfile,
    getAvailableDoctors
};