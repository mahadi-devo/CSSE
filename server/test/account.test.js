const should = require('should');
const chai = require('chai');
const expect = chai.expect;
const urlBase = 'http://localhost:5000/api/v1/account';
const request = require('superagent');

describe('Account test', function () {
  this.timeout(10000);
  it('account invalidity', function (done) {
    request
      .post(urlBase + '/valid-account')
      .set('Content-Type', 'application/json')
      .send({
        accountId: 36,
        inspectorId: 38,
        currentLocationLat: '6.9270786',
        currentLocationLong: '79.861243',
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.body.data.status).to.equal('Invalid');
        expect(res.body.data.fine).to.equal(729484);
      });
    done();
  });

  it('account validity', function (done) {
    request
      .post(urlBase + '/valid-account')
      .set('Content-Type', 'application/json')
      .send({
        accountId: 37,
        inspectorId: 38,
        currentLocationLat: '3.9270786',
        currentLocationLong: '60.861243',
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.body.data.status).to.equal('Valid');
        expect(res.body.data.fine).to.equal(null);
      });
    done();
  });

  it('Account create test', function (done) {
    request
      .post(urlBase)
      .set('Content-Type', 'application/json')
      .send({
        creditAmount: 120,
        name: 'ABC',
        nic: '199113123',
        address: 'colombo',
        password: '1234',
        email: 'aflal@gmail.com',
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.body.success).to.equal(true);
      });
    done();
  });
});
