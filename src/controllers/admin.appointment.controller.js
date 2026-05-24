const appointmentModel = require('../models/appointment.model');

/*
 * - Get All Appointments
 * - GET /api/admin/appointments
 */
async function getAllAppointments(req, res) {
    try {
        const appointments = await appointmentModel.find()
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email phone' }
            })
            .populate('doctor', 'name email phone')
            .sort({ date: -1 });

        return res.status(200).json({ appointments });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Single Appointment
 * - GET /api/admin/appointments/:appointmentId
 */
async function getAppointmentById(req, res) {
    try {
        const appointment = await appointmentModel.findById(req.params.appointmentId)
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email phone' }
            })
            .populate('doctor', 'name email phone');

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
 * - Cancel Any Appointment
 * - PUT /api/admin/appointments/:appointmentId/cancel
 */
async function cancelAppointment(req, res) {
    try {
        const appointment = await appointmentModel.findById(req.params.appointmentId);

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
    getAllAppointments,
    getAppointmentById,
    cancelAppointment
};