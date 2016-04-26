var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;

var position = mongoose.model('position', new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Designer', 'Developer', 'PM']
    },
    name: {
        type: String,
        unique: true
    },
    talents: [{
        type: ObjectId,
        ref: 'profile'
    }],
    skills: [{
        type: ObjectId,
        ref: 'skill'
    }]

}));

module.exports = position;
