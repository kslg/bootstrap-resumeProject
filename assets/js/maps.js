function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 46.619261, lng: -33.134766 },
    });
    // Create an array of alphabetical characters used to label the markers.
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var locations = [
        { lat: 51.5536859, lng: 0.0055729 },
        { lat: 51.5619684, lng: -0.0127058 },
        { lat: 51.5371583, lng: 0.0212711 },
    ];

    // Add some markers to the map.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels [i % labels.length]
        });
    });
    // Add a marker clusterer to manage the markers.
    var markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}