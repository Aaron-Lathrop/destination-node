'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {Interview} = require('../interviews');
const {User} = require('../users')
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

function tearDownDb() {
    return new Promise((resolve, reject) => {
      console.warn('Deleting database');
      mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

describe('/interview', function(){
  const questionText = 'Example question?';
  const responseText = 'Response lorem';
  const responses = [{questionText, responseText}]

  let user;
  let userid;
  let jwtToken;

  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function(){
    return chai
    .request(app)
    .post('/users')
    .send({
      username,
      password,
      firstName,
      lastName
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

      it('should create a new interview', function(){
        return chai
        .request(app)
        .post(`/interviews`)
        .send({user, responses})
        .set('Authorization', `Bearer ${jwtToken}`)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'message',
            'interview'
          );
          expect(res.body.interview.user).to.equal(userid);
          expect(res.body.interview.responses[0].questionText).to.equal(responses[0].questionText);
          expect(res.body.interview.responses[0].responseText).to.equal(responses[0].responseText);

        })
      });//it('should create a new interview')

      })

      describe('GET', function(){

        it('should return an empty array initially', function(){
          return chai
          .request(app)
          .get(`/interviews`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(0);
          })
        });//it('should create a new interview')
        
        it('should return an array of interviews', function(){
          let interview;
          return chai
          .request(app)
          .post(`/interviews`)
          .send({user, responses})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            interview = res.body.interview;
            return chai
            .request(app)
            .get(`/interviews`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(1);
            expect(res.body[0].id).to.equal(interview._id);
            expect(res.body[0].responses[0]).to.deep.equal(interview.responses[0]);
          })
        });//it('should return an array of interviews')

      })

      describe('DELETE', function(){
        
        it('should delete an interview by id', function(){
          let interview;
          return chai
          .request(app)
          .post(`/interviews`)
          .send({user, responses})
          .set('Authorization', `Bearer ${jwtToken}`)
          .then((res) => {
            interview = res.body.interview;
            return chai
            .request(app)
            .delete(`/interviews/${interview._id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then(res => {
            expect(res).to.have.status(201);
          })
          .then((res) => {
            return chai
            .request(app)
            .get(`/interviews`)
            .set('Authorization', `Bearer ${jwtToken}`)
          })
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(0);
          })

        });//it('should delete an interview by id')

      })

});