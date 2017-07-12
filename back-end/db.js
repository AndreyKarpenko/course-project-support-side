const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://supportchatserver:Hd46Sjeq739f9910zP@ds143532.mlab.com:43532/supportchat';
//const dbUrl = 'mongodb://localhost:27017/mean-angular-2';
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', () => {
  console.error('Database: there is problem with connection');
});

db.once('open', function() {
  console.log('Database: connection established');

  // insert dummy data into DB, if app is running in dev mode

  if (process.env.NODE_ENV == 'development') {
    require('./generate-db-data-for-dev')(db);
  }
});

module.exports = db;
