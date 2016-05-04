var request = require('supertest');
request = request('http://localhost:3001');

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

function checkDataFormat(res) {
    if (res.code === 200) {
        // console.log(res);
        expect(res.code).equal(200);
        expect(res.msg).equal('OK');
        expect(res).to.have.property('data')
            .that.is.an('array');

        if (res.data.length > 0) {
            expect(res.data[0]).have.all.keys('username', 'pic', 'location');
        }

    } else if (res.code === 400) {
        expect(res.code).equal(400);
        expect(res.msg).equal('Bad Request');
        expect(res.data).not.exist;
    }

}

describe('GET /search', function() {
    describe('error handling', function() {

        it('1 condition but not exist', function(done) {
            request
                .get('/api/search?qmdoiqwjoi=pm')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    checkDataFormat(res.body);
                    done();
                });
        });

        it('no conditions', function(done) {
            request
                .get('/api/search')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    checkDataFormat(res.body);
                    done();
                });
        });
    });


    it('search work_type = Freelance', function(done) {
        request
            .get('/api/search?work_type=Freelance')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                checkDataFormat(res.body);
                expect(res.body.data.length).gte(5);
                done();
            });
    });


    describe('position and seniority', function() {

        it('search position = Designer', function(done) {
            request
                .get('/api/search?position=Designer')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    checkDataFormat(res.body);
                    expect(res.body.data[0].username).equal('Talent');
                    expect(res.body.data[1].username).equal('Talent4');
                    done();
                });
        });

        it('search seniority >= 2', function(done) {
            request
                .get('/api/search?seniority=2')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    checkDataFormat(res.body);
                    expect(res.body.data[0].username).equal('Talent');
                    expect(res.body.data[1].username).equal('Talent3');
                    done();
                });
        });

        it('search position = PM and seniority = 0 ', function(done) {
            request
                .get('/api/search?position=PM&seniority=0')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    checkDataFormat(res.body);
                    expect(res.body.data[0].username).equal('Talent1');
                    expect(res.body.data[1].username).equal('Talent2');
                    expect(res.body.data[2].username).equal('Talent3');
                    done();
                });
        });

        it('search position = PM and seniority >= 2', function(done) {
            request
                .get('/api/search?position=PM&seniority=1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    checkDataFormat(res.body);
                    expect(res.body.data[0].username).equal('Talent1');
                    done();
                });
        });
    });
});
