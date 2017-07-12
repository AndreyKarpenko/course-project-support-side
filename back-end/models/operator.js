const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Operator = new Schema({
  avatarUrl: {
    type: String,
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
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
  role: {
    type: String,
    required: true,
    default: 'operator'
  },
  token: {
    type: String,
    unique: true,
    sparse: true
  }
});

module.exports = mongoose.model('operator', Operator);
