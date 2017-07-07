const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');

function initialize(app) {
  app.get('/api/dialogs', (req, res, next) => {
    Dialog.find({}, (err, dialogs) => {
      if (err) next(err);

      res.status(200).send({
        dialogs
      });
    });
  });

  app.get('/api/operators', (req, res, next) => {
    Dialog.find().lean().exec((err, dialogs) => {
      if (err) next(err);

      Operator.find().lean().exec((err, operators) => {
        if (err) next(err);

        operators.forEach((operator) => {
          operator.dialogs = [];

          dialogs.forEach((dialog) => {
            if (dialog.operatorId.equals(operator._id)) {
              operator.dialogs.push(dialog);
            }
          });
        });

        res.status(200).send({
          operators
        });
      });
    });
  });

  // add another API methods here
}

module.exports = initialize;
