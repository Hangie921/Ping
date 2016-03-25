var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    pwd: String
});

var User = mongoose.model('User', userSchema);


function findUser(acc, psw, cb) {
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

function findUsers(cb) {
    var conn = mongoose.connection;
    User.find(function(err, users) {
        if (err) console.log(err);
        cb(true, users);
    });
}

function addDefaultCompany(cb) {
    var defaultCompany = new User({ acc: "company", pwd: "company" });
    defaultCompany.save(function(err, user) {
        if (err) return console.error(err);
        console.log("addDefaultCompany")
        cb(true);
    });
}

function addUser (acc,pwd) {
    var newUser = new User({ acc: acc, pwd: pwd });
    newUser.save(function(err, user) {
        if (err) return console.error(err);
    });
}

exports.addDefaultCompany = addDefaultCompany;
exports.findUser = findUser;
exports.findUsers = findUsers;
exports.addUser = addUser;
