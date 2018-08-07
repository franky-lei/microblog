var mongodb = require('./db');
function User(user) {
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;
User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password,
    };
    mongodb.connect(function (err, mongoClient) {
        if (err) {
            return callback(err);
        }
        var db = mongoClient.db("microblog");
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name', { unique: true });
            collection.insert(user, { safe: true }, function (err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};
User.get = function get(username, callback) {
    mongodb.connect(function (err, mongoClient) {
        if (err) {
            return callback(err);
        }
        var db = mongoClient.db("microblog");
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({ name: username }, function (err, doc) {
                mongodb.close();
                if (doc) {
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};