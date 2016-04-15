var mongoose = require("mongoose");

var companySchema = mongoose.Schema({
    name: { type: String, unique: true },
    pic: String,
    description: String,
    size: String,
    industry: String,
    establish_year: String,
    location: String,
    culture: Array,
    technology: Array,
    links: Array
});

module.exports = mongoose.model('company', companySchema);
