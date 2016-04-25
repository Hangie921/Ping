var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;

var viewed = mongoose.model('viewed', new mongoose.Schema({
    _id: {
        type: ObjectId,
        ref: 'profile',
        unique:true
    },
    view: [{
        _id: {
            type: ObjectId,
            ref: 'profile'
        },
        time: {
            type: Date,
            default: Date.now
        }
    }],
    viewed_by: [{
        _id: {
            type: ObjectId,
            ref: 'profile'
        },
        time: {
            type: Date,
            default: Date.now
        }
    }]
}));

module.exports = viewed;
