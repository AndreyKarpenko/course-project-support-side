const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
  clientEmail: String,
  clientName: String,
  clientLocation: {
    lat: Number,
    lon: Number
  }
});

module.exports = mongoose.model('client', Client);
