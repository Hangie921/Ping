// node modules 
var mongoose = require("mongoose"),
    async = require('async'),
    assert = require('assert'),
    dbURI = 'mongodb://localhost/ping';

mongoose.connect(dbURI);

// Models 
var Position = require('../module/schema/position.js');
var Skill = require('../module/schema/skill.js');

var pm = new Position({ name: "PM", category: 'PM' });
var designer = new Position({ name: "Designer", category: "Designer" });
var developer = new Position({ name: "Developer", category: "Developer" });

var management = new Skill({name: 'Management'});
var photoshop = new Skill({name: 'Photoshop'});
var nodejs = new Skill({name: 'Nodejs'});

pm.skills.push(management);
designer.skills.push(photoshop);
developer.skills.push(nodejs);


async.parallel([
        function(callback) {
            pm.save(function(err, data) {
                callback(err, data);
            })
        },
        function(callback) {
            designer.save(function(err, data) {
                callback(err, data);
            })
        },
        function(callback) {
            developer.save(function(err, data) {
                callback(err, data);
            })
        },
        function(callback) {
            management.save(function(err, data) {
                callback(err, data);
            })
        },
        function(callback) {
            photoshop.save(function(err, data) {
                callback(err, data);
            })
        },
        function(callback) {
            nodejs.save(function(err, data) {
                callback(err, data);
            })
        }
    ],
    // 如果不放err, 會印不出所有results
    function(err, results) {
        // console.log(err);
        assert.equal(err, null, err);
        mongoose.disconnect();
    });
