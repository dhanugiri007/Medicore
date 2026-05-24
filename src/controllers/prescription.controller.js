const prescriptionModel = require('../models/prescription.model');
const patientModel = require('../models/patient.model');

/*
 * - Get My Prescriptions
 * - GET /api/prescriptions
 */
async function getMyPrescriptions(req, res) {
    try {
        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        const prescriptions = await prescriptionModel.find({ patient: patient._id })
            .populate('doctor', 'name email')
            .populate('appointment', 'date timeSlot reason')
            .sort({ createdAt: -1 });

        return res.status(200).json({ prescriptions });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Single Prescription
 * - GET /api/prescriptions/:prescriptionId
 */
async function getPrescriptionById(req, res) {
    try {
        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        const prescription = await prescriptionModel.findOne({
            _id: req.params.prescriptionId,
            patient: patient._id
        })
            .populate('doctor', 'name email phone')
            .populate('appointment', 'date timeSlot reason');

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        return res.status(200).json({ prescription });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getMyPrescriptions,
    getPrescriptionById
};