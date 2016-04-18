var mongoose = require("mongoose");

var options = { discriminatorKey: 'type' };

Profile = mongoose.model('profile', new mongoose.Schema({
    time: Date
}, options));

CompanyProfile = Profile.discriminator('Company',
    new mongoose.Schema({
        name: { type: String, unique: true },
        pic: String,
        description: { type: String, default: "Nice Company" },
        size: String,
        industry: String,
        establish_year: String,
        location: { type: String, default: "TW" },
        culture: { type: Array, default: ["Fun in life"] },
        technology: Array,
        links: Array
    }, options));

TalentProfile = Profile.discriminator('Talent',
    new mongoose.Schema({
        name: String,
        religion: { type: String, default: "Christianity" },
    }, options));


module.exports = Profile;
module.exports.CompanyProfile = CompanyProfile;
module.exports.TalentProfile = TalentProfile;
