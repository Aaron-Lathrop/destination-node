'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Interview} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const { localStrategy, jwtStrategy } = require('../auth');
const passport = require('passport');
passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {session: false});


router.get('/', jwtAuth, (req,res) => {
  
  Interview.find({user: req.user.id})
  .populate('user')
  .then(interviews => {
    return res.status(200).json(interviews.map(interview => interview.serialize()))
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error! Oh my!"});
  });
});

router.get('/:interviewId', jwtAuth, (req, res) => {
  Interview.findById(req.params.interviewId)
  .then(interview => {
    return res.status(200).json(interview);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: "Internal server error! Oh my!"});
  });
});

//updates an individual response in an interview by finding the interview's repsonses and replacing one of them with the desired text
router.put('/:interviewId', jwtAuth, (req,res) => {
  const i = req.body.index;
  const index = parseInt(i);
  const editedResponse = req.body.editedResponse;
  Interview.findById(req.params.interviewId)
  .then(interview => {
    interview.responses[index].responseText = editedResponse;
    return interview.save();
  })
  .then((update) => {
    Interview.findOneAndUpdate({_id: req.params.interviewId}, {$set: {responses: update.responses}})
    .then(()=> {
      return res.status(201).json({message: "Interview response updated successfully.", editedResponse})
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

router.post('/', jwtAuth, (req,res) => {
  
  const newInterview = {
    user: req.user.id,
    username: req.user.username,
    responses: req.body.responses
  }

  Interview.create(newInterview)
  .then(interview => {
    res.status(201).json({message: `interview saved successfully`, interview: interview})
  })
  .catch(err => {res.end(500).json({message: 'Internal server error! Oh my!'})})
});

router.delete('/:interviewId', jwtAuth, function(req,res){

  Interview.findByIdAndDelete(req.params.interviewId)
  .then(() => {
    return res.status(201).end();
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: `Internal server error! Oh my!`})
  });
});

module.exports = {router};