const RechargeHistoryModel = require('../models/recharge-history-model');

const addRechargeHistory = async (rechargeHistory) => {
  const { userId, username, cash } = rechargeHistory;
  try {
    const rechargeHistory = new RechargeHistoryModel({
      userId,
      username,
      cash
    });
    const rs = await rechargeHistory.save();
    return rs;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports = {
  addRechargeHistory
}