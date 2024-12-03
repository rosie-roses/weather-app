"use client";

import { UserGlobalContext } from '@/app/context/global-context';
import { eye } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Visibility() {
    const { forecast } = UserGlobalContext();

    if (!forecast || !forecast?.visibility) {
        return <Skeleton className='h-[12rem] w-full' />;
    }

    const { visibility } = forecast;

    const visibilityDesc = (visibility: number) => {
        const visibilityInKm = Math.round(visibility / 1000);
        if (visibilityInKm > 10) {
            return 'Excellent: Clear and vast view.';
        }
        if (visibilityInKm > 5) {
            return 'Good: Easily navigable.';
        }
        if (visibilityInKm > 2) {
            return 'Moderate: Some limitations.';
        }
        if (visibilityInKm <= 2) {
            return 'Poor: Restricted and unclear.';
        }
        return 'Unavailable: Visibility data not available.';
    };

    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className='top'>
                <h2 className='flex items-center font-medium gap-2'>{eye}Visibility</h2>
                <p className='pt-4 text-2xl'>{Math.round(visibility / 1000)} km</p>
            </div>
            <p className='text-sm'>{visibilityDesc(visibility)}</p>
        </div>
    );
}

export default Visibility;