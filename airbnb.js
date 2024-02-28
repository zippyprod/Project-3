function createMap(airbnblocations) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // Create the map, giving it the streetmap layer to display on load.
    let myMap = L.map("map", {
    center: [40.7128, -74.0060], // Coordinates of New York City
    zoom: 12,
    layers: [streetmap]
    });
    // Add the bike stations to the map as markers.
    airbnblocations.forEach(function(location) {
    L.marker([location.lat, location.lon])
    .bindPopup("<h3>" + location.name + "<h3><h3>Capacity: " + location.capacity + "</h3>")
    .addTo(myMap);
    });
    }
    // Parse the CSV file and call the createMap function with the parsed data.
    Papa.parse("bike_stations.csv", {
    header: true,
    download: true,
    complete: function(results) {
    // Convert the parsed data to an array of objects.
    let airbnblocations = results.data.map(function(location) {
    return {
    name: location.name,
    lat: parseFloat(location.lat),
    lon: parseFloat(location.lon),
    capacity: parseInt(location.capacity)
    };
    });
    // Call the createMap function with the parsed data.
    createMap(airbnblocations);
    }
    });
    