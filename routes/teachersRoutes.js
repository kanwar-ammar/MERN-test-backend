var express = require("express");
const { v4: uuidv4 } = require("uuid");
const Teachers = require("../models/teachers");
const scores = require("../models/scores");
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

router.get("/getMostTeacher", async (req, res) => {
  const score = await scores.find();
  let allTeachers = [];
  for (var teachers of score) {
    // let count = 0;
    const teacher = await Teachers.findOne({ teacherId: teachers.teacherId });
    const countTeachers = await scores.countDocuments({
      teacherId: teacher.teacherId,
    });
    // console.log(teacher);
    console.log(
      allTeachers,
      [teacher.fullName, countTeachers],
      allTeachers.includes([teacher.fullName, countTeachers])
    );
    if (!allTeachers.includes([teacher.fullName, countTeachers])) {
      allTeachers.push([teacher.fullName, countTeachers]);
      // count = count + 1;
    }
  }
  console.log(allTeachers);
  let temp = null;
  let allNewTeachers = allTeachers.map(function (item, pos, self) {
    console.log(["kanwar Ammar", 6] !== ["kanwar Ammar", 6]);
    if (temp != item) {
      console.log("insie if", temp, item);
      temp = item;
      return item;
    }
  });
  // let uniqueArray = allTeachers.filter(function (item, pos, self) {
  //   return self.indexOf(item) != pos;
  // });
  console.log(allNewTeachers);
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
