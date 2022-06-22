const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjects = new Schema({
  subjectId: {
    type: String,
    required: true,
  },

  Name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("subjects", subjects);
