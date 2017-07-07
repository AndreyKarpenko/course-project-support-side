const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dialog = new Schema({
  /*clientId: {
    type: Schema.Types.ObjectId,
    required: true
  },*/
  clientEmail: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientLocation: {
    lat: Number,
    lon: Number
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  operatorName: {
    type: String,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  messages: [{
    date: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('dialog', Dialog);
