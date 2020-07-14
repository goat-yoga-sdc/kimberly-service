const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'suggestedItems',
  password: 'password',
  port: 5432,
})
