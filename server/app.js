const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

mongoose.Promise = global.Promise;

// Register Node.js middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect all our routes to our application
app.use('/api', routes)

// Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server API started - Port ${PORT}`);
});