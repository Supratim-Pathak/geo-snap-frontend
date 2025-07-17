import React from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface Location {
  place_id: React.Key | null | undefined;
  display_name: string | number | bigint | boolean | null | undefined;
}

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axiosInstance from "@/lib/axios";

export default function FindPlaces() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [place, setPlaces] = React.useState<any>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<any>(null);

  React.useEffect(() => {
    // const getPlaces = async () => {
    //   try {
    //     const response = await axiosInstance.get("/places/Kolkata");
    //     console.log("Fetched Places:", response.data);
    //     setPlaces(response.data);
    //   } catch (error) {
    //     console.error("Error fetching places:", error);
    //   }
    // };
    // getPlaces();
  }, []);

  const searchPlaces = (query: string) => {
    console.log("object", query);
    setTimeout(async () => {
      try {
        const response = await axiosInstance.get(`/places/${query}`);
        console.log("Fetched Places:", response.data);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    }, 2000);
  };

  return (
    <TabsContent value="location" className="space-y-4">
      <div className="space-y-2 relative z-[60]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value ? selectedLocation.display_name : "Search location..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full p-0"
            style={{
              position: "relative",
              width: "full",
              zIndex: 1000, // Very high z-index
            }}
            avoidCollisions={true}
            // collisionPadding={10}
          >
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  searchPlaces(target.value);
                }}
                placeholder="Search location..."
              />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {place?.map((location: Location) => (
                  <CommandItem
                    key={location.place_id}
                    value={String(location.display_name)}
                    onSelect={(currentValue) => {
                      console.log(currentValue === location.display_name);
                      setValue(
                        currentValue === location.display_name
                          ? currentValue
                          : ""
                      );
                      setSelectedLocation(location);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === location.display_name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {location.display_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedLocation && (
        <div className="rounded-lg border p-4 space-y-2">
          <h3 className="font-medium">Place Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Name</p>
              <p>{selectedLocation.label}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Coordinates</p>
              <p>40.7128° N, 74.0060° W</p>
            </div>
          </div>
        </div>
      )}
    </TabsContent>
  );
}
