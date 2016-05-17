// node modules 
var mongoose = require("mongoose"),
    async = require('async'),
    assert = require('assert'),
    dbURI = 'mongodb://localhost/ping';

mongoose.connect(dbURI);

// Models 
var Position = require('../module/schema/position.js');
var Skill = require('../module/schema/skill.js');

var pm = new Position({ title: "PM", category: 'PM' });
var designer = new Position({ title: "Designer", category: "Designer" });
var developer = new Position({ title: "Developer", category: "Developer" });

var management = new Skill({ skillname: 'Management' });
var photoshop = new Skill({ skillname: 'Photoshop' });
var nodejs = new Skill({ skillname: 'Nodejs' });

pm.skills.push(management);
designer.skills.push(photoshop);
developer.skills.push(nodejs);

async.series([
        function(callback) {
            if (process.argv[2] === "--drop") {
                mongoose.connection.collections['skills'].remove(function(err) {
                    mongoose.connection.collections['positions'].remove(function(err) {
                        callback(err);
                    });
                });
            } else {
                callback();
            }
        },
        function(callback) {
            pm.save(function(err, data) {
                callback(err, data);
            });
        },
        function(callback) {
            designer.save(function(err, data) {
                callback(err, data);
            });
        },
        function(callback) {
            developer.save(function(err, data) {
                callback(err, data);
            });
        },
        function(callback) {
            management.save(function(err, data) {
                callback(err, data);
            });
        },
        function(callback) {
            photoshop.save(function(err, data) {
                callback(err, data);
            });
        },
        function(callback) {
            nodejs.save(function(err, data) {
                callback(err, data);
            });
        }
    ],
    // 如果不放err, 會印不出所有results
    function(err, results) {
        // console.log(err);
        assert.equal(err, null, err);
        mongoose.disconnect();
    });
