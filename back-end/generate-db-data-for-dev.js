const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');

function initialize(db) {
  flushCollections(Customer, Dialog, Operator, () => {
    fillCustomerCollection(Customer, () => {
      fillDialogCollection(Dialog, () => {
        fillOperatorCollection(Operator, () => {
          console.log('Database: dummy data generated');
        });
      });
    });
  });
}

function flushCollections(Customer, Dialog, Operator, callback) {
  Customer.deleteMany({}, (err) => {
    if (err) errorHandler(err);

    Dialog.deleteMany({}, (err) => {
      if (err) errorHandler(err);

      Operator.deleteMany({}, (err) => {
        if (err) errorHandler(err);
        callback();
      });
    });
  });
}

function fillCustomerCollection(Customer, callback) {
  Customer.create({
    _id: ObjectId('595e77b9e1f9381310b3e1b1'),
    email: 'customer-mail@gmail.com',
    password: 'pass',
    name: 'Customer1',
  } , (err, result) => {
    if (err) errorHandler(err);
    callback();
  });
}

function fillDialogCollection(Dialog, callback) {
  // if (err) errorHandler(err);
  callback();
}

function fillOperatorCollection(Operator, callback) {
  Operator.create([{
    _id: ObjectId('312e77b9e7bb381319b3e1b1'),
    email: 'operator-mail@gmail.com',
    password: 'pass',
    name: 'Operator1',
    avatarUrl: 'url',
    customerId: ObjectId('595e77b9e1f9381310b3e1b1'),
  },
  {
    _id: ObjectId('123c77b9e7bb381319b3e2c2'),
    email: 'operator2-mail@gmail.com',
    password: 'pass',
    name: 'Operator2',
    avatarUrl: 'url',
    customerId: ObjectId('595e77b9e1f9381310b3e1b1'),
  }], (err, result) => {
    if (err) errorHandler(err);
    console.log(result);
    callback();
  });
}

function errorHandler(err) {
  console.error(err);
}

module.exports = initialize;
