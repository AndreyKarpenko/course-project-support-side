const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dialog = new Schema({
  // clientId: Schema.Types.ObjectId,
  clientEmail: String,
  clientName: String,
  clientLocation: {
    lat: Number,
    lon: Number
  },
  operatorId: Schema.Types.ObjectId,
  operatorName: String,
  startTime: Number,
  endTime: Number,
  messages: [{
    date: Number,
    role: String,
    text: String
  }]
});

module.exports = mongoose.model('dialog', Dialog);
