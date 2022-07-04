var express = require("express");
const { v4: uuidv4 } = require("uuid");
const scores = require("../models/scores");
const Students = require("../models/students");
uuidv4();

var router = express.Router();

router.get("/get/:Id", async (req, res) => {
  try {
    const student = await Students.findOne({ studentId: req.params.Id });
    res.status(200).json({
      message: "student details",
      data: student,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/topfive", async (req, res) => {
  try {
    const students = await scores.find().sort({ score: "desc" }).limit(5);
    res.status(200).json({
      data: students,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log(req.body.fullName);
    let data = new Students({
      fullName: req.body.fullName,
    });
    data.save((err, student) => {
      if (!err) {
        res.status(200).json({
          data: student,
        });
      } else {
        res.status(400).send(err.message);
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.delete("/delete/:Id", async (req, res) => {
  try {
    const student = await Students.findOneAndDelete({
      studentId: req.params.Id,
    });
    student.save();
    res.status(200).json({
      message: "student deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
