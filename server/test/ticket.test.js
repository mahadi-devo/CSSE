const should = require('should');
const chai = require('chai');
const expect = chai.expect;
const urlBase = 'http://localhost:5000/api/v1/ticket';
const request = require('superagent');

describe('Ticket test', function () {
  this.timeout(10000);
  it('ticket validity', function (done) {
    request
      .post(urlBase + '/valid-ticket')
      .set('Content-Type', 'application/json')
      .send({
        inspectorId: 38,
        ticketId: 2,
        currentLocationLat: '10.9270786',
        currentLocationLong: '90.861243',
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.body.data.status).to.equal('Valid');
      });
    done();
  });

  it('Ticket create test', function (done) {
    request
      .post(urlBase)
      .set('Content-Type', 'application/json')
      .send({
        price: 1000,
        destinationLong: '79.861243',
        destinationLat: '6.9270786',
        issuedLocationLat: '6.9270786',
        issuedLocationLong: '79.861243',
        ticketTypeId: 1,
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.body.success).to.equal(true);
      });
    done();
  });
});
