// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
// } else {
//     // Sorry! No Web Storage support..
// }

function checkTravelTime(travelTime, travelOrigin, travelDestination) {
    $.get( "http://40.83.187.34:81" + "/travel-time", {origin: localStorage.origin, destination: localStorage.destination}, function( data ) {
    // $.get( "COMMUTE_API" + "/travel-time", {origin: localStorage.origin, destination: localStorage.destination}, function( data ) {
        localStorage.origin = data.origin_address
        localStorage.destination = data.destination_address
        travelOrigin.text(localStorage.origin)
        travelDestination.text(localStorage.destination)
        travelTime.text(data.traffic_time_str)
        setTimeout(function(){ checkTravelTime(travelTime, travelLastUpdated); }, 300000)
    });
}

function placeAutocompleteList(inputElement, datalist) {
    $.get( "http://40.83.187.34:81" + "/place-autocomplete", {query: inputElement.val()} , function(data) {
    // $.get( "COMMUTE_API" + "/place-autocomplete", {query: inputElement.val()} , function(data) {
        datalist.html('');
        for (i=0; i<data.places.length; i++){
            datalist.append("<option value='" + data.places[i] + "'>" + inputElement.val() + "</option>");
        }
    });
}

$(document).ready(function() {
    var origin = $('#custom-origin');
    var destination = $('#custom-destination');
    var travelOrigin = $('#travel-origin');
    var travelDestination = $('#travel-destination');
    var travelTime = $('#travel-time');
    var go = $('#go');
    origin.keydown(function() {
        placeAutocompleteList(origin, $('#origin-datalist'));
    });
    destination.keydown(function() {
        placeAutocompleteList(destination, $('#destination-datalist'));
    });
    // init the values
    origin.val(localStorage.origin)
    destination.val(localStorage.destination)
    travelOrigin.text(localStorage.origin)
    travelDestination.text(localStorage.destination)
    go.click(function() {
         localStorage.origin = origin.val()
         localStorage.destination = destination.val()
         travelOrigin.text(localStorage.origin)
         travelDestination.text(localStorage.destination)
         document.location.hash = 'travel'
         checkTravelTime(travelTime, travelOrigin, travelDestination)
    });
});
