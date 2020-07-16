const Pool = require('pg').Pool
const connection = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'suggestedItems',
  password: 'password',
  port: 5432,
})

module.exports = connection;