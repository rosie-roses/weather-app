import { WeatherDetailsProps } from "@/api/types";
import { categoriseUvIndex, formatTime, getWindDirection } from "@/lib/utils";
import {
  Compass,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  ThermometerSun,
  Trees,
  Waves,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useUvIndexQuery } from "@/hooks/useWeather";

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys, visibility } = data;
  const uvIndexQuery = useUvIndexQuery(data.coord);

  const uvIndex = uvIndexQuery.data?.value;
  const uvCategory = categoriseUvIndex(uvIndex);

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-purple-500",
    },
    {
      title: "Air Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-pink-500",
    },
    {
      title: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      icon: Eye,
      color: "text-yellow-500",
    },
    {
      title: "UV Index",
      value: uvCategory.description || "N/A",
      icon: ThermometerSun,
      color: "text-red-500",
    },
    {
      title: "Sea Level",
      value: `${main.sea_level} m`,
      icon: Waves,
      color: "text-teal-500",
    },
    {
      title: "Ground Level",
      value: `${main.grnd_level} m`,
      icon: Trees,
      color: "text-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div
                key={detail.title}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {detail.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
