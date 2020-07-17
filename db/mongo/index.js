const {MongoClient} = require('mongodb');
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'suggestedItems';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server");
  assert.equal(null, err);

  let db = client.db(dbName);
  client.close();
});

