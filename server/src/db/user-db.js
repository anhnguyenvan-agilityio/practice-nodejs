const UserModel = require('../models/user-model');

const checkExistUser = async (email) => {
  try {
    const users = await UserModel.find({ email });
    return !!users.length;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateCash = (id, cash) => UserModel.findByIdAndUpdate(id, {
  $inc: { cash },
}, { new: true }).select('username _id email cash');

module.exports = {
  checkExistUser,
  updateCash,
};
