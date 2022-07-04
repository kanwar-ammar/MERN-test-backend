const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const students = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("students", students);
