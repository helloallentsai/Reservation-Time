const mongoose = require('mongoose');
const mongoUri = 'mongodb://127.0.0.1/overview';

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = db;
