const dbHelpers = require('../db/model.js');

const controller = {
get: (req, res) => {
  dbHelpers.get((err, result) => {
    if (err) {
      res.status(400).send('Cannot Get')
    } else {
      res.status(200).send(result)
    }
  })
}
};

module.exports = controller;