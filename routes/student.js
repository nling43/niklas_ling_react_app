const express = require("express")
const signale = require("signale")
const Student = require("../models/student")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const student = await Student.find()
        res.status(200).send(student)
    } catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }

})


router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) {
            signale.error("student not found")
            res.status(404).send({ "code": 404, "method": "get", "message": "Not found" }
            )
        }
        else {
            res.status(200).send(student)
        }
    } catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }
})

router.post("/", async (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const savedstudent = await student.save()
        res.status(201).send({ "code": 201, "method": "POST", "message": "Created" })

    }


    catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "POST", "message": error.name })

    }


})

router.put("/:id", async (req, res) => {

    try {
        const student = await Student.findById(req.params.id)

        if (!user) {
            signale.error("Not found")
            res.status(404).send({ "code": 404, "method": "get", "message": "Not found" })
        }

        else {
            if (req.body.name) {
                student.name = req.body.name
            }
            if (req.body.age) {
                student.description = req.body.description
            }
            await student.save()
            res.status(200).send({ "code": 200, "method": "PUT", "message": "OK" })
        }
    }
    catch (error) {
        res.status(400).send({ "code": 400, "method": "PUT", "message": error.name })

    }

})



router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) {
            res.status(404).send({ "code": 404, "method": "DEL", "message": "Not found" })
        }
        else {
            student.delete()
            res.status(200).send({ "code": 200, "method": "DEL", "message": "OK" })
        }
    }
    catch (error) {
        res.status(400).send({ "code": 400, "method": "DEL", "message": error.name })
    }
})
module.exports = router