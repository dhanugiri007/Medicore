const prescriptionModel = require('../models/prescription.model');

/*
 * - Get All Prescriptions
 * - GET /api/admin/prescriptions
 */
async function getAllPrescriptions(req, res) {
    try {
        const prescriptions = await prescriptionModel.find()
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email' }
            })
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
 * - GET /api/admin/prescriptions/:prescriptionId
 */
async function getPrescriptionById(req, res) {
    try {
        const prescription = await prescriptionModel.findById(req.params.prescriptionId)
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email phone' }
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
    getAllPrescriptions,
    getPrescriptionById
};