const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
  clientEmail: {
    type: String,
    required: true,
    unique: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientLocation: {
    lat: Number,
    lon: Number
  }
});

module.exports = mongoose.model('client', Client);
