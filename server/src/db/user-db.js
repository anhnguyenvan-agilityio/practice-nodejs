const UserModel = require('../models/user-model');

const addUser = async (user) => {
  const { email, username, password, cash } = user;
  try {
    const user = new UserModel({
      email,
      username,
      password,
      cash
    });
    const rs = await user.save();
    return rs;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

const getUsers = async () => {
  try {
    const rs = await UserModel.find();
    return rs;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

const checkExistUser = async (email) => {
  try {
    const users = await UserModel.find({ email });
    return !!users.length;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

const getUserById = async (id) => {
  try {
    const rs = await UserModel.findById(id);
    return rs;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = {
  addUser,
  getUsers,
  getUserById,
  checkExistUser
}