const mongoose = require('mongoose');

let db = null;

mongoose.Promise = global.Promise;

// FIX ME
// Change to config
const configDb = {
  connectionString: 'mongodb+srv://anhnguyen:rhk99PPFqemtBfOu@cluster0-zlqsi.mongodb.net/order',
};

module.exports = () => {
  if (!db) {
    db = mongoose
      .connect(configDb.connectionString, configDb.dbOptions)
      .then(
        () => console.log('CONNECT DB SUCCESSFULLY'),
        error => console.log(`CONNECT DB FAIL, ERROR: ${error}`),
      );
  }
};
