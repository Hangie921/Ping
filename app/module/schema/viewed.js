var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;

var viewedSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        ref: 'profile',
        unique: true
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
    }],
    contact: [{
        _id: {
            type: ObjectId,
            ref: 'profile'
        },
        time: {
            type: Date,
            default: Date.now
        }
    }],
    contacted_by: [{
        _id: {
            type: ObjectId,
            ref: 'profile'
        },
        time: {
            type: Date,
            default: Date.now
        }
    }]
});

var Viewed = mongoose.model('viewed', viewedSchema);
module.exports = Viewed;
