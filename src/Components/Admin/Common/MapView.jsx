import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { getVehicleLocation } from "../../ApiService/api";

const MapView = ({ inter, setInter, registrationNo }) => {
    const [coordinates, setCoordinates] = useState(null);
    const [directions, setDirections] = useState(null);
    const [starts, setStarts] = useState(null);
    const [ends, setEnds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLocations = useCallback(async () => {
        try {
            const response = await getVehicleLocation(registrationNo);
            if (response && response.data.code === "00") {
                const data = response.data.content;
                const startCoordinates = { lat: data.startLatitude, lng: data.startLongitude };
                const endCoordinates = { lat: data.endLatitude, lng: data.endLongitude };
                setStarts(startCoordinates);
                setEnds(endCoordinates);
                setCoordinates(startCoordinates);
            } else {
                console.log("Error fetching data:", response);
            }
        } catch (e) {
            console.error("An error occurred:", e);
        } finally {
            setIsLoading(false);
        }
    }, [registrationNo]);

    const getDirections = useCallback(() => {
        if (!window.google || !window.google.maps) {
            console.error('Google Maps API not loaded');
            return;
        }

        if (!starts || !ends) {
            console.error('Start or end location not set');
            return;
        }

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
    }, [starts, ends]);

    useEffect(() => {
        fetchLocations();
        return () => {
            // Reset state when registrationNo changes
            setCoordinates(null);
            setStarts(null);
            setEnds(null);
            setDirections(null);
        };
    }, [fetchLocations, registrationNo]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchLocations();
            setInter(prev => prev + 1);
        }, 60000);

        return () => clearInterval(intervalId);
    }, [fetchLocations, setInter]);

    useEffect(() => {
        if (starts && ends) {
            getDirections();
        }
    }, [starts, ends, getDirections]);

    return (
        <div className='flex flex-row h-96 w-full'>
            {!isLoading && coordinates ? (
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
            ) : "Fetching Location/Not Found Location..."}
        </div>
    );
};

export default MapView;

