const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Operator = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  avatarUrl: {
    type: String,
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('operator', Operator);
