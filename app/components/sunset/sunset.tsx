"use client";

import { UserGlobalContext } from '@/app/context/global-context';
import { sunset } from '@/app/utils/icons';
import { UnixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Sunset() {
    const { forecast } = UserGlobalContext();
    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return (
            <Skeleton className='h-[12rem] w-full' />
        );
    }
    const timezone = forecast?.timezone;
    const sunsetTime = UnixToTime(forecast?.sys?.sunset, timezone);
    const sunriseTime = UnixToTime( forecast?.sys?.sunrise, timezone);
    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>{sunset}Sunset</h2>
                <p className='pt-4 text-2xl'>{sunsetTime}</p>
            </div>
            <p>Sunrise: {sunriseTime}</p>
        </div>
    );
}

export default Sunset;