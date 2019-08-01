const FoodModel = require("../models/food-model");
const OrderModel = require("../models/order-model");

const getFoods = () => {
  return FoodModel.find();
};

const getFoodById = id => {
  return FoodModel.findById(id);
};

const addOrder = order => {
  const { userId, foodId, price, quantity } = order;
  const newOrder = new OrderModel({
    userId,
    foodId,
    price,
    quantity
  });
  return newOrder.save();
};

module.exports = {
  getFoods,
  getFoodById,
  addOrder
};
