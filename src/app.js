const express = require('express');
const cookie = require('cookie-parser');
const path = require('path');

const authRouter = require('./routes/auth.route');
const patientRouter = require('./routes/patient.route');
const appointmentRouter = require('./routes/appointment.route');
const prescriptionRouter = require('./routes/prescription.route');
const billRouter = require('./routes/billing.route');
const doctorRouter = require('./routes/doctor.route');
const doctorAppointmentRouter = require('./routes/doctor.appointment.route');
const doctorPrescriptionRouter = require('./routes/doctor.prescription.route');
const doctorBillingRouter = require('./routes/doctor.billing.route');
const adminRouter = require('./routes/admin.route');
const adminAppointmentRouter = require('./routes/admin.appointment.route');
const adminPrescriptionRouter = require('./routes/admin.prescription.route');
const adminBillingRouter = require('./routes/admin.billing.route');


const app = express();

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '../public')));

//auth
app.use('/api/auth', authRouter);

//patient
app.use('/api/patient', patientRouter);
app.use('/api/appointment',appointmentRouter);
app.use('/api/prescription',prescriptionRouter);
app.use('/api/bill',billRouter);

//doctor
app.use('/api/doctor',doctorRouter);
app.use('api/doctor/appointments',doctorAppointmentRouter);
app.use('/api/doctor/prescriptions',doctorPrescriptionRouter);
app.use('/api/doctor/bill',doctorBillingRouter);

//admin
app.use('/api/admin',adminRouter);
app.use('/api/admin/appointments',adminAppointmentRouter);
app.use('/api/admin/prescriptions',adminPrescriptionRouter);
app.use('/api/admin/bill',adminBillingRouter);

module.exports = app;
