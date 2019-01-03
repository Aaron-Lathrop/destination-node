'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

const router = express.Router();


const createAuthToken = function(user) {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const localAuth = passport.authenticate('local', {session: false});

router.use(express.json());

router.post('/login', localAuth, (req,res) => {
    if(!(req.body.username && req.body.password)){
        let message;
        if(!(req.body.username)){
            message = `Please enter a username`;
        }
        if(!(req.body.password)){
            message = `Please enter a password`;
        }
        console.error(message);
        return res.status(400).json({message: message});
    }

    const user = req.user.serialize();
    const jwtToken = createAuthToken(user);
    res.json({jwtToken, user});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req,res) => {
    const user = req.user;
    const jwtToken = createAuthToken(user);
    res.json({jwtToken, user});
});

module.exports = {router};