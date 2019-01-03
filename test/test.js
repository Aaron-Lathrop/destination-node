"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {app, runServer, closeServer, server} = require('../server');
const { JWT_SECRET, DATABASE_URL } = require('../config');

chai.use(chaiHttp);

describe('Node Capstone app', function(){

    before(function(){
        return runServer(DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should show the app is online', function(){
        return chai.request(app)
            .get('/')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });//it should show the app is online

    describe("GET", function(){
        it('should get a list of questions', function(){
            return chai
            .request(app)
            .get('/questions')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys(
                    'questions'
                );
                expect(res.body.questions).to.be.an('array');
                expect(res.body.questions).to.have.length.of.at.least(1);
            })
        });
    });
});//describe Node Capstone app