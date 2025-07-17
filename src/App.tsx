import "./App.css";

import "leaflet/dist/leaflet.css";
import Routetabs from "./components/Blocks/Routetabs";
import MapUI from "./components/Blocks/MapUI";
import { useState } from "react";
import map from "../public/map.png";
import placeholder from "../public/placeholder (1).png";
import Compasss from "../public/compass (1).png";
import History from "../public/history.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Route } from "./lib/types";

const App = () => {
  const [route, setRoute] = useState<Route>({
    popupContent: "text data",
    coords: [28.6139, 77.209],
  });

  const handelCurrentlocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (success) => {
        console.log(success);
        const lat = success.coords.latitude;
        const lng = success.coords.longitude;
        setRoute({
          popupContent: "Text",
          coords: [lat, lng],
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handelPlacePointer = (params: Route) => {
    console.log(params);
    const { popupContent, coords } = params;
    setRoute({
      popupContent: popupContent,
      coords: coords,
    });
  };
  return (
    <div className="relative w-full h-full">
      <Popover>
        <PopoverTrigger className="fixed top-[15%] left-[2%] bg-blue-600 text-white w-12 h-12 rounded-full text-xl shadow-lg flex items-center justify-center hover:bg-black-700 z-[1000]">
          <img src={map} alt="location logo" />
        </PopoverTrigger>
        <PopoverContent className="ml-5">
          <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full shadow-inner">
              <img src={placeholder} alt="location logo" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Geo Snap</h2>
              <p className="text-sm font-semibold text-gray-500">
                Navigate smartly
              </p>
            </div>
          </div>
          <Routetabs handelPlacePointer={handelPlacePointer}></Routetabs>
          <div className="">
            <div className="flex border-2 justify-between rounded-full p-2 my-3">
              <h3 className="text-sm font-semibold text-gray-600 py-2">
                Recent Searches
              </h3>
              <div>
                <img src={History} alt="" />
              </div>
            </div>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {[
                "Kolkata to Delhi",
                "Mumbai to Pune",
                "Bangalore to Hyderabad",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-md shadow-sm"
                >
                  <span className="text-sm text-gray-800 truncate">{item}</span>
                  <button className="text-gray-400 hover:text-red-500 text-sm">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>

      <img
        onClick={() => {
          handelCurrentlocation();
        }}
        className="fixed bottom-5 right-5 bg-blue-600 text-white w-12 h-12 rounded-full text-xl shadow-lg flex items-center justify-center hover:bg-black-700 z-[1000]"
        src={Compasss}
        alt="My location"
      />
      <MapUI {...route}></MapUI>
    </div>
  );
};

export default App;
