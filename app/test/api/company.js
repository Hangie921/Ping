var request = require('supertest');
request = request('http://localhost:3001');

var should = require('chai').should();

describe.skip('GET /api/companies', function() {
    it('respond a json showing all companies', function(done) {
        request
            .get('/api/companies')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                var data = res.body;
                // console.log(data);
                done(err);
            });
    });
});

describe.skip('POST /companies/company@gogo', function() {
    it.skip('create a user with wrong form', function(done) {
        request
            .post('/api/companies')
            .send({ acc: '123' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, function(err, res) {
                console.log(res.body.msg);
                done(err);
            });
    });

    it('POST { industry: \'company\' }', function(done) {
        var updateData = { industry: ['123', '23'] };
        request
            .post('/companies/company@gogo/edit')
            .send(updateData)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                console.log(res.text);
                done(err);
            });
    });

    it.skip('POST { culture: \'company\', try: \'should not exist\' }', function(done) {
        request
            .post('/companies/company@gogo/edit')
            .send({ culture: 'company', try: 'should not exist' })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                (res.body.ok).should.be.equal(1);
                (res.body.nModified).should.be.equal(0);
                (res.body.n).should.be.equal(1);

                done(err);
            });
    });
});
