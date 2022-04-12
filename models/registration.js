const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
    ,

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"

    },
    date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Registration', registrationSchema)