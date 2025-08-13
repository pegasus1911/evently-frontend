import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api';

import '../../App.css';

const center = { lat: 26.0667, lng: 50.5577 }; // Bahrain

function MapComponent({ initialPosition, onLocationChange }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });


  const [markerPosition, setMarkerPosition] = useState(
    initialPosition?.lat && initialPosition?.lng ? initialPosition : center
  );
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      const newPos = { lat: location.lat(), lng: location.lng() };
      setMarkerPosition(newPos);
      if (onLocationChange) {
        // Pass lat, lng, and locationName (address) back to parent
        onLocationChange({
          lat: newPos.lat,
          lng: newPos.lng,
          locationName: place.formatted_address || place.name || "",
        });
      }
    }
  };

  const handleMarkerDrag = (e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(newPos);
    if (onLocationChange) {
      onLocationChange({
        lat: newPos.lat,
        lng: newPos.lng,
        locationName: "", 
      });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input type="text" placeholder="Enter a location" className="location-input" />
      </Autocomplete>

      <GoogleMap
        mapContainerClassName="map-container"
        center={markerPosition}
        zoom={13}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        />
      </GoogleMap>

      <p>
        Selected Location: {markerPosition.lat.toFixed(5)}, {markerPosition.lng.toFixed(5)}
      </p>
    </>
  );
}

export default MapComponent;
