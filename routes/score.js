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
    const scores = await Scores.findOne({ studentId: studentId }).populate(
      "studentId teacherId subjectId",
      "fullName Name"
    );
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
    const { studentId, teacherId, subjectId, score } = req.body;
    let data = new Scores({
      studentId: studentId,
      teacherId: teacherId,
      subjectId: subjectId,
      score: score,
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
