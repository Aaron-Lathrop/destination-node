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
  const updateTrip = req.body;
 
  Trip.findById(req.params.tripId)
  .then(trip => {
    trip = Object.assign({}, trip, {
      destination: updateTrip.destination ? updateTrip.destination : trip.destination,
      startDate: updateTrip.startDate ? updateTrip.startDate : trip.startDate,
      endDate: updateTrip.endDate ? updateTrip.endDate : trip.endDate,
      dateList: updateTrip.dateList ? updateTrip.dateList : trip.dateList,
      planCards: updateTrip.planCards ? updateTrip.planCards : trip.planCards
      });
    return trip;
  })
  .then((update) => {
    Trip.findOneAndUpdate({_id: req.params.tripId}, {
      destination: update.destination,
      startDate: update.startDate,
      endDate: update.endDate,
      dateList: update.dateList,
      planCards: update.planCards
    }, {new: true})
    .then((trip)=> {
      return res.status(201).json({message: "Trip was updated successfully.", trip})
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

//adds a new plan to a given trip by updating a specific planCard's plan array
router.put('/addplan/:tripId', jwtAuth, (req,res) => {
  const updatedPlanCard = req.body;
 
  Trip.findById(req.params.tripId)
  .then(trip => {
    
      trip = Object.assign({}, trip, {
        planCards: trip.planCards.map(card => card.date === updatedPlanCard.date ? updatedPlanCard : card)
      })

    return trip;
  })
  .then((update) => {
    Trip.findOneAndUpdate({_id: req.params.tripId}, {
      planCards: update.planCards
    }, {new: true})
    .then((trip)=> {
      return res.status(201).json({message: "Trip was updated successfully.", trip})
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
  console.log(req.body);
  
  const newTrip = {
    user: req.user.id,
    // username: req.user.username,
    startDate: req.body.trip.startDate,
    endDate: req.body.trip.endDate,
    dateList: req.body.trip.dateList,
    destination: req.body.trip.destination,
    icon: req.body.trip.icon,
    planCards: req.body.trip.planCards
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