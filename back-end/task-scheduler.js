const Schedule = require('node-cron').schedule;
const User = require('./models/user');

function initialize() {
  // Check customers for payment expiration date every day at 23:55
  // If expired - set isActive: false

  new Schedule('00 55 23 * * *', () => {
    User.find({
      isActive: true,
      role: 'customer'
    }, {
      isActive: 1,
      paymentExpiresAt: 1
    }, (err, activeCustomers) => {
      if (err) {
        handleError(err);
        return;
      }
      if (!activeCustomers.length) return;

      const expiredCustomers = [];

      activeCustomers.forEach((customer) => {
        if (Date.now() > customer.paymentExpiresAt) {
          expiredCustomers.push(customer);
        }
      });

      User.updateMany(expiredCustomers, {isActive: false}, (err) => {
        if (err) handleError(err);
      });
    });
  }, true);
}

function handleError(err) {
  console.error('Task scheduler error:\n', err);
}

module.exports = initialize;