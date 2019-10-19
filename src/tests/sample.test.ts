import 'mocha';
import appServer from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;

let sample = {
  "name": "string",
  "url": "string",
  "isActive": true
};

let id = 1;

describe('Samples', () => {
  describe('GET: /samples', () => {
    it('should return status 200 with an empty array in body', () => {
      return chai
        .request(appServer)
        .get('/samples')
        .then(res => {
          res.should.have.status(200);
          expect(res.body).to.instanceOf(Array);
        });
    });
  });

  describe('POST: /samples', () => {
    it('should create a new payment plan', () => {
      return chai
        .request(appServer)
        .post('/samples')
        .send(sample)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body)
            .have.property('id')
            .and.be.greaterThan(0);
          expect(res.body.name).to.be.deep.equal(sample.name);
        });
    });
  });

  describe('GET: /samples/{id}', () => {
    it('Should return object with id ' + id, () => {
      return chai
        .request(appServer)
        .get('/samples/' + id)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body)
            .have.property('id')
            .and.be.equal(1);
        });
    });
  });

  describe('PUT: /samples/{id}', () => {
    it('Should update the payment plan with id ' + id, () => {
      const UPDATED_NAME = 'updated name';
      const data = Object.assign({}, sample, { name: UPDATED_NAME });
      return chai
        .request(appServer)
        .put('/samples/' + id)
        .send(data)
        .then(res => {
          expect(res).have.status(200);
          return chai
            .request(appServer)
            .get('/samples/' + id)
            .then(res => {
              expect(res).have.status(200);
              expect(res.body.name).equal(UPDATED_NAME);
              const NEW_NAME = 'new name';
              return chai
                .request(appServer)
                .put('/samples/' + id)
                .send(Object.assign(data, { name: NEW_NAME }))
                .then(res => {
                  expect(res).have.status(200);
                  return chai
                    .request(appServer)
                    .get('/samples/' + id)
                    .then(res => {
                      expect(res).have.status(200);
                      expect(res.body.name).equal(NEW_NAME);
                    });
                });
            });
        });
    });
  });

  describe('DELETE: /samples/{id}', () => {
    it('Should delete payment plan', () => {
      return chai
        .request(appServer)
        .post('/samples')
        .send(sample)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body).has.property('id');

          return chai
            .request(appServer)
            .delete('/samples/' + res.body.id)
            .then(res => {
              expect(res).have.status(200);
              return chai
                .request(appServer)
                .get('/samples/' + res.body.id)
                .then(res => {
                  expect(res).have.status(400);
                });
            });
        });
    });
  });
});
