'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const expect = chai.expect;

chai.use(chaiHttp);

function tearDownDb() {
    return new Promise((resolve, reject) => {
      console.warn('Deleting database');
      mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

describe('/trips', function(){
  let user;
  let userid;
  let jwtToken;

  const username = 'exampleUser';
  const password = 'examplePass';

  const trip = {
    startDate: '1/1/2019',
    endDate: '1/5/2019',
    dateList: ['1/1/2019','1/2/2019','1/3/2019','1/4/2019','1/5/2019'],
    destination: "Tokyo, Japan",
    icon: '',
    planCards: [
      {
        plans: ["this is a test plan","Another test plan","yet another test plan"],
        date: "1/1/2019",
        weather: "super cold"
      },
      {
        plans: ["this is a test plan","Another test plan","yet another test plan"],
        date: "1/2/2019",
        weather: "super cold"
      },
      {
        plans: ["this is a test plan","Another test plan","yet another test plan"],
        date: "1/3/2019",
        weather: "super cold"
      },
      {
        plans: ["this is a test plan","Another test plan","yet another test plan"],
        date: "1/4/2019",
        weather: "super cold"
      },
      {
        plans: ["this is a test plan","Another test plan","yet another test plan"],
        date: "1/5/2019",
        weather: "super cold"
      }
    ]
  };

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function(){
    return chai
    .request(app)
    .post('/users/signup')
    .send({
      username,
      password
    })
    .then(res => {
      userid = res.body.id;
      return chai
      .request(app)
      .post('/auth/login')
      .send({username, password})
    })
    .then(res => {
      jwtToken = res.body.jwtToken;
    })
  });

  after(function () {
    return closeServer();
  });

  afterEach(function(){
    return tearDownDb();
  });
  
    describe('POST', function(){

      it('should create a new trip', function(){
        return chai
        .request(app)
        .post(`/trips`)
        .send({user, trip})
        .set('Authorization', `Bearer ${jwtToken}`)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'message',
            'trip'
          );
          expect(res.body.trip.startDate).to.equal(trip.startDate);
          expect(res.body.trip.endDate).to.equal(trip.endDate);
          expect(res.body.trip.dateList).to.eql(trip.dateList);
          expect(res.body.trip.destination).to.equal(trip.destination);
          expect(res.body.trip.icon).to.equal(trip.icon);
          expect(res.body.trip.planCards).to.eql(trip.planCards);
        })
      });//it('should create a new trip')

      })

      describe('GET', function(){

        it('should return an empty array initially', function(){
          return chai
          .request(app)
          .get(`/trips`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(0);
          })
        });//it('should create a new interview')
        
        it('should return an array of trips', function(){
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .get(`/trips`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(1);
            expect(res.body[0].tripId).to.equal(_trip._id);
            expect(res.body[0].startDate).to.equal(_trip.startDate);
            expect(res.body[0].endDate).to.equal(_trip.endDate);
            expect(res.body[0].destination).to.equal(_trip.destination);
            expect(res.body[0].planCards).to.deep.equal(_trip.planCards);
          })
        });//it('should return an array of trips')

        it('should return a trip by id', function() {
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .get(`/trips/${_trip._id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body._id).to.equal(_trip._id);
            expect(res.body.startDate).to.equal(_trip.startDate);
            expect(res.body.endDate).to.equal(_trip.endDate);
            expect(res.body.destination).to.equal(_trip.destination);
            expect(res.body.planCards).to.deep.equal(_trip.planCards);
          })

      });

      describe('DELETE', function(){
        
        it('should delete an trip by id', function(){
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .delete(`/trips/delete/${_trip._id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then(res => {
            expect(res).to.have.status(201);
          })
          .then((res) => {
            return chai
            .request(app)
            .get(`/trips`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(0);
          })

        });//it('should delete an trip by id')

      });

      describe('PATCH', function(){

        it('should not update if no content is sent', function() {
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .patch(`/trips/deleteplan/${_trip._id}`)
            .send({plans: null, date: _trip.planCards[0].date, hasContentToDelete: true})
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then((res) => {
            expect(res).to.have.status(422);
          })
        });

        it('should not update if property hasContentToDelete is not true', function() {
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .patch(`/trips/deleteplan/${_trip._id}`)
            .send({plans: _trip.planCards[0].plans, date: _trip.planCards[0].date, hasContentToDelete: false})
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then((res) => {
            expect(res).to.have.status(204);
          })
        });

        it('should not update if there is no date property', function() {
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .patch(`/trips/deleteplan/${_trip._id}`)
            .send({plans: _trip.planCards[0].plans, hasContentToDelete: true})
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then((res) => {
            expect(res).to.have.status(422);
          })
        });
        
        it('should delete plans by updating the plans array in a given trip', function(){
          let _trip;
          return chai
          .request(app)
          .post(`/trips`)
          .send({user, trip})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            _trip = res.body.trip;
            return chai
            .request(app)
            .patch(`/trips/deleteplan/${_trip._id}`)
            .send({plans: _trip.planCards[0].plans, date: _trip.planCards[0].date, hasContentToDelete: true})
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys("message", "originalRequest")
            expect(res.body.message).to.equal("Trip was updated successfully.");
            expect(res.body.originalRequest).to.deep.equal({plans: _trip.planCards[0].plans, date: _trip.planCards[0].date, hasContentToDelete: true})
          })
          .then((res) => {
            return chai
            .request(app)
            .get(`/trips/${_trip._id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then((res) => {
            expect(res.body.planCards[0].plans).not.to.deep.equal(_trip.planCards[0].plans)
          })
        });
      });

});
});