const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Load environment
dotenv.config();

// Connect all our routes to our application
const routes = require('./src/routes');
app.use('/api', routes);

// Mount Api router
const connectDb = require('./src/db/connect');
connectDb();

// Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server API started - Port ${PORT}`);
});
