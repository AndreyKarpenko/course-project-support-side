const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Operator = new Schema({
  avatarUrl: {
    type: String,
    required: function() {
      return this.role === 'operator';
    }
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: function() {
      return this.role === 'operator';
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(\w|-)+@\w+\.[a-zA-Z]+$/i,
    minlength: 5,
    maxlength: 35
  },
  isActive: {
    type: Boolean,
    required: true,
    default: function() {
      return this.role === 'operator';
    }
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 35,

  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 35,
  },
  paymentExpiresAt: {
    type: Number,
    required: function() {
      return this.role === 'operator';
    }
  },
  role: {
    type: String,
    enum: ['customer', 'operator'],
    required: true
  },
  token: {
    type: String,
    unique: true,
    sparse: true
  }
});

module.exports = mongoose.model('operator', Operator);
