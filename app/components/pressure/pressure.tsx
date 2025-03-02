"use client";

import { UseGlobalContext } from '@/app/context/global-context';
import { gauge } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Pressure() {
    const { forecast } = UseGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return <Skeleton className='h-[12rem] w-full' />;
    }

    const { pressure } = forecast?.main;

    const pressureDesc = (pressure: number) => {
        if (pressure < 1000) {
            return 'Very low pressure.';
        }
        if (pressure >= 1000 && pressure < 1015) {
            return 'Low pressure. Expect weather changes.';
        }
        if (pressure >= 1015 && pressure < 1025) {
            return 'Normal pressure. Expect weather changes.';
        }
        if (pressure >= 1025 && pressure < 1040) {
            return 'High pressure. Expect weather changes.';
        }
        if (pressure >= 1040) {
            return 'Very high pressure. Expect weather changes.';
        }
        return 'Unavailable: Pressure data not available.';
    };

    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className='top'>
                <h2 className='flex items-center font-medium gap-2'>{gauge}Pressure</h2>
                <p className='pt-4 text-2xl'>{pressure} hPa</p>
            </div>
            <p className='text-sm'>{pressureDesc(pressure)}</p>
        </div>
    );
}

export default Pressure;