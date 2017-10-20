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
        res.body.length.should.equal(9);

        done();
      });
  });
});
