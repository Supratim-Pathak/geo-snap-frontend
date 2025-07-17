import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FindRoutes from "./FindRoutes";
import FindPlaces from "./FindPlaces";
import type { Props } from "@/lib/types";

export default function Routetabs({handelPlacePointer}: Props) {
  return (
    <Tabs defaultValue="location">
      <TabsList className="grid w-full grid-cols-2 rounded-full my-3">
        <TabsTrigger className="rounded-full" value="location">
          Location
        </TabsTrigger>
        <TabsTrigger className="rounded-full" value="routes">
          Find Route
        </TabsTrigger>
      </TabsList>
      <FindPlaces handelPlacePointer={handelPlacePointer}></FindPlaces>
      <FindRoutes></FindRoutes>
    </Tabs>
  );
}
