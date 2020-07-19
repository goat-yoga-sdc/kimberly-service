const Pool = require('pg').Pool
const connection = new Pool({
  user: 'kceddinger',
  host: 'localhost',
  database: 'suggesteditems',
  password: '418twothousand13',
  port: 5432,
})

module.exports = connection;