const Joi = require('@hapi/joi');
const {
  addUserService,
  getUsersService,
  getUserByIdService
} = require('../services/users-service');

const addUserController = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      cash
    } = req.body;
    // Validate input
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      cash: Joi.number().required()
    });
    const rsValid = schema.validate({
      email,
      username,
      password,
      cash
    });
    if (rsValid.error === null) {
      const user = await addUserService({
        email,
        username,
        password,
        cash
      })
      if (user) {
        return res.json({
          user
        })
      }
      return res.status(500).json({
        msg: "User exist"
      })
    }
    res.status(500).json({
      msg: rsValid.error.details
    })

  } catch (err) {
    res.status(500).json({
      msg: err
    })
  }
}

const getUsersController = async (req, res) => {
  try {
    const users = await getUsersService();
    return res.json({
      users
    })
  } catch (err) {
    res.status(500).json({
      msg: err
    })
  }
}

const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params || '';
    const user = await getUserByIdService(id);
    return res.json({
      user
    });
  } catch (err) {
    res.status(500).json({
      msg: err
    })
  }
}

module.exports = {
  addUserController,
  getUsersController,
  getUserByIdController
}