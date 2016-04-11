var mongoose = require("mongoose");

var companySchema = mongoose.Schema({
    acc: String,
    pwd: String,
    mem_type: String
}, { autoIndex: true });

module.exports = mongoose.model('users', companySchema);