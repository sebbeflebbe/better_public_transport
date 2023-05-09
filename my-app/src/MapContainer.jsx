import React, { useState, useEffect } from "react";

function Map() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location) {
      const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: location,
          zoom: 15,
        });
        new window.google.maps.Marker({
          position: location,
          map: map,
        });
      };

      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=HERE_GOES_ENV&libraries=places`;
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          const map = new window.google.maps.Map(document.getElementById("map"), {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: 15,
          });
          new window.google.maps.Marker({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            map: map,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button onClick={handleFindMyLocation} style={{ marginBottom: "1rem" }}>Find My Location</button>
      <div id="map" style={{ height: "400px", width: "80%", margin: "auto" }}>
        {location ? (
          <p>
            Latitude: {location.lat}, Longitude: {location.lng}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Map;
