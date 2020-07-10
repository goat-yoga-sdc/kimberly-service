const {MongoClient} = require('mongodb');
const assert = require('assert');
const seed = require('./seed.js');
const url = 'mongodb://localhost:27017';

const dbName = 'suggestedItems';
var db;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server");
  assert.equal(null, err);

  db = client.db(dbName);
  seed.insertDocumentsMainSuggest(db, function() {
    seed.insertDocumentsQuickView (db, function() {
      seed.insertDocumentsShades(db, function() {
        client.close();
      })
    })
  });
});

