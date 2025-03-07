import { FavouriteButtonProps } from "@/api/types";
import { useFavourites } from "@/hooks/useFavourites";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon);

  const handleToggle = () => {
    if (isCurrentlyFavourite) {
      removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favourites`);
    } else {
      addFavourite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favourites`);
    }
  };
  return (
    <Button
      variant={isCurrentlyFavourite ? "default" : "outline"}
      size={"icon"}
      className={` cursor-pointer w-full p-4
        ${isCurrentlyFavourite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      `}
      onClick={handleToggle}
    >
      <Star
        className={`w-4 h-4 ${isCurrentlyFavourite ? "fill-current" : ""}`}
      />
      {isCurrentlyFavourite ? (
        <p>Remove from favourites</p>
      ) : (
        <p>Add to favourites</p>
      )}
    </Button>
  );
};

export default FavouriteButton;
