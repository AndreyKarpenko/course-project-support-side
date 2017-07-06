const mongoose = require('mongoose');

const dbUrl = 'mongodb://supportchatserver:Hd46Sjeq739f9910zP@ds143532.mlab.com:43532/supportchat';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', () => {
  console.error('There is problem with DB connection');
});

db.once('open', function() {
  // insert dummy data into DB, if ENV=dev

  if (process.argv[2] === 'dev') {
    require('./generate-db-data-for-dev')(db);
  }
});

module.exports = db;
