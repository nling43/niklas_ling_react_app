const express = require("express")
const signale = require("signale")
const Course = require("../models/course")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const course = await Course.find()
        res.status(200).send(course)
    } catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }

})


router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            signale.error("course not found")
            res.status(404).send({ "code": 404, "method": "get", "message": "Not found" }
            )
        }
        else {
            res.status(200).send(course)
        }
    } catch (error) {
        signale.error(error.name)
        res.status(400).send({ "code": 400, "method": "get", "message": error.name })
    }
})

router.post("/", async (req, res) => {
    const course = new Course({
        name: req.body.name,
        description: req.body.description
    })
    try {
        const savedCourse = await course.save()
        res.status(201).send({ "code": 201, "method": "POST", "message": "Created" })

    }


    catch (error) {
        signale.error(error)
        res.status(400).send({ "code": 400, "method": "POST", "message": error.name })

    }


})


router.put("/:id", async (req, res) => {

    try {
        const course = await Course.findById(req.params.id)

        if (!user) {
            signale.error("Not found")
            res.status(404).send({ "code": 404, "method": "get", "message": "Not found" })
        }

        else {
            if (req.body.name) {
                course.name = req.body.name
            }
            if (req.body.age) {
                course.description = req.body.description
            }
            await course.save()
            res.status(200).send({ "code": 200, "method": "PUT", "message": "OK" })
        }
    }
    catch (error) {
        res.status(400).send({ "code": 400, "method": "PUT", "message": error.name })

    }

})



router.delete("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) {
            res.status(404).send({ "code": 404, "method": "DEL", "message": "Not found" })
        }
        else {
            course.delete()
            res.status(200).send({ "code": 200, "method": "DEL", "message": "OK" })
        }
    }
    catch (error) {
        res.status(400).send({ "code": 400, "method": "DEL", "message": error.name })
    }
})
module.exports = router