import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const MapView = ({ inter, setInter }) => {
    const [coordinates, setCoordinates] = useState({ lat: 6.9271, lng: 79.8612 }); // Default center (Colombo)
    const [directions, setDirections] = useState(null); // State to store directions




    useEffect(() => {
        const getDirections = () => {
            if (!window.google || !window.google.maps) {
                console.error('Google Maps API not loaded');
                return;
            }

            const starts = { lat: 6.9271, lng: 79.8612 }; // Coordinates for Colombo
            const ends = { lat: 6.9518, lng: 79.9130 }; // Coordinates for Kelaniya

            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: starts,
                    destination: ends,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    console.log('Directions request result:', result);
                    console.log('Directions request status:', status);
                    if (status === 'OK') {
                        setDirections(result);
                    } else {
                        console.error('Directions request failed due to ' + status);
                    }
                }
            );
        };


        const checkGoogleMaps = () => {
            if (window.google && window.google.maps) {
                getDirections();
            } else {
                const intervalId = setInterval(() => {
                    if (window.google && window.google.maps) {
                        clearInterval(intervalId);
                        getDirections();
                    }
                }, 100);
            }
        };

        checkGoogleMaps();

        const refreshIntervalId = setInterval(() => {
            setInter(prev => prev + 1); // Update `inter` to trigger `useEffect`
        }, 60000); // Refresh every 60 seconds

        return () => clearInterval(refreshIntervalId);
    }, [setInter]);



    return (
        <div className='flex flex-row h-96 w-full'>
            <LoadScript googleMapsApiKey="AIzaSyDaMZ76C4PejyDzIP0b3aJg_KCm4KpUaaY">
                <GoogleMap
                    center={coordinates}
                    zoom={12}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                >
                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    strokeColor: '#FF0000',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 4,
                                },
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapView;
