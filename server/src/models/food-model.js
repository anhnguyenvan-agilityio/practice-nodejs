const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FoodModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    collection: "food"
  }
);

const Food = mongoose.model("food", FoodModel);

module.exports = Food;
