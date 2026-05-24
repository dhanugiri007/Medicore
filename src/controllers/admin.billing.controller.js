const billModel = require('../models/bill.model');

/*
 * - Get All Bills
 * - GET /api/admin/billing
 */
async function getAllBills(req, res) {
    try {
        const bills = await billModel.find()
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email phone' }
            })
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
 * - GET /api/admin/billing/:billId
 */
async function getBillById(req, res) {
    try {
        const bill = await billModel.findById(req.params.billId)
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email phone' }
            })
            .populate('appointment', 'date timeSlot reason');

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        return res.status(200).json({ bill });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Mark Bill as Paid
 * - PUT /api/admin/billing/:billId/mark-paid
 */
async function markBillAsPaid(req, res) {
    try {
        const bill = await billModel.findById(req.params.billId);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        if (bill.paymentStatus === 'PAID') {
            return res.status(400).json({ message: 'Bill is already paid' });
        }

        bill.paymentStatus = 'PAID';
        bill.paidAt = new Date();
        await bill.save();

        return res.status(200).json({
            message: 'Bill marked as paid successfully',
            bill
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllBills,
    getBillById,
    markBillAsPaid
};