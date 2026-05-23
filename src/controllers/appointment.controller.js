const appointmentModel = require('../models/appointment.model');
const patientModel = require('../models/patient.model');
const userModel = require('../models/user.model');

/*
 * - Book Appointment
 * - POST /api/appointments
 */
async function bookAppointment(req, res) {
    try {
        const { doctorId, date, timeSlot, reason } = req.body;

        if (!doctorId || !date || !timeSlot || !reason) {
            return res.status(400).json({ message: 'doctorId, date, timeSlot and reason are required' });
        }

        const doctor = await userModel.findOne({ _id: doctorId, role: 'doctor', isActive: true });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Please create your patient profile first' });
        }

        const slotTaken = await appointmentModel.findOne({
            doctor: doctorId,
            date: new Date(date),
            timeSlot,
            status: { $in: ['PENDING', 'CONFIRMED'] }
        });

        if (slotTaken) {
            return res.status(409).json({ message: 'This time slot is already booked. Please choose another.' });
        }

        const appointment = await appointmentModel.create({
            patient: patient._id,
            doctor: doctorId,
            date: new Date(date),
            timeSlot,
            reason
        });

        return res.status(201).json({
            message: 'Appointment booked successfully',
            appointment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get My Appointments
 * - GET /api/appointments
 */
async function getMyAppointments(req, res) {
    try {
        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        const appointments = await appointmentModel.find({ patient: patient._id })
            .populate('doctor', 'name email phone')
            .sort({ date: -1 });

        return res.status(200).json({ appointments });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Cancel Appointment
 * - PUT /api/appointments/:appointmentId/cancel
 */
async function cancelAppointment(req, res) {
    try {
        const { appointmentId } = req.params;

        const patient = await patientModel.findOne({ user: req.user._id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        const appointment = await appointmentModel.findOne({
            _id: appointmentId,
            patient: patient._id
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.status === 'COMPLETED' || appointment.status === 'CANCELLED') {
            return res.status(400).json({ message: `Appointment is already ${appointment.status.toLowerCase()}` });
        }

        appointment.status = 'CANCELLED';
        await appointment.save();

        return res.status(200).json({
            message: 'Appointment cancelled successfully',
            appointment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    bookAppointment,
    getMyAppointments,
    cancelAppointment
};