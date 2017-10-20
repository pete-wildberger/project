process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server');

chai.use(chaiHttp);

describe('GET /patients/:id', function() {
  it('should return all patients for the user', function(done) {
    chai
      .request(server)
      .get('/patients/guest')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('array');
        res.body.length.should.equal(14);
        done();
      });
  });
});
describe('POST /patients', function() {
  it('should add a ne patient', function(done) {
    chai
      .request(server)
      .post('/patients')
      .send({
        therapist: 'guest',
        firstname: 'testy',
        lastname: 'testerson',
        phone: 666666666,
        email: 'testy@test.com'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.equal('nudes');

        done();
      });
  });
});
