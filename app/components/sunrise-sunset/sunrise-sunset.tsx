"use client";

import { UserGlobalContext } from '@/app/context/global-context';
import { sunrise, sunset } from '@/app/utils/icons';
import { UnixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React, { useState } from 'react';

function SunriseSunset() {
    const { forecast } = UserGlobalContext();
    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset || !forecast?.sys?.sunrise) {
        return (
            <Skeleton className='h-[12rem] w-full' />
        );
    }
    const timezone = forecast?.timezone;
    const sunsetTime = UnixToTime(forecast?.sys?.sunset, timezone);
    const sunriseTime = UnixToTime(forecast?.sys?.sunrise, timezone);
    const localTime = moment().utcOffset(timezone / 60).format("HH:mm:ss");
    const isPastSunrise = moment(localTime, "HH:mm:ss").isAfter(moment(sunriseTime, "HH:mm:ss"));
    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            {isPastSunrise ? (
                <>
                    <div className="top">
                        <h2 className='flex items-center gap-2 font-medium'>{sunset}Sunset</h2>
                        <p className='pt-4 text-2xl'>{sunsetTime}</p>
                    </div>
                    <p className="bottom">Sunrise: {sunriseTime}</p>
                </>
            ) : (
                <>
                    <div className="top">
                        <h2 className='flex items-center gap-2 font-medium'>{sunrise}Sunrise</h2>
                        <p className='pt-4 text-2xl'>{sunriseTime}</p>
                    </div>
                    <p className="bottom">Sunset: {sunsetTime}</p>
                </>
            )}
        </div>
    );
}

export default SunriseSunset;