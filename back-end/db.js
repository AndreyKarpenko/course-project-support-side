const mongoose = require('mongoose');

const dbUrl = 'mongodb://supportchatserver:Hd46Sjeq739f9910zP@ds143532.mlab.com:43532/supportchat';

mongoose.connect(dbUrl, (err) => {
  if (err) console.error(err);
});

module.exports = mongoose.connection;
