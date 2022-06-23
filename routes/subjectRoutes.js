var express = require("express");
const { v4: uuidv4 } = require("uuid");
const scores = require("../models/scores");
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

router.get("/getMostSubjects", async (req, res) => {
  // try {
  // const { subjectId } = req.params;
  const score = await scores.find();
  console.log(score);
  let max = 0;
  let temp = 0;
  let mostSubjectName = "";
  let subjectObj = {};
  for (var subject of score) {
    console.log(subject.subjectId);
    const subjectInDB = await subjects.findOne({
      subjectId: subject.subjectId,
    });
    const countSubject = await scores.countDocuments({
      subjectId: subject.subjectId,
    });
    // if (!subjectObj.subjectInDB.Name) {
      subjectObj.subjectInDB = countSubject;
      console.log(subjectObj);
    // }
    console.log(subject.subjectId, countSubject);
    temp = countSubject;
    if (temp > max) {
      max = temp;
      let subjectName = await subjects.findOne({
        subjectId: subject.subjectId,
      });

      mostSubjectName = subjectName;
    }
  }
  res.status(200).json({
    message: "most subjects",
    data: mostSubjectName,
  });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
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
