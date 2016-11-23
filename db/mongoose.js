/**
 * Created by Song on 2016/11/21.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_sample_db');

var db = mongoose.connection;

db.on('error', function (err) {
    console.dir('Connection error:', err.message);
});

db.once('open', function callback() {
    console.dir('app connected to MongoDB');
})

module.exports = mongoose;