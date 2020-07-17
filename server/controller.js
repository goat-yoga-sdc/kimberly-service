const dbHelpers = require('../db/mongo/model.js');

const controller = {
getAll: (req, res) => {

  dbHelpers.getAll((err, result) => {
    if (err) {
      res.status(400).send('Cannot Get All')
    } else {
      res.status(200).send(result)
    }
  })
},
getShades: (req, res) => {
  dbHelpers.getShades((err, result) => {
    if (err) {
      res.status(400).send('Cannot Get Shades')
    } else {
      res.status(200).send(result)
    }
  })
},
getQuickview: (req, res) => {
  dbHelpers.getQuickview((err, result) => {
    if (err) {
      res.status(400).send('Cannot Get Quickview Images')
    } else {
      res.status(200).send(result)
    }
  })
}
};

module.exports = controller;