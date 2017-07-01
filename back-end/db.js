var mongoose = require('mongoose');

mongoose.connect('mongodb://npmlover:dertanz85@ds127730.mlab.com:27730/myfirstdb_alfa');

module.exports = mongoose.connection;