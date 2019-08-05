const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    cash: { type: Number, default: 0 },
  },
  {
    collection: 'user',
  },
);

const User = mongoose.model('user', UserModel);

module.exports = User;
