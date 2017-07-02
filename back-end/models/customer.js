const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  email: String,
  password: String,
  token: String,
  name: String,
  isActive: Boolean,
  payments: {
    endDate: Number
  }
});

module.exports = mongoose.model('customer', Customer);
