"use client";

import { UseGlobalContext } from '@/app/context/global-context';
import { droplets } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Humidity() {
    const { forecast } = UseGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
        return <Skeleton className='h-[12rem] w-full' />;
    }

    const { humidity } = forecast?.main;

    const humidityDesc = (humidity: number) => {
        if (humidity < 30) {
            return 'Dry: May cause skin irritation.';
        }
        if (humidity >= 30 && humidity < 50) {
            return 'Comfortable: Ideal for health and comfort.';
        }
        if (humidity >= 50 && humidity < 70) {
            return 'Moderate: Sticky, may cause allergens.';
        }
        if (humidity >= 70) {
            return 'High: Uncomfortable, mold growth risk';
        }
        return 'Unavailable: Humidity data not available';
    };

    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className='top'>
                <h2 className='flex items-center font-medium gap-2'>{droplets}Humidity</h2>
                <p className='pt-4 text-2xl'>{humidity}%</p>
            </div>
            <p className='text-sm'>{humidityDesc(humidity)}</p>
        </div>
    );
}

export default Humidity;