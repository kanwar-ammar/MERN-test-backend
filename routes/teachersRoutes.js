var express = require("express");
const { v4: uuidv4 } = require("uuid");
const Teachers = require("../models/teachers");
uuidv4();

var router = express.Router();

router.get("/getTeacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teachers.findOne({ teacherId: teacherId });
    res.status(200).json({
      message: "teacher details",
      data: teacher,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addTeacher", async (req, res) => {
  const { fullName } = req.body;
  const teacherId = uuidv4();
  let data = new Teachers({
    fullName: fullName,
    teacherId: teacherId,
  });
  data.save();
  res.status(200).json({
    message: "teacher added",
    data: data,
  });
});

router.delete("/deleteTeacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teachers.findOneAndDelete({ teacherId: teacherId });
    teacher.save();
    res.status(200).json({
      message: "teacher deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
