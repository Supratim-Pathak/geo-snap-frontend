"use client";

import React from "react";
import { TabsContent } from "../ui/tabs";
import axiosInstance from "@/lib/axios";
import { ChevronsUpDown, Check } from "lucide-react";
import Directions from "../../../public/directions.png";
import type { Location } from "@/lib/types";
import type { Props } from "@/lib/types";
import { SaveToLocal } from "@/lib/utils";
export default function FindPlaces({ handelPlacePointer }: Props) {
  const [query, setQuery] = React.useState("");
  const [places, setPlaces] = React.useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] =
    React.useState<Location | null>(null);
  const [showOptions, setShowOptions] = React.useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      try {
        const response = await axiosInstance.get(`/places/${value}`);
        setPlaces(response.data);
        setShowOptions(true);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (location: Location) => {
    setSelectedLocation(location);
    setQuery(String(location.display_name));
    console.log("object");
    SaveToLocal(location)
    setShowOptions(false);
  };

  return (
    <TabsContent value="location" className="space-y-4">
      <div className="relative">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
          <input
            type="text"
            className="w-full outline-none text-sm"
            value={query}
            onChange={handleChange}
            onFocus={() => setShowOptions(true)}
            placeholder="Search location..."
          />
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </div>

        {showOptions && places.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border max-h-60 overflow-auto text-sm">
            {places.map((location) => (
              <div
                key={location.place_id}
                onClick={() => handleSelect(location)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-start gap-2"
              >
                <Check
                  className={`h-4 w-4 mt-1 ${
                    selectedLocation?.place_id === location.place_id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                <span className="break-words">{location.display_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLocation && (
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between border-2 p-2 rounded-full">
            <h3 className="font-semibold p-1">Place Information</h3>
            <div
              className="hover:bg-gray-500 rounded-full p-1 cursor-pointer"
              onClick={() => {
                handelPlacePointer({
                  popupContent: String(
                    selectedLocation.label || selectedLocation.display_name
                  ),
                  coords: [selectedLocation.lat, Number(selectedLocation.lon)],
                });
              }}
            >
              <img src={Directions} alt="" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Name</p>
              <p>{selectedLocation.label || selectedLocation.display_name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Coordinates</p>
              <p>
                {selectedLocation.lat}, {selectedLocation.lon}
              </p>{" "}
              {/* Replace with actual coordinates if available */}
            </div>
          </div>
          {/* <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Weather</div> */}
          <div className=""></div>
        </div>
      )}
    </TabsContent>
  );
}
