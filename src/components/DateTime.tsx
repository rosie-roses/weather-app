import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TimeProps } from "@/api/types";

const DateTime = ({ timezone }: TimeProps) => {
  const [localDate, setLocalDate] = useState<string>("");
  const [localTime, setLocalTime] = useState<string>("");
  const [amPm, setAmPm] = useState<string>("");
  const [timeZoneOffset, setTimeZoneOffset] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const localDateObj = new Date(currentDate.getTime() + timezone * 1000);

      const dateString = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(localDateObj);

      const timeString = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "UTC",
      }).format(localDateObj);

      const [time, amPmString] = timeString.split(" ");

      const totalOffsetMinutes = timezone / 60;
      const offsetHours = Math.floor(totalOffsetMinutes / 60);
      const offsetMinutes = Math.abs(totalOffsetMinutes % 60);

      const sign = offsetHours >= 0 ? "+" : "-";
      const formattedOffset = `GMT${sign}${String(
        Math.abs(offsetHours)
      ).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;

      setLocalDate(dateString);
      setLocalTime(time);
      setAmPm(amPmString);
      setTimeZoneOffset(formattedOffset);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Date Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full">
          <div className="text-lg mb-4 font-semibold">
            {localDate}{" "}
            <span className="text-sm text-muted-foreground">
              ({timeZoneOffset})
            </span>
          </div>
          <div className="flex items-center w-full space-x-4">
            <div className="flex-1 h-12 flex items-center justify-center border text-xl rounded-md">
              {localTime.split(":")[0]}
            </div>
            <span className="text-xl font-bold flex items-center justify-center">
              :
            </span>
            <div className="flex-1 h-12 flex items-center justify-center border text-xl rounded-md">
              {localTime.split(":")[1]}
            </div>
            <span className="text-xl font-bold flex items-center justify-center">
              :
            </span>
            <div className="flex-1 h-12 flex items-center justify-center border text-xl rounded-md">
              {localTime.split(":")[2]}
            </div>
            <div className="flex-1 h-12 flex items-center justify-center text-xl text-muted-foreground">
              {amPm}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateTime;
