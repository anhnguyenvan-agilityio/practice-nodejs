const UserModel = require('../models/user-model');

const addUser = (user) => {
  const {
    email, username, password, cash,
  } = user;
  const newUser = new UserModel({
    email,
    username,
    password,
    cash,
  });
  return newUser.save();
};

const getUsers = () => UserModel.find().select('username _id email cash');

const checkExistUser = async (email) => {
  try {
    const users = await UserModel.find({ email });
    return !!users.length;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserById = id => UserModel.findById(id).select('username _id email cash');

const updateCash = (id, cash) => UserModel.findByIdAndUpdate(id, {
  $inc: { cash },
}, { new: true }).select('username _id email cash');


module.exports = {
  addUser,
  getUsers,
  getUserById,
  checkExistUser,
  updateCash,
};
