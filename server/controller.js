const dbHelpers = require('../db/postgres/model.js');

const controller = {
getAll: (req, res) => {

  dbHelpers.getAll((err, result) => {
    if (err) {
      console.log("error:", err)
      res.status(400).send('Cannot Get All')
    } else {
      res.status(200).send(result.rows)
    }
  })
},
getShades: (req, res) => {
  dbHelpers.getShades((err, result) => {
    if (err) {
      res.status(400).send('Cannot Get Shades')
    } else {
      res.status(200).send(result.rows)
    }
  })
},
getQuickview: (req, res) => {
  dbHelpers.getQuickview((err, result) => {
    if (err) {
      res.status(400).send('Cannot Get Quickview Images')
    } else {
      res.status(200).send(result.rows)
    }
  })
}
};

module.exports = controller;