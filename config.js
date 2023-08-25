require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

const config = {
  port: PORT || 4000,
  mongodbURI: MONGODB_URI || 'mongodb://localhost:27017/bitfilmsdb',
};

module.exports = config;
