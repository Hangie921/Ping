var mongoose = require("mongoose");

var options = { discriminatorKey: 'type' };

var Profile = mongoose.model('profile', new mongoose.Schema({
    time: Date
}, options));

var CompanyProfile = Profile.discriminator('Company',
    new mongoose.Schema({
        name: { type: String, unique: true ,default:"Ping"},
        pic: String,
        description: { type: String, default: "Walter hahahahah Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos rerum maiores accusamus enim unde distinctio? Assumenda suscipit vitae, quia enim consequatur! Neque animi, omnis officiis, porro rerum nemo error vitae!" },
        size: {type:String, default:"10-25"},
        industry: {type:String,default:"Technolegy"},
        establish_year: {type:String, default:2014},
        location: { type: String, default: "Taipei,Taiwan" },
        culture: { type: Array, default: ["Fun in life","HoHoHo","Banana","Kumamon"] },
        technology: {type:Array, default:["Pokemon","Spy","Beer","Holiday","Javascipt","PHP"]},
        links: Array
    }, options));

var TalentProfile = Profile.discriminator('Talent',
    new mongoose.Schema({
        name: String,
        religion: { type: String, default: "Christianity" },
    }, options));


module.exports = Profile;
module.exports.CompanyProfile = CompanyProfile;
module.exports.TalentProfile = TalentProfile;
