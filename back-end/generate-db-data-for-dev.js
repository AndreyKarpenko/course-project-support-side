function initialize(db) {
  const customers = db.collection('dialogs');
  const dialogs = db.collection('dialogs');
  const operators = db.collection('operators');

  const Customer = require('./models/customer');
  const Dialog = require('./models/dialog');
  const Operator = require('./models/operator');
}

module.exports = initialize;
