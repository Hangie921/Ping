var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;

var skillSchema = new mongoose.Schema({
    skillname: {
        type: String,
        unique: true,
        lowercase: true
    },
    tag_by: [{
        type: ObjectId,
        ref: 'profile',
        unique: true
    }]

});

// Query#findOneAndUpdate([query], [doc], [options], [callback])
// new: bool - if true, return the modified document rather than the original.
//      defaults to false (changed in 4.0)
// upsert: bool - creates the object if it doesn't exist. defaults to false.
skillSchema.statics.tagBy = function(tag, profileId, cb) {
    return this.model('skill').findOneAndUpdate({
            skillname: tag
        }, {
            $addToSet: {
                tag_by: profileId
            }
        }, {
            upsert: true,
            new: true
        },
        function(err, doc) {
            cb(err, doc);
        });
};


module.exports = mongoose.model('skill', skillSchema);
