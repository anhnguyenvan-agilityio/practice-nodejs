const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/api-error');

const userSchema = new mongoose.Schema(
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

userSchema.statics.getUsers = async function () {
  try {
    return await this.find().select('username _id email cash');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.findById(id).select('username _id email cash');
    }
    if (user) {
      return user;
    }
    throw new APIError({
      message: 'User does not exist',
      status: httpStatus.NOT_FOUND,
    });
  } catch (err) {
    console.log('usermodel-->', err);
    throw err;
  }
};

module.exports = mongoose.model('user', userSchema);
