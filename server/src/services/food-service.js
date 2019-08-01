const { getFoods, getFoodById, addOrder } = require("../db/food-db");
const {
  getUserByIdService,
  chargeUserService
} = require("../services/users-service");

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
      // Get food from id
      const food = await getFoodByIdService(foodId);
      if (food) {
        // Check user have enough cash
        const userCash = user.cash;
        const cashPay = price * quantity;
        if (userCash >= cashPay) {
          // Pay for user
          await chargeUserService(userId, cashPay * -1);
          // Add order history
          return await addOrder(order);
        }
        throw { message: "Not enough money" };
      }
      throw { message: "Food not exist" };
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
