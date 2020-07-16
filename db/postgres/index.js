const Pool = require('pg').Pool
const connection = new Pool({
  user: '',
  host: 'localhost',
  database: 'suggesteditems',
  password: '',
  port: 5432,
})

module.exports = connection;