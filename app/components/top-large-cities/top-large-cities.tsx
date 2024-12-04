"use client";

import { UseGlobalContextUpdate } from '@/app/context/global-context';
import DefaultCities from '@/app/utils/default-cities';
import React from 'react'

function TopLargeCities() {
    const { setActiveCityCoords } = UseGlobalContextUpdate();

    const getSelectedCoords = (lat: number, lon: number) => {
        setActiveCityCoords([ lat, lon ]);
    }

    return (
        <div className="states flex flex-col gap-3 flex-1">
            <h2 className='flex items-center gap-2 font-medium'>Top Large Cities</h2>
            <div className='flex flex-col gap-4'>
                {
                    DefaultCities.map((city, index) => {
                        return (
                            <button 
                                key={index} 
                                className='border text-left rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none'
                                onClick={() => {
                                    getSelectedCoords(city.lat, city.lon);
                                }}
                            >
                                <p className='px-6 py-4'>{city.name}</p>
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default TopLargeCities;