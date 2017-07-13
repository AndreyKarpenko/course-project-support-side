const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dialog = new Schema({
  clientEmail: {
    type: String,
    required: true,
    match: /^(\w|-)+@\w+\.[a-zA-Z]+$/i,
    minlength: 5,
    maxlength: 35
  },
  clientLocation: {
    lat: Number,
    lon: Number
  },
  clientName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 35,
  },
  endTime: {
    type: Number,
    required: true
  },
  messages: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('dialog', Dialog);
