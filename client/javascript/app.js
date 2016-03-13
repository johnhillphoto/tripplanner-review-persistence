$(function() {

  initialize_gmaps(function(map, marker){
    new Tripplanner([], map, marker, attractions);
    console.log(map);
  });
});
