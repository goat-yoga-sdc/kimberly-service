const db = require('./index.js');

const getRandomId = (min, lastId, amount) => {
  let max = lastId - amount;
  return Math.floor(Math.random() * (max - min)) + min;
}

const dbHelpers = {
  getAll: (callback) => {
    let startIndex = getRandomId(9000000, 10000000, 4);
    console.log(startIndex)
    db.query(`select * from mainsuggest where id >= ${startIndex} order by id limit 4;`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getShades: (pullAmount, callback) => {
    let startIndex = getRandomId(1800000, 2000000, pullAmount);
    db.query(`select * from shades where id >= ${startIndex} order by id limit ${pullAmount};`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getQuickview: (callback) => {
    let startIndex = getRandomId(3600000, 4000000, 5);
    db.query(`select * from quickview where id >= ${startIndex} order by id limit 5;`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  }
}

module.exports = dbHelpers;