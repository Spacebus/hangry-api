const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://hangry:hangry123@ds145951.mlab.com:45951/hangry-test', { useNewUrlParser: true }, function(err, client) {
  if(err) {
    consolerr.log(err)
    throw {error:'Database connection failed'}
  }

  db = client.db('hangry-test');

  module.exports = db
});