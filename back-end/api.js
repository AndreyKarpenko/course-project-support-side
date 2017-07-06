function initialize(app, db) {
  app.get('/api/operators', (req, res, next) => {
    res.status(200).send('/api/operators');
  });

  // added another API methods here
}

module.exports = initialize;