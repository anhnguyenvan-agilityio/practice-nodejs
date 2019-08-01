const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    foodId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "order"
  }
);

const Order = mongoose.model("order", OrderModel);

module.exports = Order;
