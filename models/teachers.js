const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teachers = new Schema({
  teacherId: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("teachers", teachers);
