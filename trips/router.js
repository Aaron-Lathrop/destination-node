'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Trip} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const { localStrategy, jwtStrategy } = require('../auth');
const passport = require('passport');
passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {session: false});


router.get('/', jwtAuth, (req,res) => {
  
  Trip.find({user: req.user.id})
  .populate('user')
  .then(trips => {
    return res.status(200).json(trips.map(trip => trip.serialize()))
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error! Oh my!"});
  });
});

router.get('/:tripId', jwtAuth, (req, res) => {
  Trip.findById(req.params.tripId)
  .then(trip => {
    return res.status(200).json(trip);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: "Internal server error! Oh my!"});
  });
});

//updates an individual response in an trip by finding the trip's repsonses and replacing one of them with the desired text
router.put('/:tripId', jwtAuth, (req,res) => {
  const i = req.body.index;
  const index = parseInt(i);
  const editedResponse = req.body.editedResponse;
  Trip.findById(req.params.tripId)
  .then(trip => {
    trip.responses[index].responseText = editedResponse;
    return trip.save();
  })
  .then((update) => {
    Trip.findOneAndUpdate({_id: req.params.tripId}, {$set: {responses: update.responses}})
    .then(()=> {
      return res.status(201).json({message: "Trip was updated successfully.", editedResponse})
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error! Oh my!"});
      });
    })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: "Internal server error! Oh my!"});
  });

});


//create a new trip
router.post('/', jwtAuth, (req,res) => {
  
  const newTrip = {
    user: req.user.id,
    // username: req.user.username,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    dateList: req.body.dateList,
    destination: req.body.destination,
    icon: req.body.icon,
    planCards: req.body.planCards
  }

  Trip.create(newTrip)
  .then(trip => {
    res.status(201).json({message: `trip saved successfully`, trip: trip})
  })
  .catch(err => {res.end(500).json({message: 'Internal server error! Oh my!'})})
});

router.delete('/:tripId', jwtAuth, function(req,res){

  Trip.findByIdAndDelete(req.params.tripId)
  .then(() => {
    return res.status(201).end();
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: `Internal server error! Oh my!`})
  });
});

module.exports = {router};