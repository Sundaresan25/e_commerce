const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 150,
    },
    email: {
      type: String,
      required: true,
      maxlength: 150,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
      maxlength: 150,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
