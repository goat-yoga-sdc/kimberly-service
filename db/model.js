const db = require('./index.js');

const dbHelpers = {
get: (callback) => {
  db.query('SELECT * FROM MainSuggest', (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result)
    }
  })
}

};


module.exports = dbHelpers;
