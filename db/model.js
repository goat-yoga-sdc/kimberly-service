const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'suggestedItems';

const dbHelpers = {
getAll: (callback) => {

  MongoClient.connect(url, (err, client) => {
    if (err){
      console.log('unable to connect to server', err)
    } else {
      var db = client.db(dbName);
      const collection = db.collection('MainSuggest');
      collection.find({}).toArray((err, docs) => {
        err ? callback(err) : callback(null, docs)
      });
    }
    client.close();
  })
},
getShades: (callback) => {
  MongoClient.connect(url, (err, client) => {
    if (err){
      console.log('unable to connect to server', err)
    } else {
      var db = client.db(dbName);
      const collection = db.collection('Shades');
      collection.find({}).toArray((err, docs) => {
        err ? callback(err) : callback(null, docs)
      });
    }
    client.close();
  })
},
getQuickview: (callback) => {
  MongoClient.connect(url, (err, client) => {
    if (err){
      console.log('unable to connect to server', err)
    } else {
      var db = client.db(dbName);
      const collection = db.collection('QuickView');
      collection.find({}).toArray((err, docs) => {
        err ? callback(err) : callback(null, docs)
      });
    }
    client.close();
  })
}

};


module.exports = dbHelpers;
