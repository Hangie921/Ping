var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    pwd: String
});

var User = mongoose.model('User', userSchema);


function findUser(acc, psw, cb) {
    console.log("findUser")

    var conn = mongoose.connection;
    // console.log(conn.db);
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
    console.log("findUsers")

    var conn = mongoose.connection;
    User.find(function(err, users) {
        if (err) console.log(err);
        cb(true, users);
    });
}

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
function insertCompany(acc, pwd) {
    var newUser = new User({ acc: acc, pwd: pwd });
    newUser.save(function(err, user) {
        if (err) return console.error(err);
        db.close();
        console.log(mongoose.connection.readyState);
        console.log(user);
    });

}

exports.insertCompany = insertCompany;
exports.findUser = findUser;
exports.findUsers = findUsers;
