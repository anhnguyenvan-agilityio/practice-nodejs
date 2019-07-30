const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    password: { type: String, required: true },
    cash: { type: Number, default: 0 }
  },
  {
    collection: "User"
  }
);

let User = mongoose.model("User", UserModel);

module.exports = User;
