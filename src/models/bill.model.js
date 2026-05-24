const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }
}, { _id: false });

const billSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: [true, 'Bill must be linked to a patient'],
        index: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment',
        required: [true, 'Bill must be linked to an appointment']
    },
    items: {
        type: [billItemSchema],
        default: []
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: {
            values: ['UNPAID', 'PAID'],
            message: 'Payment status must be UNPAID or PAID'
        },
        default: 'UNPAID'
    },
    paidAt: {
        type: Date
    }
}, {
    timestamps: true
});

const billModel = mongoose.model('bill', billSchema);

module.exports = billModel;