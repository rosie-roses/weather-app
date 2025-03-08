import CitySkeleton from "@/components/CitySkeleton";
import CurrentWeather from "@/components/CurrentWeather";
import DateTime from "@/components/DateTime";
import FavouriteButton from "@/components/FavouriteButton";
import HourlyTemperature from "@/components/HourlyTemperature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const City = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const locationQuery = useReverseGeoCodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const locName = locationQuery.data?.[0];

  const handleRefresh = () => {
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <CitySkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex flex-row gap-2 justify-end items-center">
          <FavouriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
            className="cursor-pointer"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                weatherQuery.isFetching ? "animate-spin" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-4">
            <DateTime timezone={forecastQuery.data?.city?.timezone} />
            <WeatherDetails data={weatherQuery.data} />
          </div>
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default City;
