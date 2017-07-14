const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
  date: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'operator'],
    required: true
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200
  }
});

module.exports = mongoose.model('message', Message);
