const Customer = require('./models/customer');
const Dialog = require('./models/dialog');
const Operator = require('./models/operator');

function initialize(app) {
  app.get('/api/operators', (req, res, next) => {
    Dialog.find({}, (err, dialogs) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
      }

      Operator.find({}, (err, operators) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
        }

        res.status(200).send({
          dialogs,
          operators
        });
      });
    });
  });

  // added another API methods here
}

module.exports = initialize;
