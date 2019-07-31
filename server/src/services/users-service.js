const { addUser, getUsers, getUserById, checkExistUser } = require('../db/user-db');

const addUserService = async (user) => {
  try {
    // Check User exist
    const existUser = await checkExistUser(user.email);
    if (existUser) {
      return null;
    }
    // Add User to db
    const rs = await addUser(user);
    return rs;
  } catch (err) {
    console.log(err)
    throw err
  }
}

const getUsersService = async () => {
  try {
    const rs = await getUsers();
    return rs;
  } catch (err) {
    console.log(err)
    throw err
  }
}

const getUserByIdService = async (id) => {
  try {
    const rs = await getUserById(id);
    return rs;
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  addUserService,
  getUsersService,
  getUserByIdService
}