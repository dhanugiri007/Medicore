const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: [true, 'Appointment must be linked to a patient'],
        index: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Appointment must be linked to a doctor'],
        index: true
    },
    date: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    timeSlot: {
        type: String,
        required: [true, 'Time slot is required']
    },
    reason: {
        type: String,
        trim: true,
        required: [true, 'Reason for visit is required']
    },
    status: {
        type: String,
        enum: {
            values: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
            message: 'Status must be PENDING, CONFIRMED, COMPLETED or CANCELLED'
        },
        default: 'PENDING'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

appointmentSchema.index({ patient: 1, status: 1 });
appointmentSchema.index({ doctor: 1, date: 1 });

const appointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = appointmentModel;