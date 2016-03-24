var mongoose = require("mongoose");




function findUser(acc, psw) {
    var db = mongoose.createConnection("mongodb://localhost/ping");
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log("connected")
        var userSchema = mongoose.Schema({
            acc: String,
            psw: String
        });

        var User = mongoose.model('user', userSchema);
        console.log(acc);

        User.find({'acc':acc},'acc psw',function(err, user) {
        	if(err) console.log(err);
            console.log("all");
            console.log(user.psw);
        });
       
        console.log("closed");
        db.close();
    });

}

exports.findUser = findUser;
