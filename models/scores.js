const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scores = new Schema({
  scoreId: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },

  subjectId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("scores", scores);
