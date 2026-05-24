const appointmentModel = require('../models/appointment.model');
const doctorModel = require('../models/doctor.model');

/*
 * - Get My Appointments
 * - GET /api/doctor/appointments
 */
async function getDoctorAppointments(req, res) {
    try {
        const appointments = await appointmentModel.find({ doctor: req.user._id })
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email phone' }
            })
            .sort({ date: -1 });

        return res.status(200).json({ appointments });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Single Appointment
 * - GET /api/doctor/appointments/:appointmentId
 */
async function getAppointmentById(req, res) {
    try {
        const appointment = await appointmentModel.findOne({
            _id: req.params.appointmentId,
            doctor: req.user._id
        }).populate({
            path: 'patient',
            populate: { path: 'user', select: 'name email phone' }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).json({ appointment });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Confirm Appointment
 * - PUT /api/doctor/appointments/:appointmentId/confirm
 */
async function confirmAppointment(req, res) {
    try {
        const appointment = await appointmentModel.findOne({
            _id: req.params.appointmentId,
            doctor: req.user._id
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.status !== 'PENDING') {
            return res.status(400).json({ message: `Appointment is already ${appointment.status.toLowerCase()}` });
        }

        appointment.status = 'CONFIRMED';
        await appointment.save();

        return res.status(200).json({
            message: 'Appointment confirmed successfully',
            appointment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Complete Appointment
 * - PUT /api/doctor/appointments/:appointmentId/complete
 */
async function completeAppointment(req, res) {
    try {
        const { notes } = req.body;

        const appointment = await appointmentModel.findOne({
            _id: req.params.appointmentId,
            doctor: req.user._id
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.status !== 'CONFIRMED') {
            return res.status(400).json({ message: 'Only confirmed appointments can be marked as completed' });
        }

        appointment.status = 'COMPLETED';
        if (notes) appointment.notes = notes;
        await appointment.save();

        return res.status(200).json({
            message: 'Appointment marked as completed',
            appointment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Cancel Appointment
 * - PUT /api/doctor/appointments/:appointmentId/cancel
 */
async function cancelAppointment(req, res) {
    try {
        const appointment = await appointmentModel.findOne({
            _id: req.params.appointmentId,
            doctor: req.user._id
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
    getDoctorAppointments,
    getAppointmentById,
    confirmAppointment,
    completeAppointment,
    cancelAppointment
};