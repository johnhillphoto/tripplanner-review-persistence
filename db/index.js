var Promise = require('bluebird');
var mongoose = require('mongoose');
var placeSchema = mongoose.Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number]
});

placeSchema.methods.sayHi = function(){
  return this.address;
};

var Place = mongoose.model('place', placeSchema);

var hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  num_stars: Number,
  amenities: String,
  place: placeSchema
});

var Hotel = mongoose.model('hotel', hotelSchema);

var restaurantSchema = mongoose.Schema({
  name: String,
  cuisine: String,
  price: Number,
  place: placeSchema
});

var Restaurant = mongoose.model('restaurant', restaurantSchema);

var activitySchema = mongoose.Schema({
  name: String,
  age_range: String,
  place: placeSchema
});

var Activity = mongoose.model('activity', activitySchema);

var daySchema = mongoose.Schema({
  number: Number,
  hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
  restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants'}],
  activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
});

var Day = mongoose.model('day', daySchema);

var models = {
  Hotel: Hotel,
  Place: Place,
  Restaurant: Restaurant,
  Activity: Activity,
  Day: Day
};

var _conn;

function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN, function(err){
      if(err)
        return reject(err);
      resolve(mongoose.connection);
    });
  });
  return _conn;
}

function disconnect(){
  return new Promise(function(resolve, reject){
    mongoose.disconnect(function(){
      _conn = null;
      resolve();
    });
  });
}

module.exports = {
  models: models,
  connect: connect,
  disconnect: disconnect
};
