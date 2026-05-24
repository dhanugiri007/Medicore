const billModel = require('../models/bill.model');
const patientModel = require('../models/patient.model');

/*
 * - Get My Bills
 * - GET /api/billing
 */
async function getMyBills(req, res) {
    try {
        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        const bills = await billModel.find({ patient: patient._id })
            .populate('appointment', 'date timeSlot reason')
            .sort({ createdAt: -1 });

        return res.status(200).json({ bills });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Single Bill
 * - GET /api/billing/:billId
 */
async function getBillById(req, res) {
    try {
        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        const bill = await billModel.findOne({
            _id: req.params.billId,
            patient: patient._id
        }).populate('appointment', 'date timeSlot reason');

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        return res.status(200).json({ bill });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getMyBills,
    getBillById
};