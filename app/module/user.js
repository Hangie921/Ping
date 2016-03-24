var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    psw: String
});

var User = mongoose.model('User', userSchema);

function getDbConnection() {
    // For findUser()
    // 用這個方法會不能save,會出現Trying to open unclosed connection.
    mongoose.connect("mongodb://localhost/ping");

    // For insertCompany()
    // 如果用這個方法，db.once('open',...)的function會不執行，no idea
    // mongoose.createConnection("mongodb://localhost/ping");

    return mongoose.connection;
}

function findUser(acc, psw, cb) {
    console.log("findUser")
    var db = getDbConnection();
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log("connected")

        User.find({ 'acc': acc,'psw':psw },'acc psw mem_type', function(err, users) {
            if (err) console.log(err);
            console.log("all");
            console.log(users);
            if (users.length == 0) {
                console.log("Please insert company account");
            }else{
                cb(true,acc);
                console.log("closed");
                db.close();
            }
        });


        
    });

}

function insertCompany(acc, pwd) {
    mongoose.connect("mongodb://localhost/ping");
    var db = getDbConnection();
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        var newUser = new User({ acc: acc, pwd: pwd });
        newUser.save(function(err, user) {
            if (err) return console.error(err);
            console.log(user);
        });
    });
}

// exports.findUser = insertCompany;
exports.findUser = findUser;