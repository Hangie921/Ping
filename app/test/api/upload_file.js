var request = require('supertest');
request = request('http://localhost:3001');
var should = require('chai').should();
var fs = require('fs');

describe.skip('Upload', function() {
    it('#http://localhost:3001', function(done) {
        var formData = {
            acc: '123',
            my_file: fs.createReadStream(__dirname + '/image.jpg')
        };
        request
            .put({ url: '/', formData: formData })
            // .set('Accept', 'application/json')
            .expect(200, function(err, res) {
                // console.log(res.body.msg);
                done();
            });
    });

});
