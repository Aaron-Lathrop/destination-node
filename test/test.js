"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {app, runServer, closeServer, server} = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

describe('Destino app', function(){

    before(function(){
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should show the app is online', function(){
        return chai.request(app)
            .get('/')
            .then(function(res){
                expect(res).to.have.status(404);
                expect(res).to.be.json;
            });
    });//it should show the app is online
});//describe Node Capstone app