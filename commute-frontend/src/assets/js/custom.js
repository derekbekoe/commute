// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
// } else {
//     // Sorry! No Web Storage support..
// }

var Notify = window.Notify.default;

function showCommuteNotification(time_str) {
    console.log('Showing notification');
    new Notify('Commute', {
        body: 'Duration for your commute is '+time_str+'!'
    }).show();
}

if (Notify.needsPermission && Notify.isSupported()) {
    Notify.requestPermission(function() {
        console.log('Permission has been granted by the user');
    }, function() {
        console.warn('Permission has been denied by the user');
    });
}

function checkTravelTime(travelTime, travelOrigin, travelDestination) {
    $.get( "http://40.83.187.34:81" + "/travel-time", {origin: localStorage.origin, destination: localStorage.destination}, function( data ) {
    // $.get( "COMMUTE_API" + "/travel-time", {origin: localStorage.origin, destination: localStorage.destination}, function( data ) {
        localStorage.origin = data.origin_address
        localStorage.destination = data.destination_address
        travelOrigin.text(localStorage.origin)
        travelDestination.text(localStorage.destination)
        travelTime.text(data.traffic_time_str)
        traffic_mins = data.traffic_time_secs / 60
        if (traffic_mins > localStorage.notifyMe) {
            showCommuteNotification(data.traffic_time_str)
        }
        setTimeout(function(){ checkTravelTime(travelTime, travelLastUpdated); }, 300000)
    });
}

function placeAutocompleteList(inputElement, datalist) {
    $.get( "http://40.83.187.34:81" + "/place-autocomplete", {query: inputElement.val()} , function(data) {
    // $.get( "COMMUTE_API" + "/place-autocomplete", {query: inputElement.val()} , function(data) {
        datalist.html('');
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        for (i=0; i<data.places.length; i++){
            if (isFirefox) {
                datalist.append("<option value='" + data.places[i] + "'>" + "</option>");
            } else {
                datalist.append("<option value='" + data.places[i] + "'>" + inputElement.val() + "</option>");
            }
        }
    });
}

$(document).ready(function() {
    var origin = $('#custom-origin');
    var destination = $('#custom-destination');
    var notifyMe = $('#custom-notify-me');
    var travelOrigin = $('#travel-origin');
    var travelDestination = $('#travel-destination');
    var travelTime = $('#travel-time');
    var travelNotifyMe = $('#travel-notify-me');
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
    notifyMe.val(localStorage.notifyMe)
    travelOrigin.text(localStorage.origin)
    travelDestination.text(localStorage.destination)
    go.click(function() {
         localStorage.origin = origin.val()
         localStorage.destination = destination.val()
         localStorage.notifyMe = notifyMe.val()
         travelOrigin.text(localStorage.origin)
         travelDestination.text(localStorage.destination)
         travelNotifyMe.text('Notify if time exceeds '+localStorage.notifyMe+' minutes')
         document.location.hash = 'travel'
         checkTravelTime(travelTime, travelOrigin, travelDestination)
    });
});
