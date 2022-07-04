var express = require("express");
const { v4: uuidv4 } = require("uuid");
const Teachers = require("../models/teachers");
uuidv4();

var router = express.Router();

router.get("/get/:Id", async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ teacherId: req.params.Id });
    res.status(200).json({
      data: teacher,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/add", async (req, res) => {
  let data = new Teachers({
    fullName: req.body.fullName,
  });
  data.save();
  res.status(200).json({
    data: data,
  });
});

router.delete("/delete/:Id", async (req, res) => {
  try {
    const teacher = await Teachers.findOneAndDelete({
      teacherId: req.params.Id,
    });
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
