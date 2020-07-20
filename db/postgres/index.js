const Pool = require('pg').Pool
const connection = new Pool({
  user: 'kceddinger',
  host: 'localhost',
  database: 'suggesteditems',
  password: '',
  port: 5432,
})

module.exports = connection;