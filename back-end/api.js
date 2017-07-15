const sha1 = require('sha1');
const ObjectId = require('mongoose').Types.ObjectId;
const Dialog = require('./models/dialog');
const Message = require('./models/message');
const User = require('./models/user');


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

            return getDialogs(operators);
          })
          .then((dialogs) => {
            if (!dialogs) {
              res.status(404).send('Not found');
              return;
            }

            const uniqueOperatorIdsObj = {};

            dialogs.forEach((dialog) => {
              uniqueOperatorIdsObj[dialog.operatorId] = dialog.operatorId;
            });

            const uniqueOperatorIds = Object.keys(uniqueOperatorIdsObj);

            User.find({_id: {$in: uniqueOperatorIds}}, (err, operators) => {
              if (err) {
                next(err);
                return;
              }

              dialogs.forEach((dialog) => {
                operators.forEach((operator) => {
                  if (dialog.operatorId.equals(operator._id)) {
                    dialog.operatorEmail = operator.email;
                    dialog.operatorName = operator.name;
                  }
                });
              });

              res.status(200).send(dialogs);
            });
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

            User.findById(dialog.operatorId, (err, operator) => {
              dialog.operatorEmail = operator.email;
              dialog.operatorName = operator.name;

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
    registration(req, res, next, false, 'customer');
  });

  app.post('/api/operator', (req, res, next) => {
    registration(req, res, next, true, 'operator');
  });
}

function registration(req, res, next, isActive, role) {
  if (req.body) {
    if (!req.body.email || !req.body.name || !req.body.password) {
      res.status(400).send('Empty Fields');
    } else {
      const newCustomer = new User({
        role: role,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        name: req.body.name,
        isActive: isActive,
        paymentExpiresAt: Date.now(),
        customerId: ObjectId(req.body.id),
        avatarUrl:"_",
        token: sha1(this.email + 'ApriorIT' + new Date())
      });
      User.create(newCustomer, (err, user) => {
        if (err) {
          if (err.code === 11000) {
            res.status(200).json({success: false, message: 'Email is already exist' });
            return;
          } else if (err.errors.email || err.errors.name || err.errors.password) {
            res.status(400).send('Invalid field');
            return;
          } else {
            next(err);
            return;
          }
        }
        res.status(200).json({success: true, message: 'Registration successfull', id: user._id});
      })
    }
  } else {
    res.status(400).send('Bad request');
  }
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

        resolve(customer._id);
      });
    } else {
      res.status(401).send('Unauthorized');
      resolve(null);
    }
  });*/

  // TODO: implement real auth

  return new Promise((resolve, reject) => {
    User.findOne({role: 'customer'}, {_id: 1}).lean().exec((err, customer) => {
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

function getDialogs(operators) {
  return new Promise((resolve, reject) => {
    Dialog.find({operatorId: { $in: operators }}).lean().exec((err, dialogs) => {
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
    Message.find({_id: { $in: messageIds }}).lean().exec((err, messages) => {
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

function getOperators(customerId) {
  return new Promise((resolve, reject) => {
    User.find({customerId: customerId}).lean().exec((err, operators) => {
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
