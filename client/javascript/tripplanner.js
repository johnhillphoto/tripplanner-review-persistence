/* globals $ */
function Tripplanner(days, map, marker, attractions){
  this.currentIdx = 0;
  this.days = days;
  this.map = map;
  this.marker = marker;
  this.attractions = attractions;
  this.mapper = new Mapper(map, marker);

  if(this.days.length === 0)
    this.addDay();
  this.days[this.currentIdx].Hotels.push(attractions.Hotels[0]._id);
  this.days[this.currentIdx].Restaurants.push(attractions.Restaurants[1]._id);

  this.renderDayPicker();
  this.init();
}

Tripplanner.prototype.addDay = function(){
  this.days.push({
    Hotels: [],
    Restaurants: [],
    Activities: []
  });
  return this.days.length - 1;
};

Tripplanner.prototype.renderDayPicker = function(){
  var dayPicker = $('#dayPicker');
  dayPicker.empty();
  this.days.forEach(function(day, index){
    var link = $('<a />').html(index + 1);
    var li = $('<li />').append(link);
    if(index === this.currentIdx)
      li.addClass('active');
    dayPicker.append(li);
  }, this);
  this.renderDay();
};
Tripplanner.prototype.currentDay = function(){
  return this.days[this.currentIdx];
};

Tripplanner.prototype.renderDay = function(){
  this.mapper.reset();
  $('#dayNumber').html(this.currentIdx + 1);
  var day = this.currentDay(); 
  ['Hotels', 'Restaurants', 'Activities'].forEach(function(category){
    $('#day' + category).empty();
  });

  var that = this;
  ['Hotels', 'Restaurants', 'Activities'].forEach(function(category){
    var ids = day[category];
    ids.forEach(function(id){
      var item = that.findItemByIdAndCategory(id, category);
      that.renderItem(item);
    });
  });
};

Tripplanner.prototype.renderItem = function(item){
  this.mapper.addMarker(item);
  var li = $('<li />').addClass('list-group-item');
  li.html(item.name);
  li.attr('data-id', item._id);
  li.attr('data-category', item.category);
  $('#day' + item.category).append(li);
};

Tripplanner.prototype.findItemByIdAndCategory = function(id, category){
  var collection = this.attractions[category];
  return collection.filter(function(item){
    return item._id === id;
  })[0];
};

Tripplanner.prototype.init = function(){
  var that = this;

  $('#dayPicker').on('click', 'li', function(){
    that.currentIdx = $(this).index();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    that.renderDay();
  });

  $('#addDay').click(function(){
    that.currentIdx = that.addDay();
    that.renderDayPicker();
  });

  $('#removeDay').click(function(){
    if(that.days.length == 1)
      return;
    that.days.splice(that.currentIdx, 1); 
    that.currentIdx = 0;
    that.renderDayPicker();
  });

  ['Hotels', 'Restaurants', 'Activities'].forEach(function(category){
    $('#day' + category).on('click', 'li', function(){
      var id = $(this).attr('data-id');
      var category = $(this).attr('data-category');
      var item = that.findItemByIdAndCategory(id, category);
      that.mapper.removeMarker(item);
      var idx = $(this).index();
      that.currentDay()[category].splice(idx, 1);
      $(this).remove();
    }); 
  });
  ['Hotels', 'Restaurants', 'Activities'].forEach(function(category){
    $('#add' + category).click(function(){
      var selectorId = $(this).attr('data-selector');
      var selector = $(selectorId);
      var id = selector.val();
      var category = selector.attr('data-category');
      var item = that.findItemByIdAndCategory(id, category); 
      that.currentDay()[category].push(item._id);
      that.renderItem(item);
    });
  });
};


