const express = require("express")
const signale = require("signale")
const Registration = require("../models/registration")
const router = express.Router()
const mongoose = require('mongoose');


router.get("/", async (req, res) => {
    try {
        const some = await Registration.aggregate([
            {
                '$lookup': {
                    'from': 'students',
                    'localField': 'student',
                    'foreignField': '_id',
                    'as': 'student'
                }
            }, {
                '$lookup': {
                    'from': 'courses',
                    'localField': 'course',
                    'foreignField': '_id',
                    'as': 'course'
                }
            }
        ])
        res.status(200).send(some)
    } catch (error) {
        signale.error(error)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }

})


router.get('/:id', async (req, res) => {
    try {
        Registration.findOne({ _id: req.params.id })
            .populate("student")
            .populate("course")
            .then(reg => {
                res.json(reg);
            })
    } catch (error) {
        signale.error(error)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }
})
router.post("/", async (req, res) => {
    const registration = new Registration({
        student: req.body.student_ID,
        course: req.body.course_ID
    })

    try {

        const savedRegistration = await registration.save()

        res.status(201).send({ "code": 201, "method": "POST", "message": "Created" })

    }


    catch (error) {
        signale.error(error)
        res.status(400).send({ "code": 400, "method": "POST", "message": error.name })

    }


})






module.exports = router