const { addUserDB } = require('../db/user-db');

const addUserService = async (user) => {
  try {
    // Check User exist
    // Add User to db
    const rs = await addUserDB(user);
    return rs;
  } catch (err) {
    console.log('err service' + err);
    throw err
  }
}

module.exports = {
  addUserService
}