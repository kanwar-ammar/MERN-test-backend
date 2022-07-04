var express = require("express");
const { v4: uuidv4 } = require("uuid");
const subjects = require("../models/subjects");
uuidv4();

var router = express.Router();

router.get("/get/:Id", async (req, res) => {
  try {
    const subject = await subjects.findOne({ subjectId: req.params.Id });
    res.status(200).json({
      data: subject,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/add", async (req, res) => {
  let data = new subjects({
    Name: req.body.name,
  });
  data.save();
  res.status(200).json({
    data: data,
  });
});

router.delete("/deleteSubject/:name", async (req, res) => {
  try {
    const subject = await subjects.findOneAndDelete({
      Name: req.params.name,
    });
    subject.save();
    res.status(200).json({
      message: "subject deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
