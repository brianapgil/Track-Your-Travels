document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.005974, 40.712776], // Default location of New York City
      zoom: 12,
    });
  
   // Event listener for clicking on the map to automatically set the latitude and longitude for the location
    map.on("click", (e) => {
      const coordinates = e.lngLat;
      document.getElementById(
        "location"
      ).value = `${coordinates.lat}, ${coordinates.lng}`;
    });
  
    // Handle form submission
    const form = document.querySelector('form[action="/api/entries"]');
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const title = document.querySelector('input[name="title"]').value;
      const description = document.querySelector(
        'textarea[name="description"]'
      ).value;
      const location = document.querySelector('input[name="location"]').value;
  
      // Check if all fields are filled
      if (title && description && location) {
        try {
          // Send a POST request to the API with the form data
          const response = await fetch("/api/entries", {
            method: "POST",
            body: JSON.stringify({ title, description, location }),
            headers: { "Content-Type": "application/json" },
          });
  
          if (response.ok) {
            window.location.href = "/some-success-page"; 
          } else {
            alert("Failed to add entry.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while adding the entry.");
        }
      } else {
        alert("Please fill out all fields.");
      }
    });
  });
  