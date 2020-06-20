const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connection = require('../db/index.js');

const port = 3050;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

app.get('/products/suggested', (req, res) => {
  console.log('Get Suggested Items')
  connection.find({})
    .exec((err, products) => {
      if (err) {
        console.error(err)
      } else {
        console.log(products);
        res.json(products);
      }
    })
})
