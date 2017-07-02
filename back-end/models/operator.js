const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Operator = new Schema({
  email: String,
  password: String,
  token: String,
  name: String,
  isActive: Boolean,
  avatarUrl: String,
  customerId: Schema.Types.ObjectId
});

module.exports = mongoose.model('operator', Operator);
