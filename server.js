const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signale = require('signale');
const studentRoute = require('./routes/student');
const courseRoute = require('./routes/course');
const registrationRoute = require('./routes/registration');


//middleware
app.use(express.json())
app.use(express.static('dist'))

//routes
app.use('/api/student', studentRoute);
app.use('/api/course', courseRoute);
app.use('/api/registration', registrationRoute);
// connect to DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        signale.success('Connected to db')
    })
//http://localhost:3000
app.listen(process.env.PORT, () => {
    signale.success('Server running')
})