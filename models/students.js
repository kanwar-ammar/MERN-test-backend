const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const students = new Schema({
  studentId: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  dateAdded: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("students", students);
