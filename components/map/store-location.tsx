/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useMemo, useState } from 'react';
import ReactMapGL, { GeolocateControl, Map, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { LocationStoreData } from '@/type';

const StoreLocation = ({ listStore }: { listStore: LocationStoreData[] }) => {
    return (
        <Map
            initialViewState={{
                longitude: 106.70025817254272,
                latitude: 10.783906898914676,
                zoom: 10,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1IjoiYXpxYzQ3IiwiYSI6ImNsc29kbXdpMjBlcGMya24xanp6bHZ5enMifQ.PYUxNjqZau-ce0MyJHY3vw"
        >
            {listStore?.map((location) => (
                <Marker key={location.lat} latitude={location.lat} longitude={location.lng}>
                    <div className="group">
                        <div className="group-hover:hidden relative z-0">
                            <MapPin size={36} color="#EA4234" fill="#EA4234" />
                            <span className="w-3 h-3 rounded-full bg-[#8f2f26] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                        </div>
                        <div className="bg-white  p-4 rounded-lg shadow-md w-60 group-hover:block hidden transition-all">
                            <div>
                                <h1 className="font-semibold text-base">{location.name}</h1>
                                <p>{location.addess}</p>
                            </div>
                            <img src={location.image} alt={location.name} className="w-full h-full z-50" />
                        </div>
                    </div>
                </Marker>
            ))}

            <NavigationControl position="bottom-right" />
            <GeolocateControl />
        </Map>
    );
};

export default StoreLocation;
