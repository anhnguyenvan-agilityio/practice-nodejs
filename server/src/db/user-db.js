const UserModel = require('../models/user-model');

const addUserDB = async (user) => {
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
    console.log('err db' + err);
    throw err;
  }
}

module.exports = {
  addUserDB
}