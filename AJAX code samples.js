// add a day
{ number:1, hotel: "56e4844a3af2d10d686d02c5" , restaurants:["56e4844a3af2d10d686d02d4"], activities:["56e4844a3af2d10d686d02e4"]};

//get a day
$.ajax({
    method: 'GET',
    url: '/api/days',
    success: function (responseData) {
        console.log('yay');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
// get all hotels
$.ajax({
    method: 'GET',
    url: '/api/hotels',
    success: function (responseData) {
        console.log('yay');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
// create a day
$.ajax({
    method: 'POST',
    url: '/api/days/',
    success: function (responseData) {
        console.log('yay, a new day!');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
// find a day
$.ajax({
    method: 'GET',
    url: '/api/days/1',
    success: function (responseData) {
        console.log('yay, found day 1 !');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
// add a hotel to a day
$.ajax({
    method: 'POST',
    url: '/api/days/3/hotel/56e4844a3af2d10d686d02d0',
    success: function (responseData) {
        console.log('yay, added a hotel to a day!');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
/days/:dayNum/restaurants/:restId
// add a retaurant to a day
$.ajax({
    method: 'POST',
    url: '/api/days/3/restaurants/56e4844a3af2d10d686d02e0',
    success: function (responseData) {
        console.log('yay, added a restaurant to a day!');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
// delete a retaurant from a day
$.ajax({
    method: 'DELETE',
    url: '/api/days/3/restaurants/56e4844a3af2d10d686d02e0',
    success: function (responseData) {
        console.log('yay, deleted a restaurant to a day!');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
// add a attraction to a day
$.ajax({
    method: 'POST',
    url: '/api/days/3/activities/56e4844a3af2d10d686d02ea',
    success: function (responseData) {
        console.log('yay, added an activity to a day!');
    },
    error: function (errorObj) {
        console.log('fug');
    }
});
