const UserModel = require('../models/user-model');

const addUser = (user) => {
  const { email, username, password, cash } = user;
  const newUser = new UserModel({
    email,
    username,
    password,
    cash
  });
  return newUser.save();
}

const getUsers = () => {
  return UserModel.find();
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

const getUserById = (id) => {
  return UserModel.findById(id)
}

const updateCash = (id, cash) => {
  return UserModel.findByIdAndUpdate(id, {
    $inc: { cash }
  });
};


module.exports = {
  addUser,
  getUsers,
  getUserById,
  checkExistUser,
  updateCash
}