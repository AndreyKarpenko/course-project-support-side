const mongoose = require('mongoose');

mongoose.connect('mongodb://supportchatserver:Hd46Sjeq739f9910zP@ds143532.mlab.com:43532/supportchat');

module.exports = mongoose.connection;
