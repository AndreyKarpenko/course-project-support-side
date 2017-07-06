function initialize(app, db) {
  app.get('/api/operators', (req, res, next) => {
    const operators = db.collection('operators');
    const dialogs = db.collection('dialogs');
  });

  // added another API methods here
}

module.exports = initialize;
