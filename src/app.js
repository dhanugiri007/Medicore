const express = require('express');
const cookie = require('cookie-parser');

const authRouter = require('./routes/auth.route');
const patientRouter = require('./routes/patient.route');
const appointmentRouter = require('./routes/appointment.route');
const prescriptionRouter = require('./routes/prescription.route');
const billRouter = require('./routes/billing.route');
const doctorRouter = require('./routes/doctor.route');
const doctorAppointmentRouter = require('./routes/doctor.appointment.route');
const app = express();

app.use(express.json());
app.use(cookie());


app.use('/api/auth', authRouter);
app.use('/api/patient', patientRouter);
app.use('/api/appointment',appointmentRouter);
app.use('/api/prescription',prescriptionRouter);
app.use('/api/bill',billRouter);
app.use('/api/doctor',doctorRouter);
app.use('api/doctor/appointments',doctorAppointmentRouter);

module.exports = app;
