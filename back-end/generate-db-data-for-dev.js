const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');

function initialize() {
  flushCollections(() => {
    fillCustomerCollection(() => {
      fillOperatorCollection(() => {
        fillDialogCollection(() => {
          console.log('Database: dummy data generated');
        });
      });
    });
  });
}

function flushCollections(callback) {
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

function fillCustomerCollection(callback) {
  Customer.create({
    email: 'customer1-mail@gmail.com',
    password: 'pass',
    name: 'Customer1',
  } , (err, result) => {
    if (err) errorHandler(err);
    callback();
  });
}

function fillDialogCollection(callback) {
  Operator.find({}, (err, docs) => {
    Dialog.create([{
      clientEmail: 'client1-mail@gmail.com',
      clientName: 'Client1',
      clientLocation: {
        lat: 202020,
        lon: 303030
      },
      operatorEmail: docs[0].email,
      operatorId: docs[0]._id,
      operatorName: docs[0].name,
      startTime: Date.now() - 11111,
      endTime: Date.now() - 10000,
      messages: [
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 11000,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 1100,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Good bye'
        }
      ]
    },
    {
      clientEmail: 'client2-mail@gmail.com',
      clientName: 'Client2',
      clientLocation: {
        lat: 202020,
        lon: 303030
      },
      operatorEmail: docs[0].email,
      operatorId: docs[0]._id,
      operatorName: docs[0].name,
      startTime: Date.now() - 11111,
      endTime: Date.now() - 10000,
      messages: [
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 11000,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 1100,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Good bye'
        }
      ]
    },
    {
      clientEmail: 'client1-mail@gmail.com',
      clientName: 'Client1',
      clientLocation: {
        lat: 202020,
        lon: 303030
      },
      operatorEmail: docs[1].email,
      operatorId: docs[1]._id,
      operatorName: docs[1].name,
      startTime: Date.now() - 11111,
      endTime: Date.now() - 10000,
      messages: [
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 11000,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 1100,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Good bye'
        }
      ]
    },
    {
      clientEmail: 'client2-mail@gmail.com',
      clientName: 'Client2',
      clientLocation: {
        lat: 202020,
        lon: 303030
      },
      operatorEmail: docs[1].email,
      operatorId: docs[1]._id,
      operatorName: docs[1].name,
      startTime: Date.now() - 11111,
      endTime: Date.now() - 10000,
      messages: [
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 11000,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Hello'
        },
        {
          date: Date.now() - 1100,
          role: 'client',
          text: 'Hi'
        },
        {
          date: Date.now() - 11000,
          role: 'operator',
          text: 'Good bye'
        }
      ]
    }], (err, result) => {
      if (err) errorHandler(err);
      callback();
    });
  });
}

function fillOperatorCollection(callback) {
  Customer.findOne({email: 'customer1-mail@gmail.com'}, (err, doc) => {
    Operator.create([{
      email: 'operator1-mail@gmail.com',
      password: 'pass',
      name: 'Operator1',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1342004?v=3&s=200',
      customerId: doc._id
    },
      {
        email: 'operator2-mail@gmail.com',
        password: 'pass',
        name: 'Operator2',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/1342004?v=3&s=200',
        customerId: doc._id
      }], (err, result) => {
      if (err) errorHandler(err);
      callback();
    });
  });
}

function errorHandler(err) {
  console.error(err);
}

module.exports = initialize;
