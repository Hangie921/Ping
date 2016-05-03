var request = require('supertest');
request = request('http://localhost:3001');

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe.skip('GET /search', function() {
    it('search position = PM', function(done) {
        request
            .get('/api/search?position=Designer')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                var data = res.body;
                expect(data.code).equal(200);
                expect(data.msg).equal('OK');
                console.log(data);
                done();
            });
    });

    it('search with wrong condition', function(done) {
        request
            .get('/api/search?qmdoiqwjoi=pm')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                var data = res.body;
                expect(data.code).equal(400);
                expect(data.msg).equal('Bad Request');
                console.log(data);
                done();
            });
    });


    it('search page', function(done) {
        request
            .get('/api/search')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                var data = res.body;
                // expect(data.code).equal(400);
                // expect(data.msg).equal('Bad Request');
                console.log(data);
                done();
            });
    });
});


describe('developing', function() {

    it('search work_type = Freelance', function(done) {
        request
            .get('/api/search?work_type=Freelance')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                var data = res.body;
                expect(data.code).equal(200);
                expect(data.msg).equal('OK');
                expect(data.data[0]).have.all.keys('username', 'pic', 'location');
                console.log(data);
                done();
            });
    });
});
