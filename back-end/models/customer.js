const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(\w|-)+@\w+\.[a-zA-Z]+$/i,
    minlength: 5,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
  },
  token: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  payments: {
    endDate: Number
  }
});

module.exports = mongoose.model('customer', Customer);
