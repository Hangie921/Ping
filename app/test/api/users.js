var request = require('supertest'); // For HTTP request
var should = require('should'); // BDD 

request = request('http://localhost:3001');

describe('GET /api/users', function() { // Test title
    it('respond a json showing all users', function(done) { // sub-title
        request
            .get('/api/users') // HTTP:GET(url)
            .expect(200) // status code
            .expect('Content-Type', /json/) 
            .end(function(err, res) {
                var data = res.body; // can get resonse data
                // console.log(data);
                done(err); // if err, print log and see it as fail
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
