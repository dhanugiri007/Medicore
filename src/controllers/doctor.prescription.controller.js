const prescriptionModel = require('../models/prescription.model');
const appointmentModel = require('../models/appointment.model');
const billModel = require('../models/bill.model');
const doctorModel = require('../models/doctor.model');

/*
 * - Write Prescription
 * - POST /api/doctor/prescriptions
 */
async function writePrescription(req, res) {
    try {
        const { appointmentId, diagnosis, medicines, labTests, advice, followUpDate } = req.body;

        if (!appointmentId || !diagnosis) {
            return res.status(400).json({ message: 'appointmentId and diagnosis are required' });
        }

        const appointment = await appointmentModel.findOne({
            _id: appointmentId,
            doctor: req.user._id,
            status: 'COMPLETED'
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Completed appointment not found' });
        }

        const alreadyExists = await prescriptionModel.findOne({ appointment: appointmentId });

        if (alreadyExists) {
            return res.status(422).json({ message: 'Prescription already written for this appointment' });
        }

        const prescription = await prescriptionModel.create({
            appointment: appointmentId,
            patient: appointment.patient,
            doctor: req.user._id,
            diagnosis,
            medicines,
            labTests,
            advice,
            followUpDate
        });

        return res.status(201).json({
            message: 'Prescription written successfully',
            prescription
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get All Prescriptions Written by Doctor
 * - GET /api/doctor/prescriptions
 */
async function getDoctorPrescriptions(req, res) {
    try {
        const prescriptions = await prescriptionModel.find({ doctor: req.user._id })
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email' }
            })
            .populate('appointment', 'date timeSlot reason')
            .sort({ createdAt: -1 });

        return res.status(200).json({ prescriptions });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Update Prescription
 * - PUT /api/doctor/prescriptions/:prescriptionId
 */
async function updatePrescription(req, res) {
    try {
        const { diagnosis, medicines, labTests, advice, followUpDate } = req.body;

        const prescription = await prescriptionModel.findOneAndUpdate(
            { _id: req.params.prescriptionId, doctor: req.user._id },
            { diagnosis, medicines, labTests, advice, followUpDate },
            { new: true, runValidators: true }
        );

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        return res.status(200).json({
            message: 'Prescription updated successfully',
            prescription
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    writePrescription,
    getDoctorPrescriptions,
    updatePrescription
};