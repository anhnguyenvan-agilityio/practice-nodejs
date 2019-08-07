const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const error = require('./src/utils/error');

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

// Mount Api router
const connectDb = require('./src/db/connect');
connectDb();

// Connect all our routes to our application
const routes = require('./src/routes');
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// WHY ????????
// catch 404 and forward to error handler
// app.use(error.notFound);

// WHY ????????
// error handler, send stacktrace only during development
// app.use(error.handler);

// Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server API started - Port ${PORT}`);
});
