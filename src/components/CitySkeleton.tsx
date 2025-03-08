import { Skeleton } from "./ui/skeleton";

const CitySkeleton = () => {
  return (
    <div className="space-y-6">
      {/* For the Favourite Button */}
      <div className="flex items-center justify-end">
        <Skeleton className="h-[40px] w-[200px]" />
      </div>

      {/* For the main content */}
      <div className="grid gap-6">
        {/* Current Weather and Hourly Temperature section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <Skeleton className="h-[300px] w-full lg:w-[50%] rounded-lg" />
          <Skeleton className="h-[300px] w-full lg:w-[50%] rounded-lg" />
        </div>

        {/* Local Date Time, Weather Details and Weather Forecast */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-[250px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CitySkeleton;
