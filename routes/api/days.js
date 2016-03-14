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
// find one day
router.get('/days/:id', function(req, res, next){
  Day.find({ _id: req.params.id})
      .then(function(day){
        res.json(day);
        console.log("one Day found and sent");
      })
      .then(null,next);
});
// create a new day
router.post('/days/', function(req, res, next){
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
  Day.remove({ _id: req.params.id})
    .then(function(removedDay){
      console.log("one Day deleted");
      res.sendStatus(200);
    })
    .then(null,next);
});
///add a hotel to a day
router.post('/days/:dayNum/hotel/:hotelId', function(req, res, next){
  Day.find({ number: req.params.dayNum})
      .then(function(_day){
        _day[0].hotel = req.params.hotelId;
        _day[0].save();
        console.log("one Hotel added to day:",req.params.dayNum);
      })
      .then(function(_day){
        res.sendStatus(200);
      })
      .then(null,next);
});

function addAttraction(_dayNum, _attraction, _attID){
Day.find({ number: _dayNum })
  .then(function(_day){
    if ( (_day[0][_attraction].indexOf(_attID) === -1) ){
    _day[0][_attraction].push(_attID);
    _day[0].save();
    console.log("one " + _attraction + " added to day:",_dayNum );
  }
    else{ console.log('duplicate :',_attraction); return; }
  })
  .then(function(_day){
    res.sendStatus(200);
  })
  .then(null,next);
}//end addAttraction

function deleteAttraction(_dayNum, _attraction, _attID){
Day.find({ number: _dayNum })
  .then(function(_day){
     var arrayPosition = _day[0][_attraction].indexOf(_attID);
    _day[0][_attraction].splice(arrayPosition, 1);
    _day[0].save();
    console.log("one " + _attraction + " deleted from day:",_dayNum );
  })
  .then(function(_day){
    res.sendStatus(200);
  })
  .then(null,next);
}//end addAttraction

///add a restaurant to a day
router.post('/days/:dayNum/restaurants/:restId', function(req, res, next){
    var _dayNum = req.params.dayNum;
    var _attraction = 'restaurants';
    var _attID = req.params.restId;
    addAttraction(_dayNum, _attraction, _attID);
});
///add an activity to a day
router.post('/days/:dayNum/activities/:activId', function(req, res, next){
    var _dayNum = req.params.dayNum;
    var _attraction = 'activities';
    var _attID = req.params.activId;
    addAttraction(_dayNum, _attraction, _attID);
});
///delete a restaurant from a day
router.delete('/days/:dayNum/restaurants/:restId', function(req, res, next){
  console.log("inside restaurants delete route");
    var _dayNum = req.params.dayNum;
    var _attraction = 'restaurants';
    var _attID = req.params.restId;
    deleteAttraction(_dayNum, _attraction, _attID);
});
///delete an activity from a day
router.delete('/days/:dayNum/activities/:activId', function(req, res, next){
  console.log("inside activities delete route");
    var _dayNum = req.params.dayNum;
    var _attraction = 'activities';
    var _attID = req.params.activId;
    deleteAttraction(_dayNum, _attraction, _attID);
});







module.exports = router;
