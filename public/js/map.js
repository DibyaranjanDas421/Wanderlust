mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // map style
    center: listing.geometry.coordinates, // Use the coordinates directly
    zoom: 9 // starting zoom level
});

// Log the coordinates to ensure they're correct
console.log(listing.geometry.coordinates);

// Create a popup, but don't attach it to the map just yet
const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking!</p>`);

const marker = new mapboxgl.Marker({
    color: "red",
    draggable: true
})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup) // Set the popup to the marker
    .addTo(map);

// Add hover functionality to show the popup on hover
marker.getElement().addEventListener('mouseenter', () => {
    popup.addTo(map);
    popup.setLngLat(listing.geometry.coordinates); // Make sure the popup appears at the correct location
});

marker.getElement().addEventListener('mouseleave', () => {
    popup.remove(); // Remove the popup when not hovering
});
