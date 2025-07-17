import { TabsContent } from "@radix-ui/react-tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function FindRoutes() {
  return (
    <TabsContent value="routes" className="space-y-4">
      <div className="space-y-2">
        <Input placeholder="Starting point" />
        <Input placeholder="Destination" />
        <Button className="w-full">Find Route</Button>
      </div>
    </TabsContent>
  );
}
