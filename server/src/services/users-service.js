const { addUser, getUsers, getUserById, checkExistUser, updateCash } = require('../db/user-db');
const { addRechargeHistory } = require('../db/recharge-history-db');

const chargeUserService = async (userId, cash) => {
  try {
    // Get info user by id
    const user = await getUserByIdService(userId);
    if (user) {
      const username = user.username || '';
      // Update cash for user
      const updateCash = await updateCash(userId, cash);
      if (updateCash) {
        // Insert history recharge user
        await addRechargeHistory({
          userId,
          username,
          cash
        });
        return {
          user: updateCash
        }
      }
      return null;
    }
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

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
  getUserByIdService,
  chargeUserService
}