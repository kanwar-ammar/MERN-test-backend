var express = require("express");
const { v4: uuidv4 } = require("uuid");
const Scores = require("../models/scores");
const students = require("../models/students");
const subjects = require("../models/subjects");
const teachers = require("../models/teachers");
uuidv4();
var router = express.Router();

router.get("/getScore/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const scores = await Scores.findOne({ studentId: studentId });
    res.status(200).json({
      message: "student scores",
      data: scores,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/postScore", async (req, res) => {
  try {
    const { studentName, teacherName, subjectName, score } = req.body;
    const student = await students.findOne({ fullName: studentName });
    const teacher = await teachers.findOne({ fullName: teacherName });
    const subject = await subjects.findOne({ Name: subjectName });
    const scoreId = uuidv4();
    console.log(student, teacher, subject, scoreId);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let data = new Scores({
      scoreId: scoreId,
      studentId: student.studentId,
      teacherId: teacher.teacherId,
      subjectId: subject.subjectId,
      score: score,
      dateAdded: mm + "/" + dd + "/" + yyyy,
    });
    data.save();
    res.status(200).json({
      message: "scores added",
      data: data,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
