var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.Types.ObjectId;

var contactSchema = new mongoose.Schema({
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
        msg: String,
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
        msg: String,
        time: {
            type: Date,
            default: Date.now
        }
    }]
});


contactSchema.statics.contact = function(me, someone, msg) {
    return new Promise((resolve, reject) => {
        var someoneContact;
        this.model('profile').findContactByUsername(someone)
            .then((someoneContact) => {
                if (!someoneContact) reject('no username: ' + someone);
                someoneContact.contacted_by.push({ _id: me, msg: msg });
                return someoneContact.save();
            })
            .then((saveSomeoneContact) => {
                someoneContact = saveSomeoneContact;
                return this.findById(me);
            })
            .then((meContact) => {
                meContact.contact.push({ _id: someoneContact, msg: msg });
                return meContact.save();
            })
            .then((saveMeContact) => {
                var response = {
                    status: 'success',
                    me: saveMeContact,
                    someone: someoneContact
                };
                resolve(response);
            })
            .catch(function(err) {
                console.log('err:contactSchema.statics.contact', err);
                reject(err);
            });
    });
};

var Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;
