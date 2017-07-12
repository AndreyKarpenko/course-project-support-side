const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');

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

  app.post('/api/register', (req, res) => {
    if(!req.body.email){
      res.json({success: false, message:'Provide e-mail'});
    }else{
        if(!req.body.name){
            res.json({success: false, message: 'Provide username'});
        }else {
            if(!req.body.password){
                res.json({success: false, message: 'Provide password'});
            }else{
                let customer = new Customer({
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                    name: req.body.name.toLowerCase()
                });
                customer.create((err) => {
                    if(err){
                        if(err.code === 11000){
                            res.json({success: false, message: 'User or email already exist ' + err});
                        }else {
                            if(err.errors){
                                if(err.errors.email){
                                    res.json({success: false, message: err.errors.email.message})
                                }
                            }else{
                                res.json({success: false, message: 'Could not save. Error: ', err
                                });
                            }
                        }
                    }else {
                        res.json({success: true, message: 'User save'});
                    }
                })
            }
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
