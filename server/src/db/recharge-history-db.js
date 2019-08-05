const RechargeHistoryModel = require('../models/recharge-history-model');

const addRechargeHistory = (rechargeHistory) => {
  const { userId, username, cash } = rechargeHistory;
  const newRechargeHistory = new RechargeHistoryModel({
    userId,
    username,
    cash,
  });
  return newRechargeHistory.save();
};

module.exports = {
  addRechargeHistory,
};
