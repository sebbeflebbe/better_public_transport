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

        // Define an array of 30 random locations in Gothenburg
        const markers = [];
        const markerNames = [
          "Dracula's Castle",
          "The Witch's Hut",
          "Frankenstein's Lab",
          "The Ghostly Mansion",
          "The Haunted Cemetery",
          "The Abandoned Asylum",
          "The Cursed Woods",
          "The Dark Crypt",
          "The Phantom's Lair",
          "The Creepy Carnival",
          "The Spooky Swamp",
          "The Mysterious Manor",
          "The Shadowy Tower",
          "The Eerie Graveyard",
          "The Enchanted Forest",
          "The Sinister Street",
          "The Ghoul's Hideout",
          "The Grim Tombstone",
          "The Macabre Mansion",
          "The Ominous Observatory",
          "The Petrifying Pyramid",
          "The Uncanny Valley",
          "The Vampiric Village",
          "The Werewolf's Den",
          "The Zombie Apocalypse",
          "The Devil's Dungeon",
          "The Demonic Dimension",
          "The Ectoplasmic Estate",
          "The Phantom's Phenomenon",
          "The Raven's Nest",
        ];

        for (let i = 0; i < 30; i++) {
          const lat = location.lat + (Math.random() - 0.5) * 0.1;
          const lng = location.lng + (Math.random() - 0.5) * 0.1;
          markers.push(
            new window.google.maps.Marker({
              position: { lat, lng },
              map: map,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "purple",
                fillOpacity: 0.8,
                strokeColor: "white",
                strokeWeight: 1,
                scale: 10, // decrease the scale to make markers smaller
              },
              title: markerNames[i % markerNames.length], // add a unique name to each marker
            })
          );
        }
      };

      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=<YOUR_API_KEY>&libraries=places`;
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
