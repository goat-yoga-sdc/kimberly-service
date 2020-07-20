const db = require('./index.js');

const getRandomId = (firstId, lastId, amount, direction) => {
  let amountToInt = parseInt(amount)
  if (direction === 'ascend') {
    let max = lastId - amountToInt;
    return Math.floor(Math.random() * (max - firstId)) + firstId;
  } else if (direction === 'descend') {
    let min = firstId + amountToInt;
    return Math.floor(Math.random() * (lastId - min)) + min;
  } else {
    console.log('error in getRandomID');
  }
}

const dbHelpers = {
  getAll: (callback) => {
    let startIndex = getRandomId(9000000, 10000000, 4, 'descend');
    db.query(`select * from mainsuggest where id <= ${startIndex} order by id desc limit 4;`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getShades: (pullAmount, callback) => {
    let startIndex = getRandomId(1800000, 2000000, pullAmount, 'descend');
    db.query(`select * from shades where id <= ${startIndex} order by id desc limit ${pullAmount};`, (err, res) => {
      err ? callback(err, null) : callback(null, res);
    })
  },
  getQuickview: (callback) => {
    let startIndex = getRandomId(3600000, 4000000, 5, 'ascend');
    db.query(`select * from quickview where id >= ${startIndex} order by id limit 5;`, (err, res) => {
      err ? callback(err, null) : callback(null, res);

    })
  }
}

module.exports = dbHelpers;