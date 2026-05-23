const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Patient must be linked to a user'],
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required']
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: [true, 'Blood group is required']
    },
    address: {
        type: String,
        trim: true
    },
    allergies: {
        type: [String],
        default: []
    },
    medicalHistory: {
        type: [String],
        default: []
    },
    emergencyContact: {
        name: { type: String, trim: true },
        phone: { type: String, trim: true },
        relation: { type: String, trim: true }
    }
}, {
    timestamps: true
});

const patientModel = mongoose.model('patient', patientSchema);

module.exports = patientModel;