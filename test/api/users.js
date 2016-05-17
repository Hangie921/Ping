var request = require('supertest'); // For HTTP request

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

request = request('http://localhost:3001');

describe('GET /api/users', function() { // Test title
    it('respond a json showing all users', function(done) { // sub-title
        request
            .get('/api/users') // HTTP:GET(url)
            .expect(200) // status code
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                var data = res.body; // can get resonse data
                expect(data).be.a('array');
                expect(data[0]).be.a('object');
                expect(data[0]).have.all.keys("__v","_id",  "custom",  "email",  "menu_crud",  "name",  "pwd",  "system_parameter");
                
                done(err); // if err, print log and see it as fail
            });
    });
});
