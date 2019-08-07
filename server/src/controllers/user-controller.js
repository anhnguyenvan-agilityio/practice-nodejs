const APIError = require('../utils/api-error');
const httpStatus = require('http-status');
const Joi = require('joi');
const {
  addUserService,
  getUsersService,
  getUserByIdService,
  chargeUserService,
} = require('../services/users-service');

const addUserController = async (req, res, next) => {
  try {
    const {
      email, username, password, cash,
    } = req.body;
    // Validate input
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      cash: Joi.number().required(),
    });
    const rsValid = schema.validate({
      email,
      username,
      password,
      cash,
    });
    if (rsValid.error === null) {
      const user = await addUserService({
        email,
        username,
        password,
        cash,
      });
      return res.json({
        user,
      });
    }
    next(new APIError({
      message: 'error roi ban eiii',
      status: httpStatus.NO_CONTENT
    }));
  } catch (err) {
    next(err);
  }
};

const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsersService();
    return res.json({
      users,
    });
  } catch (err) {
    next(err);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res.json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

const chargeUserController = async (req, res) => {
  try {
    const { id, cash } = req.body;
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      cash: Joi.number()
        .greater(0)
        .required(),
    });
    const rsValid = schema.validate({
      id,
      cash,
    });
    if (rsValid.error === null) {
      const user = await chargeUserService(id, cash);
      return res.json({
        user,
      });
    }
    return res.status(500).json({
      msg: rsValid.error.details,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports = {
  addUserController,
  getUsersController,
  getUserByIdController,
  chargeUserController,
};
