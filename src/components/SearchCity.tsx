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
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearchLocations } from "@/hooks/useWeather";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";

const SearchCity = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useSearchLocations(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, state, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      state,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

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

          {/* <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup> */}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="w-4 h-4" /> Clear
                  </Button>
                </div>

                {history.map((loc) => {
                  return (
                    <CommandItem
                      key={`${loc.lat}-${loc.lon}`}
                      value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.state}|${loc.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{loc.name},</span>
                      {loc.state && (
                        <span className="text-sm text-muted-foreground">
                          {loc.state},
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {loc.country}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(loc.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

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
                    value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.state}|${loc.country}`}
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
