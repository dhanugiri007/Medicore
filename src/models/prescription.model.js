const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String, trim: true }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment',
        required: [true, 'Prescription must be linked to an appointment'],
        index: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: [true, 'Prescription must be linked to a patient'],
        index: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Prescription must be linked to a doctor']
    },
    diagnosis: {
        type: String,
        required: [true, 'Diagnosis is required'],
        trim: true
    },
    medicines: {
        type: [medicineSchema],
        default: []
    },
    labTests: {
        type: [String],
        default: []
    },
    advice: {
        type: String,
        trim: true
    },
    followUpDate: {
        type: Date
    }
}, {
    timestamps: true
});

const prescriptionModel = mongoose.model('prescription', prescriptionSchema);

module.exports = prescriptionModel;