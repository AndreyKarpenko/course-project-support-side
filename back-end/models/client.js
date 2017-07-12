const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: Number,
    lon: Number
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'client'
  }
});

module.exports = mongoose.model('client', Client);
