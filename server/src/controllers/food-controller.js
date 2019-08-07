const Joi = require('joi');
const {
  getFoodsService,
  getFoodByIdService,
  addOrderService,
} = require('../services/food-service');

const getFoodsController = async (req, res) => {
  try {
    const foods = await getFoodsService();
    return res.json({
      foods,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const getFoodByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await getFoodByIdService(id);
    return res.json({
      food,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const addOrderController = async (req, res) => {
  try {
    const {
      userId, foodId, price, quantity,
    } = req.body;
    // Validate input
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      foodId: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    });
    const rsValid = schema.validate({
      userId,
      foodId,
      price,
      quantity,
    });
    if (rsValid.error === null) {
      const order = await addOrderService({
        userId,
        foodId,
        price,
        quantity,
      });
      return res.json({
        order,
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
  getFoodsController,
  getFoodByIdController,
  addOrderController,
};
