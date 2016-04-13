var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    pwd: String,
    mem_type: String
});

module.exports = mongoose.model('my_user', userSchema);