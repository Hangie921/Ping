var request = require('supertest');
request = request('http://localhost:3001');

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
    })
});

describe('POST /companies/company@gogo', function() {
    it.skip('create a user with wrong form', function(done) {
        request
            .post('/api/companies')
            .send({ acc: '123' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, function(err, res) {
                console.log(res.body.msg)
                done(err);
            });
    })

    it('POST /companies/company@gogo', function(done) {
        request
            .post('/companies/company@gogo/edit')
            .send({ culture: 'company' })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                done(err);
            });
    })
});
