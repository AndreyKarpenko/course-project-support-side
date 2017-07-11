const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    lat: Number,
    lon: Number
  }
});

module.exports = mongoose.model('client', Client);
