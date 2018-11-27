const mongoose = require('mongoose');
mongoose.connect("mongodb://hangry:hangry123@ds145951.mlab.com:45951/hangry-test", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info("[MongoDB] Connected!");
});

