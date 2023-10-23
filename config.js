require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

const config = {
  port: PORT || 3002,
  mongodbURI: MONGODB_URI || 'mongodb://localhost:27017/bitfilmsdb',
};

module.exports = config;
