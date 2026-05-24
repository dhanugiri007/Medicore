const doctorModel = require('../models/doctor.model');
const patientModel = require('../models/patient.model');
const appointmentModel = require('../models/appointment.model');

/*
 * - Create Doctor Profile
 * - POST /api/doctor/profile
 */
async function createDoctorProfile(req, res) {
    try {
        const { specialization, qualification, experience, consultationFee, availableDays, availableTimeSlots, bio } = req.body;

        const alreadyExists = await doctorModel.findOne({ user: req.user._id });

        if (alreadyExists) {
            return res.status(422).json({ message: 'Doctor profile already exists' });
        }

        const doctor = await doctorModel.create({
            user: req.user._id,
            specialization,
            qualification,
            experience,
            consultationFee,
            availableDays,
            availableTimeSlots,
            bio
        });

        return res.status(201).json({
            message: 'Doctor profile created successfully',
            doctor
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get My Doctor Profile
 * - GET /api/doctor/profile
 */
async function getMyProfile(req, res) {
    try {
        const doctor = await doctorModel.findOne({ user: req.user._id }).populate('user', 'name email phone');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        return res.status(200).json({ doctor });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Update Doctor Profile
 * - PUT /api/doctor/profile
 */
async function updateDoctorProfile(req, res) {
    try {
        const { specialization, qualification, experience, consultationFee, availableDays, availableTimeSlots, bio } = req.body;

        const doctor = await doctorModel.findOneAndUpdate(
            { user: req.user._id },
            { specialization, qualification, experience, consultationFee, availableDays, availableTimeSlots, bio },
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        return res.status(200).json({
            message: 'Doctor profile updated successfully',
            doctor
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createDoctorProfile,
    getMyProfile,
    updateDoctorProfile
};