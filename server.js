'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.Promise = global.Promise;

const { router: usersRouter } = require('./users');
const { router: tripsRouter } = require('./trips');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { PORT, DATABASE_URL} = require('./config');
const { Question } = require('./models');

const express = require('express');
const app = express();
const passport = require('passport');

app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    if(req.method === 'OPTIONS'){
        return res.sendStatus(204);
    }
    next();
  });

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/auth', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/questions', function(req, res){
    Question
    .find()
    .limit(100)
    .then(questions => {
        res.json({
            questions: questions.map(
                (question) => question.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: "Internal server error! Oh my!"});
    });
});

app.use('*', function (req, res) {
    res.status(404).json({ message: 'Oops! Looks like this is not the page you were looking for. This one is Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.set('useCreateIndex', true)
      mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve,reject) => {
            console.log('Closing server');
            server.close(err => {
                if(err) {
                    return reject(err);
                }
                resolve()
            });
        });
    });
}

if(require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer, server};