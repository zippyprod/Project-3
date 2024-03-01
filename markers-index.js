// Initialize Leaflet map
let map = L.map("map").setView([40.73, -74.0059], 11); // New York City coordinates

// Create the tile layer that will be the background of our map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array to store marker objects
let markers = [];

/// Function to create markers and add them to the map
function createMarkers(data) {
    // Clear previous markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  
    // Iterate over each row of parsed data
    data.forEach(function(location) {
      // Extract latitude, longitude, name, price, and borough
      let latitude = parseFloat(location.latitude);
      let longitude = parseFloat(location.longitude);
      let name = location.name;
      let price = parseFloat(location.price);
      let num_of_beds = parseFloat(location.num_of_beds);
      let num_of_bathrooms = parseFloat(location.num_of_bathrooms);
      let borough = location.borough; // Extract borough information from data
  
      // Create a marker for each location and bind a popup
      let marker = L.marker([latitude, longitude])
        .bindPopup("<b>Name:</b> " + name + "<br><b>Price:</b> $" + price + "<br><b>Number of Beds:</b> " + num_of_beds + "<br><b>Number of Bathrooms:</b> " + num_of_bathrooms);
  
      // Add borough information to marker options
      marker.options.borough = borough;
  
      // Add the marker to the map
      marker.addTo(map);
  
      // Push marker to markers array
      markers.push(marker);
    });
  }
  

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', function(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(event) {
      let listings_sql = event.target.result;
      Papa.parse(listings_sql, {
        header: true,
        complete: function(results) {
          console.log("Parsed CSV data:", results.data);
          // Call function to create markers with parsed data
          createMarkers(results.data);
        },
        error: function(error) {
          console.error("Error parsing CSV:", error);
        }
      });
    };
    reader.readAsText(file);
  }
});

// Function to filter markers based on the selected options
function filterMarkers() {
    let selectedBorough = document.getElementById('boroughFilter').value;

    // Loop through all markers
    markers.forEach(function(marker) {
        // Access borough information from marker
        let borough = marker.options.borough;

        // Check if the marker should be displayed based on the selected options
        if (selectedBorough === 'all' || selectedBorough === borough) {
            // Show the marker if it matches the selected borough or if all boroughs are selected
            marker.addTo(map);
        } else {
            // Remove the marker if it does not match the selected borough
            map.removeLayer(marker);
        }
    });
}

// Event listener for borough filter dropdown
document.getElementById('boroughFilter').addEventListener('change', filterMarkers);

function priceFilter() {
  // Get the selected price from the dropdown
  let selectedPrice = parseFloat(document.getElementById('priceDropdown').value);

  // Loop through all markers
  markers.forEach(function(marker) {
      // Access price information from marker and convert to float
      let price = parseFloat(marker.options.price);

      // Check if the marker should be displayed based on the selected price range
      if ((selectedPrice === 0 && price < 50) ||
          (selectedPrice === 50 && price >= 50 && price < 100) ||
          (selectedPrice === 100 && price >= 100 && price < 200) ||
          (selectedPrice === 200 && price >= 200 && price < 300) ||
          (selectedPrice === 300 && price >= 300 && price < 500) ||
          (selectedPrice === 500 && price >= 500 && price < 1000) ||
          (selectedPrice === 1000 && price >= 1000 && price < 2000) ||
          (selectedPrice === 2000 && price >= 2000 && price < 3000) ||
          (selectedPrice === 3000 && price >= 3000 && price < 5000) ||
          (selectedPrice === 5000 && price >= 5000 && price < 10000) ||
          (selectedPrice === 10000 && price >= 10000 && price < 20000) ||
          (selectedPrice === 20000 && price >= 20000 && price < 50000) ||
          (selectedPrice === 50000 && price >= 50000 && price < 100000) ||
          (selectedPrice === 100000 && price >= 100000)) {
          // Show the marker if it falls within the selected price range
          if (!map.hasLayer(marker)) {
              marker.addTo(map);
          }
      } else {
          // Hide the marker if it does not match the selected price range
          if (map.hasLayer(marker)) {
              map.removeLayer(marker);
          }
      }
  });
}

// Event listener for price filter dropdown
document.getElementById('priceDropdown').addEventListener('change', priceFilter);

