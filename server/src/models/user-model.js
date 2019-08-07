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

userSchema.statics.getUsers = function () {
  return this.find().select('username _id email cash');
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
    console.log('getUserById err: ', err);
    throw err;
  }
};

userSchema.statics.addUser = async function (user) {
  const {
    email, username, password, cash,
  } = user;
  const newUser = new this({
    email,
    username,
    password,
    cash,
  });
  return newUser.save();
};

userSchema.statics.checkExistUser = async function (email) {
  try {
    const users = await this.find({ email });
    return !!users.length;
  } catch (err) {
    console.log('checkExistUser err:', err);
    throw err;
  }
};

userSchema.statics.updateCash = function (id, cash) {
  return this.findByIdAndUpdate(id, {
    $inc: { cash },
  }, { new: true }).select('username _id email cash');
};

module.exports = mongoose.model('user', userSchema);
