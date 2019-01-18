const express = require('express')
const router = express.Router()

const Skills = require("../models/Skills");

router.get("/dashboard", (req, res) => {
    Skills.find()
        .then(skills => {
            res.send({
                skills: skills
            });
        })
        .catch(err => {
            res.send({
                skills: "errors"
            });
        })
});

router.post("/create", (req, res) => {

    let arr = {
        skillName: req.body.skillName,
        skillDescription: ""
    }
    Skills.create(arr)
        .then(skills => {
            res.send({
                skills: skills
            });
        })
        .catch(err => {
            res.send("Error");
        })
});

router.put("/update", (req, res) => {

    let arr = {
        skillName: req.body.skillName,
        skillDescription: req.body.skillDescription
    }
    Skills.findByIdAndUpdate(req.body.id, arr, {
            new: true,
            useFindAndModify: false
        })
        .then(skills => {
            res.send({
                success: true
            });
        })
        .catch(err => {
            res.send({
                success: false
            });
        })
});

router.get("/delete/:id", (req, res) => {
    var query = {
        _id: req.params.id
    };
    Skills.deleteOne(query)
        .then(skills => {
            res.send({
                success: true
            });
        })
        .catch(err => {
            res.send({
                success: false
            });
        })
});

module.exports = router;