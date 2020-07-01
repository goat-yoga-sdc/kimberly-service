const db = require('./index.js');

const dbHelpers = {
getAll: (callback) => {
  db.query('SELECT * FROM MainSuggest', (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
},
getShades: (callback) => {
  db.query('SELECT * FROM Shades', (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
},
getQuickview: (callback) => {
  db.query('SELECT * FROM Quickview', (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
}

};


module.exports = dbHelpers;
