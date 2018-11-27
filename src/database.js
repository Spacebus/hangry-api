var mclient = require('mongodb').MongoClient;
var dburl = 'mongodb://hangry:hangry123@ds145951.mlab.com:45951/hangry-test';

module.exports.connect = function connect(callback) {
    mclient.connect(dburl, { useNewUrlParser: true }, function(err, conn,){
        module.exports.conn = conn;
        callback(err);
    });
};