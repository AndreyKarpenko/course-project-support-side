const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Operator = new Schema({
  avatarUrl: {
    type: String,
    required: function() {
      return this.role === 'operator';
    },
    minlength: 1
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: function() {
      return this.role === 'operator';
    }
  },
  dialogs: [Schema.Types.ObjectId],
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
    default: true
  },
  name: {
    type: String,
    required: true,
    match: /^(\w|\s|-)+$/i,
    minlength: 2,
    maxlength: 35,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 35,
  },
  paymentExpiresAt: {
    type: Number,
    required: function() {
      return this.role === 'customer';
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
