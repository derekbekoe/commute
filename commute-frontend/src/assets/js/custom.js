// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
// } else {
//     // Sorry! No Web Storage support..
// }

// TODO Set the Location of the API server dynamically...
function checkTravelTime(travelTime) {
    $.get( "http://40.83.187.34:81/travel-time", {origin: localStorage.origin, destination: localStorage.destination}, function( data ) {
        travelTime.text(data.traffic_time_str)
        setTimeout(function(){ checkTravelTime(travelTime, travelLastUpdated); }, 60000)
    });
}

$(document).ready(function() {
    var origin = $('#custom-origin');
    var destination = $('#custom-destination');
    var travelOrigin = $('#travel-origin');
    var travelDestination = $('#travel-destination');
    var travelTime = $('#travel-time');
    var go = $('#go');
    // init the values
    origin.val(localStorage.origin)
    destination.val(localStorage.destination)
    travelOrigin.text(localStorage.origin)
    travelDestination.text(localStorage.destination)
    go.click(function() {
         localStorage.origin = origin.val()
         localStorage.destination = destination.val()
         document.location.hash = 'travel'
         travelOrigin.text(localStorage.origin)
         travelDestination.text(localStorage.destination)
         checkTravelTime(travelTime)
    });
});
