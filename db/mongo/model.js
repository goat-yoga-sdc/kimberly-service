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
        collection.find({id: {$gt: 9999899}}).sort({id: 1}).limit(100).toArray((err, docs) => {
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
        collection.find({id: {$gt: 1999899}}).sort({id: 1}).limit(100).toArray((err, docs) => {
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
        collection.find({id: {$gt: 3999899}}).sort({id: 1}).limit(100).toArray((err, docs) => {
          err ? callback(err) : callback(null, docs)
        });
      }
      client.close();
    })
  }
};

module.exports = dbHelpers;
