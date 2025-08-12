import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api';

import '../../App.css';  // Import the CSS file

const center = { lat: 26.0667, lng: 50.5577 }; // Bahrain

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [markerPosition, setMarkerPosition] = useState(center);
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Autocomplete
        onLoad={ref => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          className="location-input"
        />
      </Autocomplete>

      <GoogleMap
        mapContainerClassName="map-container"
        center={markerPosition}
        zoom={13}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={(e) =>
            setMarkerPosition({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            })
          }
        />
      </GoogleMap>

      <p>
        Selected Location: {markerPosition.lat.toFixed(5)}, {markerPosition.lng.toFixed(5)}
      </p>
    </>
  );
}

export default MapComponent;
