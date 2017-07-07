const mongoose = require('mongoose');

const dbUrl = 'mongodb://supportchatserver:Hd46Sjeq739f9910zP@ds143532.mlab.com:43532/supportchat';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', () => {
  console.error('Database: there is problem with connection');
});

db.once('open', function() {
  console.log('Database: connection established');

  // insert dummy data into DB, if ENV=dev

  if (process.env.NODE_ENV == 'development') {
    require('./generate-db-data-for-dev')(db);
  }
});

module.exports = db;
