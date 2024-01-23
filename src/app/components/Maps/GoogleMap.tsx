'use client';
import React from 'react';
import {
  GoogleMap as Map,
  useJsApiLoader,
  MarkerF,
  useLoadScript,
  OverlayView,
} from '@react-google-maps/api';
import Marker from '@/app/utils/vectors/Marker';

const GoogleMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });
  const location = { lat: 44.073952, lng: 15.27936 };
  return (
    <div className="googleMap">
      {isLoaded && (
        <Map
          center={location}
          zoom={21}
          mapContainerStyle={{
            minHeight: '500px',
            height: '100%',
            flex: '1 1 400px',
          }}
          mapTypeId="satellite"
        >
          <MarkerF position={location} />
        </Map>
      )}
    </div>
  );
};

export default GoogleMap;
