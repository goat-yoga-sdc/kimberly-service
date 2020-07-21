const rewrelic = require('newrelic')
const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js');

const port = 3050;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));


app.use('/', express.static(path.join(__dirname, '../client/dist')))

app.use('/products', router);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

