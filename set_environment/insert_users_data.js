//This js insert all the data for testing all at once.
//Under the DB Ping should have collection 'users'
//

var mongoose = require("../app/node_modules/mongoose");
	

var userSchema = mongoose.Schema({
    acc:String,
    email: String,
    pwd: String,
    mem_type: String,
    system_parameter: 0
}, { autoIndex: true });

var User = mongoose.model('users',userSchema);
	
mongoose.connect("mongodb://localhost/ping");
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
    console.log('connected', mongoose.connection.readyState);
});
db.once('disconnected', function() {
    console.log('disconnected', mongoose.connection.readyState);
});

//create default company 
var defaultCompany = new User({
        acc: "company@ping.com.sg", 
        email: "company@ping.com.sg", 
        pwd: "company",
        mem_type:"company",
        system_parameter: 0 
    });

defaultCompany.save(function(err, user) {
    if (err) return console.error(err);
    console.log("createDefaultCompany")
});


//create default talent
var defaultTalent = new User({ 
    acc: "talent@ping.com.sg", 
    email: "talent@ping.com.sg", 
    pwd: "talent",
    mem_type:"talent",
    system_parameter: 0 
});
defaultTalent.save(function(err, user) {
    if (err) return console.error(err);
    console.log("createDefaultTalent");
    console.log("db close");
    db.close();
});




