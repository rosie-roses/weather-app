"use client";

import { UseGlobalContext } from '@/app/context/global-context';
import { users } from '@/app/utils/icons';
import { formatNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Population() {
    const { fiveDayForecast } = UseGlobalContext();
    const { city } = fiveDayForecast;

    if (!fiveDayForecast || !city) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className='top'>
                <h2 className='flex items-center gap-2 font-medium'>
                    {users} Population
                </h2>
                <p className='pt-4 text-2xl'>{formatNumber(city.population)}</p>
                <p className='pt-4 text-sm'>Latest UN population data for {city.name}, {city.country}.</p>
            </div>
        </div>
    );
}

export default Population;