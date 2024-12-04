"use client";

import { UseGlobalContext } from '@/app/context/global-context';
import { partlySun, cloudy, drizzle, haze, mistFog, navigation, rain, snow, thunder, tornado, clearSky } from '@/app/utils/icons';
import { KelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

function Temperature() {
    const { forecast } = UseGlobalContext();
    const { main, timezone, name, weather } = forecast;

    if (!forecast || !weather) {
        return (
            <Skeleton className='h-[12rem] w-full' />
        );
    }

    const temp = KelvinToCelsius(main?.temp);
    const tempMin = KelvinToCelsius(main?.temp_min);
    const tempMax = KelvinToCelsius(main?.temp_max);
    const [ localTime, setLocalTime ] = useState<string>("");
    const [ currDay, setCurrDay ] = useState<string>("");
    const { main: weatherMain, description } = weather[0];

    const getWeatherIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzle;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            case "Thunderstorm":
                return thunder;
            case "Mist":
                return mistFog;
            case "Haze":
                return haze;
            case "Tornado":
                return tornado;
            default:
                return partlySun;
        }
    }

    useEffect(() => {
        const updateTime = () => {
            const localMoment = moment().utcOffset(timezone / 60); 
            const formattedTime = localMoment.format("HH:mm:ss");
            const currDay = localMoment.format("dddd");
            setLocalTime(formattedTime);
            setCurrDay(currDay);
        };

        updateTime(); 
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [timezone]);
    return (
        <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <p className='flex justify-between items-center'>
                <span className='font-medium'>{currDay}</span>
                <span className='font-medium'>{localTime}</span>
            </p>
            <p className='pt-2 font-bold flex gap-1'>
                <span>{name}</span>
                <span>{navigation}</span>
            </p>
            <p className='py-10 text-9xl font-bold self-center'>{temp}&deg;</p>
            <div>
                <div>
                    <span>{getWeatherIcon()}</span>
                    <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
                </div>
                <p className='flex items-center gap-2'>
                    <span>Low: {tempMin}&deg;</span>
                    <span>High: {tempMax}&deg;</span>
                </p>
            </div>
        </div>
    );
}

export default Temperature;