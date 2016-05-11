var request = require('supertest');
// .agent will save cookie
// request = request('http://localhost:3001');
request = request.agent('http://localhost:3001');

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();


describe('POST /api/contact', function() {
    describe('# Do something', function() {
        before(function(done) {
            request
                .post('/login')
                .send({ mem_acc: 'company@ping.com.sg', mem_pwd: 'qwer1234' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    // console.log(res.body);
                    (res.body).should.include({ code: 200 });
                    (res.body).should.have.property('data');
                    done();
                });
        });
        it('should get session', function(done) {
            request
                .post('/api/contact')
                .send({ contact_someone: 'Talent' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    console.log(res.body);
                    (res.body.code).should.be(200);
                    done();
                });
        });

        it.skip('if no send()', function(done) {
            request
                .post('/api/contact')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    (res.body).should.include({
                        code: 400,
                        errmsg: 'Bad Request'
                    });
                    done();
                });
        });
    });
});
