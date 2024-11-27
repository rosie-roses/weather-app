"use client";

import { UserGlobalContext } from '@/app/context/global-context';
import { partlySun, cloudy, drizzle, haze, mistFog, rain, snow, thunder, tornado, clearSky, hourglass } from '@/app/utils/icons';
import { KelvinToCelsius } from '@/app/utils/misc';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React from 'react';

function HourlyForecast() {
  const { forecast, fiveDayForecast } = UserGlobalContext();
  const { city, list } = fiveDayForecast;
  const { weather, timezone } = forecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  if (!forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const localDate = moment().utcOffset(timezone / 60).format('YYYY-MM-DD');
  const todayForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(localDate);
    }
  );

  const { main: weatherMain } = weather[0];

  const getWeatherIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzle;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      case 'Clear':
        return clearSky;
      case 'Clouds':
        return cloudy;
      case 'Thunderstorm':
        return thunder;
      case 'Mist':
        return mistFog;
      case 'Haze':
        return haze;
      case 'Tornado':
        return tornado;
      default:
        return partlySun;
    }
  };

  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm 
        dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className='flex items-center gap-2 font-medium'>{hourglass}Hourly Forecast</h2>
      <div className="h-full flex overflow-hidden mt-[-10px]">
        {todayForecast.length < 1 ? (
          <div>
            <h1 className="text-[3rem] line-through text-red-500">
              No data available
            </h1>
          </div>
        ) : (
          <div className="relative w-full">
            <Carousel className='flex'>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 shadow-md hover:bg-gray-700" />
              <CarouselContent className="my-0 mx-auto">
                {todayForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }, index: number) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="flex flex-col gap-y-2 basis-1/4 cursor-grab"
                      >
                        <p className="text-gray-300">
                          {moment(forecast.dt_txt).format('HH:mm')}
                        </p>
                        <p>{getWeatherIcon()}</p>
                        <p className="mt-1">
                          {KelvinToCelsius(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 shadow-md hover:bg-gray-700" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default HourlyForecast;