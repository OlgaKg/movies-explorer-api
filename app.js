const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(cors({
  origin: ['http://localhost:4000'],
  credentials: true,
  maxAge: 30,
}));

app.use(rateLimiter);

app.use(routes);

app.use(errorLogger);
routes.use(errors());
app.use(errorHandler);

mongoose.connect(config.mongodbURI, {
  useNewUrlParser: true,
});

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
