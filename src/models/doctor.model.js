const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Doctor must be linked to a user'],
        unique: true,
        index: true
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
        trim: true
    },
    qualification: {
        type: String,
        required: [true, 'Qualification is required'],
        trim: true
    },
    experience: {
        type: Number,
        required: [true, 'Experience in years is required'],
        min: 0
    },
    consultationFee: {
        type: Number,
        required: [true, 'Consultation fee is required'],
        min: 0
    },
    availableDays: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        default: []
    },
    availableTimeSlots: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const doctorModel = mongoose.model('doctor', doctorSchema);

module.exports = doctorModel;