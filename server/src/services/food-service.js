const { getFoods, getFoodById, addOrder } = require("../db/food-db");
const { getUserByIdService } = require("../services/users-service");

const getFoodsService = async () => {
  try {
    const foods = await getFoods();
    return foods;
  } catch (err) {
    throw err;
  }
};

const getFoodByIdService = async id => {
  try {
    const food = await getFoodById(id);
    return food;
  } catch (err) {
    throw err;
  }
};

const addOrderService = async order => {
  try {
    const { userId, foodId, price, quantity } = order;
    // Get user from id to get cash
    const user = await getUserByIdService(userId);
    if (user) {
      const orderAdded = await addOrder(order);
      return orderAdded;
    }
    throw { message: "User not exist" };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getFoodsService,
  getFoodByIdService,
  addOrderService
};
