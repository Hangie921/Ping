var mongoose = require("mongoose");

var options = { discriminatorKey: 'type' };

var Profile = mongoose.model('profile', new mongoose.Schema({
    time: { type: String, default: new Date() },
}, options));

var CompanyProfile = Profile.discriminator('Company',
    new mongoose.Schema({
        pic: String,
        username: { type: String, unique: true, default: "Ping" },
        description: { type: String, default: "Walter hahahahah Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos rerum maiores accusamus enim unde distinctio? Assumenda suscipit vitae, quia enim consequatur! Neque animi, omnis officiis, porro rerum nemo error vitae!" },
        tagline: { type: String, default: "ahaha is good" },
        size: { type: String, default: "10-25" },
        industry: { type: String, default: "Technolegy" },
        establish_year: { type: String, default: 2014 },
        location: { type: String, default: "Taipei,Taiwan" },
        culture: { type: Array, default: ["Fun in life", "HoHoHo", "Banana", "Kumamon"] },
        technology: { type: Array, default: ["Pokemon", "Spy", "Beer", "Holiday", "Javascipt", "PHP"] },
        links: Array,
    }, options));

var TalentProfile = Profile.discriminator('Talent',
    new mongoose.Schema({
        religion: { type: String, default: "Christianity" },
        username: { type: String, unique: true, default: "Ping" },
    }, options));

// @Todo http://mongoosejs.com/docs/api.html#model_Model.ensureIndexes
// @Todo http://mongoosejs.com/docs/guide.html#autoIndex

// CompanyProfile.ensureIndexes(function (err) {
//   if (err) console.error(err); // error occurred during index creation
// });

module.exports = Profile;
module.exports.CompanyProfile = CompanyProfile;
module.exports.TalentProfile = TalentProfile;
