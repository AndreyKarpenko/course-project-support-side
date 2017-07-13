const sha1 = require('sha1');

const Dialog = require('./models/dialog');
const Message = require('./models/message');
const User = require('./models/user');


function initialize(app) {
  app.get('/api/dialogs', (req, res, next) => {
    checkAuth(req, res)
      .then((customerId) => {
        if (!customerId) return;

        getOperatorIds(customerId)
          .then((operatorIds) => {
            if (!operatorIds) {
              res.status(404).send('Not found');
              return;
            }

            return getDialogIds(operatorIds);
          })
          .then((dialogs) => {
            if (!dialogs) {
              res.status(404).send('Not found');
              return;
            }

            res.status(200).send(dialogs);
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
    if (isObjectIdValid(req.params.id)) {
      checkAuth(req, res)
        .then((customerId) => {
          if (!customerId) return;

          Dialog.findById(req.params.id).lean().exec((err, dialog) => {
            if (err) next(err);
            if (!dialog) {
              res.status(404).send('Not found');
              return;
            }

            if (dialog.messages) {
              getMessages(dialog.messages)
                .then((messages) => {
                  dialog.messages = messages;
                  res.status(200).send(dialog);
                })
                .catch((err) => {
                  next(err);
                });
            } else {
              res.status(200).send(dialog);
            }
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

        getOperatorIds(customerId)
          .then((operators) => {
            if (!operators) {
              res.status(404).send('Not found');
              return;
            }

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

  app.get('/api/operator/:id', (req, res, next) => {
    if (isObjectIdValid(req.params.id)) {
      checkAuth(req, res)
        .then((customerId) => {
          if (!customerId) return;

          User.findById(req.params.id).lean().exec((err, operator) => {
            if (err) {
              next(err);
              return;
            }
            if (!operator) {
              res.status(404).send('Not found');
              return;
            }

            if (operator.dialogs) {
              Dialog.find({_id: {$in: operator.dialogs}}, (err, dialogs) => {
                operator.dialogs = dialogs;
                res.status(200).send(operator);
              });
            } else {
              res.status(200).send(operator);
            }
          });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(400).send('Bad request');
    }
  });
  
  app.get('/api/user', (req, res, next) => {
    checkAuth(req, res)
      .then((userId) => {
        if (!userId) return;

        User.findById(userId, (err, user) => {
          if (err) {
            next(err);
            return;
          }

          res.status(200).send(user);
        });
      })
      .catch((err) => {
        next(err);
      })
  });
  
  app.post('/api/signup', (req, res, next) => {
    if (req.body) {
      if (!req.body.email || !req.body.name || !req.body.password) {
        res.status(400).send('Bad request');
      } else {
        const newCustomer = new User({
          role: 'customer',
          email: req.body.email.toLowerCase(),
          password: req.body.password,
          name: req.body.name,
          isActive: false,
          paymentExpiresAt: Date.now(),
          token: sha1(this.email + 'ApriorIT' + new Date())
        });
        User.create(newCustomer, (err, customer) => {
          if (err) {
            if (err.code === 11000) {
              res.status(400).json('Email is already exist');
              return;
            } else if (err.errors.email || err.errors.name || err.errors.password) {
              res.status(400).send('Invalid field');
              return;
            } else {
              next(err);
              return;
            }
          }

          res.cookie('authToken', customer.token, { maxAge: 9000000000, httpOnly: true });
          res.status(200).send(customer);
        })
      }
    } else {
      res.status(400).send('Bad request');
    }
  });

}

function checkAuth(req, res) {
  /*const token = req.cookies.token;

  return new Promise((resolve, reject) => {
    if (token) {
      User.findOne({token: token}, {_id: 1}, (err, customer) => {
        if (err) {
          reject(err);
          return;
        }
        if (!customer) {
          res.status(401).send('Unauthorized');
          resolve(null);
          return;
        }

        resolve(customer);
      });
    } else {
      res.status(401).send('Unauthorized');
      resolve(null);
    }
  });*/

  // TODO: implement real auth

  return new Promise((resolve, reject) => {
    User.findOne({role: 'customer'}, {_id: 1}, (err, customer) => {
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

function getDialogIds(operatorIds) {
  return new Promise((resolve, reject) => {
    Dialog.find({
      operatorId: { $in: operatorIds }
    }, (err, dialogs) => {
      if (err) {
        reject(err);
        return;
      }
      if (!dialogs.length) {
        resolve(null);
        return;
      }

      resolve(dialogs);
    });
  });
}

function getMessages(messageIds) {
  return new Promise((resolve, reject) => {
    Message.find({_id: { $in: messageIds}}, (err, messages) => {
      if (err) {
        reject(null);
        return;
      }
      if (!messages.length) {
        res.status(401).send('Unauthorized');
        resolve(null);
        return;
      }

      resolve(messages);
    });
  });
}

function getOperatorIds(customerId) {
  return new Promise((resolve, reject) => {
    User.find({customerId: customerId}, (err, operators) => {
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

function isObjectIdValid(objectId) {
  return objectId.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = initialize;
