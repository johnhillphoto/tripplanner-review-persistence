var router = require('express').Router();
var path = require('path');
var models = require('../.././db').models;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
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

module.exports = router;
