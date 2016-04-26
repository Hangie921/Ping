var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;

var skill = mongoose.model('skill', new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    tag_by: [{
        type: ObjectId,
        ref: 'profile'
    }]

}));

module.exports = skill;
