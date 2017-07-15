const ObjectId = require('mongoose').Types.ObjectId;

const Dialog = require('./models/dialog');
const Message = require('./models/message');
const User = require('./models/user');

function initialize() {
  flushCollections(() => {
    fillUsersCollection(() => {
      fillMessagesCollection(() => {
        fillDialogCollection(() => {
          console.log('Database: dummy data is generated');
        });
      });
    });
  });
}

function flushCollections(callback) {
  Dialog.deleteMany({}, (err) => {
    if (err) {
      errorHandler(err);
      return;
    }

    Message.deleteMany({}, (err) => {
      if (err) {
        errorHandler(err);
        return;
      }

      User.deleteMany({}, (err) => {
        if (err) {
          errorHandler(err);
          return;
        }
        callback();
      });
    });
  });
}

function fillDialogCollection(callback) {
  User.find({role: 'operator'}, (err, operators) => {
    if (err) {
      errorHandler(err);
      return;
    }

    Dialog.create([{
      clientEmail: 'client-1@gmail.com',
      clientLocation: {
        lat: 123456,
        lon: 654321
      },
      clientName: 'Client 1',
      endTime: Date.now() - 99000000000,
      messages: [
        ObjectId('120140fa2b23030e98ab92c5'),
        ObjectId('120240fa2b23030e98ab92c5'),
        ObjectId('120340fa2b23030e98ab92c5'),
        ObjectId('120440fa2b23030e98ab92c5'),
        ObjectId('120540fa2b23030e98ab92c5'),
      ],
      operatorId: operators[0]._id,
      startTime: Date.now() - 100000000000
    },
    {
      clientEmail: 'client-2@gmail.com',
      clientLocation: {
        lat: 123456,
        lon: 654321
      },
      clientName: 'Client 2',
      endTime: Date.now() - 99000000000,
      messages: [
        ObjectId('120640fa2b23030e98ab92c5'),
        ObjectId('120740fa2b23030e98ab92c5'),
        ObjectId('120840fa2b23030e98ab92c5'),
        ObjectId('120940fa2b23030e98ab92c5'),
        ObjectId('121040fa2b23030e98ab92c5'),
      ],
      operatorId: operators[0]._id,
      startTime: Date.now() - 100000000000
    },
    {
      clientEmail: 'client-1@gmail.com',
      clientLocation: {
        lat: 123456,
        lon: 654321
      },
      clientName: 'Client 1',
      endTime: Date.now() - 99000000000,
      messages: [
        ObjectId('121140fa2b23030e98ab92c5'),
        ObjectId('121240fa2b23030e98ab92c5'),
        ObjectId('121340fa2b23030e98ab92c5'),
        ObjectId('121440fa2b23030e98ab92c5'),
        ObjectId('121540fa2b23030e98ab92c5'),
      ],
      operatorId: operators[1]._id,
      startTime: Date.now() - 100000000000
    },
    {
      clientEmail: 'client-2@gmail.com',
      clientLocation: {
        lat: 123456,
        lon: 654321
      },
      clientName: 'Client 2',
      endTime: Date.now() - 99000000000,
      messages: [
        ObjectId('121640fa2b23030e98ab92c5'),
        ObjectId('121740fa2b23030e98ab92c5'),
        ObjectId('121840fa2b23030e98ab92c5'),
        ObjectId('121940fa2b23030e98ab92c5'),
        ObjectId('122040fa2b23030e98ab92c5'),
      ],
      operatorId: operators[1]._id,
      startTime: Date.now() - 100000000000
    }], (err , dialogs) => {
      if (err) {
        errorHandler(err);
        return;
      }

      const operator1Dialogs = [];

      dialogs.forEach((dialog) => {
        if (dialog.operatorId.equals(operators[0]._id)) {
          operator1Dialogs.push(dialog._id);
        }
      });

      User.findByIdAndUpdate(operators[0]._id, {dialogs: operator1Dialogs}, (err) => {
        if (err) {
          errorHandler(err);
          return;
        }

        const operator2Dialogs = [];

        dialogs.forEach((dialog) => {
          if (dialog.operatorId.equals(operators[1]._id)) {
            operator2Dialogs.push(dialog._id);
          }
        });

        User.findByIdAndUpdate(operators[1]._id, {dialogs: operator2Dialogs}, (err) => {
          if (err) {
            errorHandler(err);
            return;
          }
          callback();
        });
      });
    });
  });
}

function fillMessagesCollection(callback) {
  Message.create([
    {
      _id: ObjectId('120140fa2b23030e98ab92c5'),
      date: Date.now() - 100000000000,
      role: 'operator',
      text: 'Welcome',
    },
    {
      _id: ObjectId('120240fa2b23030e98ab92c5'),
      date: Date.now() - 99999990000,
      role: 'client',
      text: 'Hi',
    },
    {
      _id: ObjectId('120340fa2b23030e98ab92c5'),
      date: Date.now() - 99999900000,
      role: 'operator',
      text: 'Ask me anything',
    },
    {
      _id: ObjectId('120440fa2b23030e98ab92c5'),
      date: Date.now() - 99990000000,
      role: 'client',
      text: 'No, thanks',
    },
    {
      _id: ObjectId('120540fa2b23030e98ab92c5'),
      date: Date.now() - 99000000000,
      role: 'operator',
      text: 'Good bye',
    },
    {
      _id: ObjectId('120640fa2b23030e98ab92c5'),
      date: Date.now() - 100000000000,
      role: 'operator',
      text: 'Welcome',
    },
    {
      _id: ObjectId('120740fa2b23030e98ab92c5'),
      date: Date.now() - 99999990000,
      role: 'client',
      text: 'Hi',
    },
    {
      _id: ObjectId('120840fa2b23030e98ab92c5'),
      date: Date.now() - 99999900000,
      role: 'operator',
      text: 'Ask me anything',
    },
    {
      _id: ObjectId('120940fa2b23030e98ab92c5'),
      date: Date.now() - 99990000000,
      role: 'client',
      text: 'No, thanks',
    },
    {
      _id: ObjectId('121040fa2b23030e98ab92c5'),
      date: Date.now() - 99000000000,
      role: 'operator',
      text: 'Good bye',
    },
    {
      _id: ObjectId('121140fa2b23030e98ab92c5'),
      date: Date.now() - 100000000000,
      role: 'operator',
      text: 'Welcome',
    },
    {
      _id: ObjectId('121240fa2b23030e98ab92c5'),
      date: Date.now() - 99999990000,
      role: 'client',
      text: 'Hi',
    },
    {
      _id: ObjectId('121340fa2b23030e98ab92c5'),
      date: Date.now() - 99999900000,
      role: 'operator',
      text: 'Ask me anything',
    },
    {
      _id: ObjectId('121440fa2b23030e98ab92c5'),
      date: Date.now() - 99990000000,
      role: 'client',
      text: 'No, thanks',
    },
    {
      _id: ObjectId('121540fa2b23030e98ab92c5'),
      date: Date.now() - 99000000000,
      role: 'operator',
      text: 'Good bye',
    },
    {
      _id: ObjectId('121640fa2b23030e98ab92c5'),
      date: Date.now() - 100000000000,
      role: 'operator',
      text: 'Welcome',
    },
    {
      _id: ObjectId('121740fa2b23030e98ab92c5'),
      date: Date.now() - 99999990000,
      role: 'client',
      text: 'Hi',
    },
    {
      _id: ObjectId('121840fa2b23030e98ab92c5'),
      date: Date.now() - 99999900000,
      role: 'operator',
      text: 'Ask me anything',
    },
    {
      _id: ObjectId('121940fa2b23030e98ab92c5'),
      date: Date.now() - 99990000000,
      role: 'client',
      text: 'No, thanks',
    },
    {
      _id: ObjectId('122040fa2b23030e98ab92c5'),
      date: Date.now() - 99000000000,
      role: 'operator',
      text: 'Good bye',
    }
  ] , (err) => {
    if (err) {
      errorHandler(err);
      return;
    }
    callback();
  });
}

function fillUsersCollection(callback) {
  User.create({
    email: 'customer-1@gmail.com',
    isActive: false,
    name: 'Customer1',
    password: 'pass11',
    paymentExpiresAt: Date.now(),
    role: 'customer'
  }, (err, customer) => {
    if (err) {
      errorHandler(err);
      return;
    }

    User.create([{
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1342004?v=3&s=200',
      customerId: customer._id,
      email: 'operator-1@gmail.com',
      name: 'Operator 1',
      password: 'pass11',
      role: 'operator'
    }, {
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1342004?v=3&s=200',
      customerId: customer._id,
      email: 'operator-2@gmail.com',
      name: 'Operator 2',
      password: 'pass11',
      role: 'operator'
    }], (err) => {
      if (err) {
        errorHandler(err);
        return;
      }
      callback();
    });
  });
}

function errorHandler(err) {
  console.error(err);
}

module.exports = initialize;
