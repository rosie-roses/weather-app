import Image from "next/image";
import AirPollution from "./components/air-pollution/air-pollution";
import DailyForecast from "./components/daily-forecast/daily-forecast";
import FeelsLike from "./components/feels-like/feels-like";
import Humidity from "./components/humidity/humidity";
import Mapbox from "./components/mapbox/mapbox";
import Navbar from "./components/navbar";
import Population from "./components/population/population";
import Pressure from "./components/pressure/pressure";
import SunriseSunset from "./components/sunrise-sunset/sunrise-sunset";
import Temperature from "./components/temperature/temperature";
import TopLargeCities from "./components/top-large-cities/top-large-cities";
import UVIndex from "./components/uv-index/uv-index";
import Visibility from "./components/visibility/visibility";
import Wind from "./components/wind/wind";
import FiveDayForecast from "./components/five-day-forecast/five-day-forecast";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <SunriseSunset />
            <Wind />
            <DailyForecast />
            <UVIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-container mt-4 flex gap-4">
            <Mapbox />
            <TopLargeCities />
          </div>
        </div>
      </div>
      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Made by <Image src={'/rose-logo.svg'} alt="logo" width={25} height={25} />
          <a href="https://github.com/rosie-roses/" target="_blank" className="text-red-500 font-bold">rosie-roses</a>
        </p>
      </footer>
    </main>
  );
}
