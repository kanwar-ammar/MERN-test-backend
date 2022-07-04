const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teachers = new Schema(
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

module.exports = mongoose.model("teachers", teachers);
