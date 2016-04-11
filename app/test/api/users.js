var request = require('supertest');
var should = require('should');

request = request('http://localhost:3001');

describe('GET /api/users', function() {
    it('respond a json showing all users', function(done) {
        request
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                var data = res.body;
                // console.log(data);
                done(err);
            });
    })
});

describe('POST /api/users', function() {
    it('create a user with wrong form', function(done) {
        request
            .post('/api/users')
            .send({ acc: '123' })
            // @dont-know: why use accept
            // .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, function(err, res) {
                should(res.body.msg).be.exactly('wrong form');
                done(err);
            });
    })

    it.skip('create a user with correct form', function(done) {
        request
            .post('/api/users')
            .send({ acc: '123', pwd: '233' })
            // .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                should(res.body.msg).be.exactly('succuss');
                done(err);
            });
    })
});
