const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');

function initialize(app) {
  app.get('/api/dialogs', (req, res, next) => {
    checkAuth(req, next).then((customerId) => {
      if (!customerId) res.status(401).send('Unauthorized');

      getOperatorsAndDialogs(customerId, res, next)
        .then((result) => {
          if (!result || !result.dialogs) {
            res.status(404).send('Not found');
          }
          res.status(200).send(result.dialogs);
        });
    });
  });

  app.get('/api/dialog/:id', (req, res, next) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      checkAuth(req, next).then((customerId) => {
        if (!customerId) res.status(401).send('Unauthorized');

        Dialog.findById(req.params.id, (err, dialog) => {
          if (err) next(err);
          if (!dialog) {
            res.status(404).send('Not found');
            return;
          }

          res.status(200).send(dialog);
        });

      });
    } else {
      res.status(400).send('Bad request');
    }
  });

  app.get('/api/operators', (req, res, next) => {
    checkAuth(req, next).then((customerId) => {
      if (!customerId) res.status(401).send('Unauthorized');

      getOperatorsAndDialogs(customerId, res, next)
        .then((result) => {
          if (!result) return;
          if (!result.dialogs) {
            res.status(200).send(result.operators);
            return;
          }

          const dialogs = result.dialogs;
          const operators = result.operators;

          operators.forEach((operator) => {
            operator.dialogs = [];

            dialogs.forEach((dialog) => {
              if (dialog.operatorId.equals(operator._id)) {
                operator.dialogs.push(dialog);
              }
            });
          });

          res.status(200).send(operators);
        });
    });
  });

  // add another API methods here
}

function checkAuth(req, next) {
  /*const token = req.cookies.token;

  return new Promise((resolve, reject) => {
    if (token) {
      Customer.findOne({token: token}, {_id: 1}, (err, customer) => {
        if (err) next(err);
        resolve(customer._id);
      });
    } else {
      resolve(null);
    }
  });*/

  // TODO: implement real auth

  return new Promise((resolve) => {
    Customer.findOne({}, (err, docs) => {
      resolve(docs._id);
    });
  });
}

function getOperatorsAndDialogs(customerId, res, next) {
  return new Promise((resolve) => {
    Operator.find({customerId: customerId}).lean().exec((err, operators) => {
      if (err) next(err);
      if (!operators.length) {
        res.status(404).send('Not found');
        resolve(null);
        return;
      }

      const operatorIds = [];

      operators.forEach((operator) => {
        operatorIds.push(operator._id);
      });

      Dialog.find({
        operatorId: { $in: operatorIds }
      }).lean().exec((err, dialogs) => {
        if (err) next(err);
        if (!dialogs.length) {
          resolve({
            operators: operators
          });
          return;
        }

        resolve({
          dialogs: dialogs,
          operators: operators
        });
      });
    });
  });
}

module.exports = initialize;
