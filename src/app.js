const express = require('express');
const cookie = require('cookie-parser');

const authRouter = require('./routes/auth.route');
const patientRouter = require('./routes/patient.route');

const app = express();

app.use(express.json());
app.use(cookie());


app.use('/api/auth', authRouter);
app.use('/api/patient', patientRouter);

module.exports = app;
