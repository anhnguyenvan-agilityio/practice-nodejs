const {
  addUserService
} = require('../services/users-service');

const addUserController = async (req, res) => {
  try {
    const user = await addUserService({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      cash: req.body.cash
    })
    return res.json({
      user
    })
  } catch (err) {
    console.log('err controller' + err);
    res.status(500).json({
      msg: err
    })
  }
}

module.exports = {
  addUserController
}