const mongoose = require('mongoose');

const { Schema } = mongoose;

const RechargeHistoryModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    cash: {
      type: Number, required: true,
    },
    createdAt: {
      type: Date, default: Date.now,
    },
  },
  {
    collection: 'rechargeHistory',
  },
);

const RechargeHistory = mongoose.model('rechargeHistory', RechargeHistoryModel);

module.exports = RechargeHistory;
