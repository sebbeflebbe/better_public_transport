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
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Map;
