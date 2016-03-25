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
        console.log(acc, "all");
        console.log(users);
        if (users.length == 0) {
            console.log("Please insert company account");
        } else {
            cb(true, users);
        }
    });

}

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
function insertCompany(acc, pwd) {
    var db = getDbConnection();
    // console.log(mongoose.connection);
    // console.log(mongoose.connection.db);
    console.log('insertCompany', mongoose.connection.readyState);
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        var newUser = new User({ acc: acc, pwd: pwd });
        newUser.save(function(err, user) {
            if (err) return console.error(err);
            db.close();
            console.log(mongoose.connection.readyState);
            console.log(user);
        });
    });

    db.once('connected', function() {
        console.log('connected', mongoose.connection.readyState);
    });
    db.once('disconnected', function() {
        console.log('disconnected', mongoose.connection.readyState);
    });
}

// exports.findUser = insertCompany;
exports.findUser = findUser;
