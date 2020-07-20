const db = require('./index.js');

const getRandomId = (firstId, lastId, amount, direction) => {
  if (direction === 'ascend') {
    let max = lastId - amount;
    return Math.floor(Math.random() * (max - firstId)) + firstId;
  } else if (direction === 'descend') {
    let min = firstId + amount;
    return Math.floor(Math.random() * (lastId - min)) + min;
  } else {
    return 'error';
  }
}

const dbHelpers = {
  getAll: (callback) => {
    let startIndex = getRandomId(9000000, 10000000, 4, 'descend');
    db.query(`select * from mainsuggest where id >= ${startIndex} order by id limit 4;`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getShades: (pullAmount, callback) => {
    let startIndex = getRandomId(1800000, 2000000, pullAmount, 'ascend');
    db.query(`select * from shades where id >= ${startIndex} order by id limit ${pullAmount};`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getQuickview: (callback) => {
    let startIndex = getRandomId(3600000, 4000000, 5, 'descend');
    db.query(`select * from quickview where id >= ${startIndex} order by id limit 5;`, (err, res) => {
      err ? callback(err, null) : callback(null, res);

    })
  }
}

module.exports = dbHelpers;