const db = require('./index.js');

const dbHelpers = {
  getAll: (callback) => {
    db.query('select * from mainsuggest where id > 9000000 order by id desc limit 100;', (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getShades: (callback) => {
    db.query('select * from shades where id > 1500000 order by id desc limit 100;', (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getQuickview: (callback) => {
    db.query('select * from quickview where id > 3000000 order by id desc limit 100;', (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  }
}

module.exports = dbHelpers;