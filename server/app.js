const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./src/routes');

// Load environment
dotenv.config();

const connectDb = require('./src/db/connect');
connectDb();

// Register Node.js middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect all our routes to our application
app.use('/api', routes);

console.log('====>', process.env.TEST);

// Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server API started - Port ${PORT}`);
});
