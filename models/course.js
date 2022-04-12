const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    description: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Course', courseSchema)