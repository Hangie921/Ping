var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    acc: String,
    pwd: String,
    mem_type: String
}, { autoIndex: true });

module.exports = mongoose.model('users', userSchema);