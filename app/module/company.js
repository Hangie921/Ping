var mongoose = require("mongoose");

var companySchema = mongoose.Schema({
    acc: String,
    pwd: String,
    mem_type: String
});

module.exports = mongoose.model('company', companySchema);