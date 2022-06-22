var express = require("express");
const { v4: uuidv4 } = require("uuid");
const scores = require("../models/scores");
const Students = require("../models/students");
uuidv4();

var router = express.Router();

router.get("/getStudent/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Students.findOne({ studentId: studentId });
    res.status(200).json({
      message: "student details",
      data: student,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/topfive", async (req, res) => {
  const students = await scores.find().sort({ score: "desc" }).limit(5);
  res.status(200).json({
    data: students,
  });
});

router.post("/addStudent", async (req, res) => {
  try {
    const { fullName } = req.body;
    console.log(fullName);
    const studentId = uuidv4();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let data = new Students({
      fullName: fullName,
      studentId: studentId,
      dateAdded: mm + "/" + dd + "/" + yyyy,
    });
    data.save();
    res.status(200).json({
      message: "student added",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/deleteStudent/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Students.findOneAndDelete({ studentId: studentId });
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
