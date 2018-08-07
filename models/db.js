var settings = require('../settings');
var Db = require('mongodb').MongoClient;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(new Server(settings.host, 27017), {useNewUrlParser: true}); 