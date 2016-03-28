var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    pwd: String
}, { autoIndex: true });

var User = mongoose.model('User', userSchema);


exports.find = function find(acc, psw, cb) {
    var conn = mongoose.connection;
    User.find({ 'acc': acc }, function(err, users) {
        // User.find( function(err, users) {
        if (err) console.log(err);
        if (users.length == 0) {
            console.log("users.length == 0");
            cb(false, acc);
        } else {
            cb(true, users);
        }
    });
}

exports.show = function show(cb) {
    var conn = mongoose.connection;
    User.find(function(err, users) {
        if (err) console.log(err);
        cb(true, users);
    });
}

exports.createDefaultCompany = function createDefaultCompany(cb) {
    var defaultCompany = new User({ acc: "company", pwd: "company" });
    defaultCompany.save(function(err, user) {
        if (err) return console.error(err);
        console.log("createDefaultCompany")
        cb(true);
    });
}

exports.create = function create(acc, pwd, cb) {
    var newUser = new User({ acc: acc, pwd: pwd });
    newUser.save(function(err, user) {
        if (err) return console.error(err);
    });
}

exports.destroy = function destroy(acc) {
    // find and delelte
    console.log("destroy");
}

exports.update = function upate(acc) {
    console.log("update");
    // find and update
}
