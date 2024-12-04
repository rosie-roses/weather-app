"use client";

import { UseGlobalContext } from '@/app/context/global-context';
import { thermo } from '@/app/utils/icons';
import { KelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function FeelsLike() {
    const { forecast } = UseGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <Skeleton className='h-[12rem] w-full' />;
    }

    const { feels_like, temp_min, temp_max } = forecast?.main;

    const feelsLike = (feelsLike: number, minTemp: number, maxTemp: number) => {
        const avgTemp = (minTemp + maxTemp) / 2;
        if (feelsLike < avgTemp - 5) {
            return "Feels significantly colder than actual temperature.";
        } 
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return "Feels close to the actual temperature.";
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels significantly warmer than actual temperature.";
        }
        return "Temperature feeling is typical for this range."
    };

    const feelsLikeText = feelsLike(feels_like, temp_min, temp_max);

    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className='top'>
                <h2 className='flex items-center font-medium gap-2'>{thermo}Feels Like</h2>
                <p className='pt-4 text-2xl'>{KelvinToCelsius(feels_like)}&deg;</p>
            </div>
            <p className='text-sm'>{feelsLikeText}</p>
        </div>
    );
}

export default FeelsLike