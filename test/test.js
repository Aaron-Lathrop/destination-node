"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

describe('Destino app', function(){

    before(function(){
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    //there is no html page linked to this server as it is designed to only work with the destination-client app.
    it('should show the app is online', function(){
        return chai.request(app)
            .get('/')
            .then(function(res){
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                expect(res.body.message).to.equal('Oops! Looks like this is not the page you were looking for. This one is Not Found');
            });
    });
});