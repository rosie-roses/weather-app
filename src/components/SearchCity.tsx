import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Loader2, Search } from "lucide-react";
import { useSearchLocations } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";

const SearchCity = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: locations, isLoading } = useSearchLocations(query);
  const navigate = useNavigate();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    setOpen(false);
    navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 w-4 h-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Searches">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((loc) => {
                return (
                  <CommandItem
                    key={`${loc.lat}-${loc.lon}`}
                    value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    <span>{loc.name},</span>
                    {loc.state && (
                      <span className="text-sm text-muted-foreground">
                        {loc.state},
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {loc.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCity;
