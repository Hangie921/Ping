var request = require('supertest');

request = request('http://localhost:3001');

describe('GET /api/companies', function() {
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

describe.skip('POST /api/companies', function() {
    it('create a user with wrong form', function(done) {
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

    it('create a user with correct form', function(done) {
        request
            .post('/api/companies')
            .send({ acc: '123', pwd: '233' })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                done(err);
            });
    })
});
