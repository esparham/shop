const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const HttpError = require('./utils/httpError');

const PORT = process.env.NODE_DOCKER_PORT || 4000;
const VERSION = 1;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(`/api/v${VERSION}/user`, userRoutes);
app.use(`/api/v${VERSION}/product`, productRoutes);

//hanlde Unsupported routes
app.use((req, res, next) => {
  return next(new HttpError('This route is not supported', 404));
});

//Error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});