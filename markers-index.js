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

// Dropdown menu options for price intervals
let priceIntervals = [
  { label: "Less than $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "$2,000 - $3,000", min: 2000, max: 3000 },
  { label: "$3,000 - $5,000", min: 3000, max: 5000 },
  { label: "$5,000 - $10,000", min: 5000, max: 10000 },
  { label: "$10,000 - $20,000", min: 10000, max: 20000 },
  { label: "$20,000 - $50,000", min: 20000, max: 50000 },
  { label: "$50,000 - $100,000", min: 50000, max: 100000 },
  { label: "More than $100,000", min: 100000, max: Infinity }
];


// Initialize dropdown menu for price intervals
let priceDropdown = document.getElementById('priceDropdown');
// priceIntervals.forEach(function(interval) {
//     let option = document.createElement('option');
//     option.value = interval.label;
//     option.textContent = interval.label;
//     priceDropdown.appendChild(option);
// });

// Event listener for price range dropdown change
priceDropdown.addEventListener('change', filterMarkersByPrice);

// Function to filter markers based on the selected price range
function filterMarkersByPrice() {
    let selectedInterval = priceIntervals.find(interval => interval.label === priceDropdown.value);
    let minPrice = selectedInterval.min;
    let maxPrice = selectedInterval.max;

    // Loop through all markers
    markers.forEach(function(marker) {
        let price = parseFloat(marker.options.price);

        // Check if the marker price falls within the selected range
        if (price >= minPrice && price <= maxPrice) {
            // Show the marker if it falls within the selected range
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
        } else {
            // Remove the marker if it falls outside the selected range
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
}


// Event listener for price range dropdown change
// priceDropdown.addEventListener('change', filterMarkersByPrice);

// // Initialize Leaflet map
// let map = L.map("map").setView([40.73, -74.0059], 11); // New York City coordinates

// // Create the tile layer that will be the background of our map
// let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// // Array to store marker objects
// let markers = [];

// /// Function to create markers and add them to the map
// function createMarkers(data) {
//     // Clear previous markers
//     markers.forEach(marker => map.removeLayer(marker));
//     markers = [];
  
//     // Iterate over each row of parsed data
//     data.forEach(function(location) {
//       // Extract latitude, longitude, name, price, and borough
//       let latitude = parseFloat(location.latitude);
//       let longitude = parseFloat(location.longitude);
//       let name = location.name;
//       let price = parseFloat(location.price);
//       let num_of_beds = parseFloat(location.num_of_beds);
//       let num_of_bathrooms = parseFloat(location.num_of_bathrooms);
//       let borough = location.borough; // Extract borough information from data
  
//       // Create a marker for each location and bind a popup
//       let marker = L.marker([latitude, longitude])
//         .bindPopup("<b>Name:</b> " + name + "<br><b>Price:</b> $" + price + "<br><b>Number of Beds:</b> " + num_of_beds + "<br><b>Number of Bathrooms:</b> " + num_of_bathrooms);
  
//       // Add borough information to marker options
//       marker.options.borough = borough;
  
//       // Add the marker to the map
//       marker.addTo(map);
  
//       // Push marker to markers array
//       markers.push(marker);
//     });
//   }
  

// // Event listener for file input change
// document.getElementById('fileInput').addEventListener('change', function(event) {
//   let file = event.target.files[0];
//   if (file) {
//     let reader = new FileReader();
//     reader.onload = function(event) {
//       let listings_sql = event.target.result;
//       Papa.parse(listings_sql, {
//         header: true,
//         complete: function(results) {
//           console.log("Parsed CSV data:", results.data);
//           // Call function to create markers with parsed data
//           createMarkers(results.data);
//         },
//         error: function(error) {
//           console.error("Error parsing CSV:", error);
//         }
//       });
//     };
//     reader.readAsText(file);
//   }
// });

// // Function to filter markers based on the selected options
// function filterMarkers() {
//     let selectedBorough = document.getElementById('boroughFilter').value;

//     // Loop through all markers
//     markers.forEach(function(marker) {
//         // Access borough information from marker
//         let borough = marker.options.borough;

//         // Check if the marker should be displayed based on the selected options
//         if (selectedBorough === 'all' || selectedBorough === borough) {
//             // Show the marker if it matches the selected borough or if all boroughs are selected
//             marker.addTo(map);
//         } else {
//             // Remove the marker if it does not match the selected borough
//             map.removeLayer(marker);
//         }
//     });
// }

// // Event listener for borough filter dropdown
// document.getElementById('boroughFilter').addEventListener('change', filterMarkers);


