var express = require("express");
const { v4: uuidv4 } = require("uuid");
const subjects = require("../models/subjects");
uuidv4();

var router = express.Router();

router.get("/getSubjects/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await subjects.findOne({ subjectId: subjectId });
    res.status(200).json({
      message: "subject details",
      data: subject,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addSubject", async (req, res) => {
  const { name } = req.body;
  const subjectId = uuidv4();
  let data = new subjects({
    Name: name,
    subjectId: subjectId,
  });
  data.save();
  res.status(200).json({
    message: "subject added",
    data: data,
  });
});

router.delete("/deleteSubject/:subjectName", async (req, res) => {
  try {
    const { subjectName } = req.params;
    console.log(subjectName);
    const subject = await subjects.findOneAndDelete({ Name: subjectName });
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
