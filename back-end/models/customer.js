const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  payments: {
    endDate: Number
  },
  role: {
    type: String,
    required: true,
    default: 'customer'
  },
  token: {
    type: String,
    unique: true,
    sparse: true
  }
});

module.exports = mongoose.model('customer', Customer);
