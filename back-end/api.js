const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');
const sha1 = require('sha1');


function initialize(app) {
  app.get('/api/dialogs', (req, res, next) => {
    checkAuth(req, res)
      .then((customerId) => {
        if (!customerId) return;

        getOperators(customerId)
          .then((operators) => {
            if (!operators) {
              res.status(404).send('Not found');
              return;
            }
            const operatorIds = [];

            operators.forEach((operator) => {
              operatorIds.push(operator._id);
            });

            return getDialogs(operatorIds);
          })
          .then((result) => {
            if (!result) return;
            if (!result.dialogs) {
              res.status(404).send('Not found');
              return;
            }

            res.status(200).send(result.dialogs);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  });

  app.get('/api/dialog/:id', (req, res, next) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      checkAuth(req, res)
        .then((customerId) => {
          if (!customerId) return;

          Dialog.findById(req.params.id, (err, dialog) => {
            if (err) next(err);
            if (!dialog) {
              res.status(404).send('Not found');
              return;
            }

            res.status(200).send(dialog);
          });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(400).send('Bad request');
    }
  });

  app.get('/api/operators', (req, res, next) => {
    checkAuth(req, res)
      .then((customerId) => {
        if (!customerId) return;

        getOperators(customerId)
          .then((operators) => {
            if (!operators) {
              res.status(404).send('Not found');
              return;
            }
            const operatorIds = [];

            operators.forEach((operator) => {
              operatorIds.push(operator._id);
            });

            return getDialogs(operatorIds, operators);
          })
          .then((result) => {
            if (!result) return;

            const dialogs = result.dialogs;
            const operators = result.operators;

            if (!dialogs) {
              res.status(200).send(operators);
              return;
            }

            operators.forEach((operator) => {
              operator.dialogs = [];

              dialogs.forEach((dialog) => {
                if (dialog.operatorId.equals(operator._id)) {
                  operator.dialogs.push(dialog);
                }
              });
            });

            res.status(200).send(operators);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      })
  });

  app.post('/api/signup', (req, res, next) => {
    if (req.body) {
      if (!req.body.email || !req.body.name || !req.body.password) {
        res.status(400).send('Filed is empty');
      } else {
        let customer = new Customer({
          email: req.body.email.toLowerCase(),
          password: req.body.password,
          name: req.body.name.toLowerCase(),
          token: sha1(this.email + 'ApriorIT' + new Date())
        });
        Customer.create(customer, (err) => {
          if (err) {
            next(err);
            return;

            /*if (err.code === 11000) {
              res.status(500).json({status: false, message: 'Email is already exist'});
            } else {
              if (err.errors.email || err.errors.name || err.errors.password) {
                res.status(500).send('Invalid field');
              }
            }*/
          }

          res.cookie('authToken', customer.token, { maxAge: 9000000000, httpOnly: true });
          res.status(200).send(customer);
        })
      }
    }
  });

    // add another API methods here
}

function checkAuth(req, res) {
  /*const token = req.cookies.token;

  return new Promise((resolve, reject) => {
    if (token) {
      Customer.findOne({token: token}, {_id: 1}, (err, customer) => {
        if (err) {
          reject(err);
          return;
        }
        if (!customer) {
          res.status(401).send('Unauthorized');
          resolve(null);
          return;
        }

        resolve(customer._id);
      });
    } else {
      res.status(401).send('Unauthorized');
      resolve(null);
    }
  });*/

  // TODO: implement real auth

  return new Promise((resolve, reject) => {
    Customer.findOne({}, (err, customer) => {
      if (err) {
        reject(null);
        return;
      }
      if (!customer) {
        res.status(401).send('Unauthorized');
        resolve(null);
        return;
      }

      resolve(customer._id);
    });
  });
}

function getOperators(customerId) {
  return new Promise((resolve, reject) => {
    Operator.find({customerId: customerId}).lean().exec((err, operators) => {
      if (err) {
        reject(err);
        return;
      }
      if (!operators.length) {
        resolve(null);
        return;
      }

      resolve(operators);
    });
  });
}

function getDialogs(query, operators) {  // query: operatorId[] | operatorId
  return new Promise((resolve, reject) => {
    if (Array.isArray(query)) {
      Dialog.find({
        operatorId: { $in: query }
      }).lean().exec((err, dialogs) => {
        findResultsHandler(err, dialogs);
      });
    } else {
      Dialog.find({
        operatorId: query
      }).lean().exec((err, dialogs) => {
        findResultsHandler(err, dialogs);
      });
    }

    function findResultsHandler(err, dialogs) {
      if (err) {
        reject(err);
        return;
      }
      if (!dialogs.length) {
        resolve({
          dialogs: null,
          operators
        });
        return;
      }

      resolve({ dialogs, operators });
    }
  });
}

module.exports = initialize;
