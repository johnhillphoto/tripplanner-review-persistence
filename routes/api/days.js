var router = require('express').Router();
var path = require('path');
var models = require('../.././db').models;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;
var Promise = require('bluebird');

router.get('/hotels', function(req, res, next){
  // console.log('inside router');
    Hotel.find({})
      .then(function(hotels){
        res.json(hotels);
      })
      .then(null,next);
});
router.get('/restaurant', function(req, res, next){
    Restaurant.find({})
      .then(function(restaurants){
        res.json(restaurants);
      })
      .then(null,next);
});
router.get('/activity', function(req, res, next){
    Activity.find({})
      .then(function(activities){
        res.json(activities);
      })
      .then(null,next);
});
// list all days
router.get('/days', function(req, res, next){
    Day.find({})
      .then(function(days){
        res.json(days);
      })
      .then(null,next);
});
// create a new day
router.post('/days', function(req, res, next){
  // var newDay = new Day({ number:1, hotel: "56e4844a3af2d10d686d02c5" , restaurants:["56e4844a3af2d10d686d02d4"], activities:["56e4844a3af2d10d686d02e4"]});
  newDay.save(req.body)
  .then(function (day) {
    console.log(day);
    res.sendStatus(200);
  })
  .then(null, next);
});
// delete a day
router.delete('/days/:id', function(req, res, next){
  var searchId= req.params.id;
  Day.remove({ _id: searchId})
    .then(function(removedDay){
      console.log("one Day deleted");
      res.sendStatus(200);
    })
    .then(null,next);
});




module.exports = router;
