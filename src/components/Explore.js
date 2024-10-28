import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Explore = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [destination, setDestination] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const inputAnimation = useSpring({
    width: isFocused ? '80%' : '60%',
    config: { duration: 300 },
  });

  // Initialize Google Maps
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsMapLoaded(true);
        initializeMapServices();
      };

      document.head.appendChild(script);
    } else {
      setIsMapLoaded(true);
      initializeMapServices();
    }
  }, []);

  const initializeMapServices = () => {
    if (!map && window.google) {
      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
      
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 20.5937, lng: 78.9629 }, // Default center (India)
      });

      newDirectionsRenderer.setMap(mapInstance);
      setMap(mapInstance);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);
    }
  };

  const calculateRoute = () => {
    if (!directionsService || !directionsRenderer) {
      console.error('Directions service not initialized');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          console.log('Origin:', origin); // Debug log
          console.log('Destination:', destination); // Debug log

          const request = {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING
          };

          directionsService.route(request, (response, status) => {
            if (status === 'OK') {
              console.log('Route calculated successfully'); // Debug log
              directionsRenderer.setDirections(response);
            } else {
              console.error("Directions request failed:", status);
              alert("Could not calculate directions. Please check the destination and try again.");
            }
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Error getting your location. Please enable location services and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = (e) => {
    // Check for either Enter key press or button click
    if ((e.type === 'keypress' && e.key === 'Enter') || e.type === 'click') {
      if (destination) {
        setShowMap(true);
        // Add a small delay to ensure map is visible
        setTimeout(() => {
          calculateRoute();
        }, 100);
      }
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="explore-container">
      <h2>Where To?</h2>
      <div className="search-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <animated.input
          type="text"
          placeholder="Enter Destination"
          style={inputAnimation}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="explore-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onKeyPress={handleSearch}
        />
        <button 
          onClick={handleSearch}
          className="search-button"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
          }}
        >
          Search
        </button>
      </div>
      
      <div 
        id="map" 
        style={{
          display: showMap ? 'block' : 'none',
          height: '500px',
          width: '100%',
          marginTop: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  );
};

export default Explore;
