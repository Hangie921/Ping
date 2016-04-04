var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    pwd: String,
    mem_type: String
}, { autoIndex: true });

var User = mongoose.model('users', userSchema);


exports.find = function find(acc, psw, cb) {
    var conn = mongoose.connection;
    // @Feature: Does it need to check psw !?
    User.findOne({ 'email': acc }, function(err, user) {
    // User.findOne({ 'email': acc }, function(err, user) {
        if (err) {
            console.log(err);
        } else if (user !== null) {
            cb(true, user);
        } else {
            cb(false);
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
