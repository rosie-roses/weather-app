import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTemp = (temp: number) => {
  return `${Math.round(temp)}°`;
};

export const formatTime = (timestamp: number) => {
  return format(new Date(timestamp * 1000), "h:mm a");
};

export const getWindDirection = (degree: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index =
    Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;

  return directions[index];
};
