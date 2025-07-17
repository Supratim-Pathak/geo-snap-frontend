import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FindRoutes from "./FindRoutes";
import FindPlaces from "./FindPlaces";

export default function Routetabs() {
  return (
    <Tabs defaultValue="location">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="routes">Find Route</TabsTrigger>
      </TabsList>
      <FindPlaces></FindPlaces>
      <FindRoutes></FindRoutes>
    </Tabs>
  );
}
