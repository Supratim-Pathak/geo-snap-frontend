import "./App.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [route, setRoute] = useState({
    start: "Delhi",
    end: "Agra",
    startCoords: [28.6139, 77.209],
    endCoords: [27.1767, 78.0081],
  });

  const searchHistory = [
    "From: Delhi → To: Agra",
    "From: Kolkata → To: Mumbai",
    "From: Chennai → To: Bangalore",
  ];

  const handleGoClick = () => {
    alert(`Dummy route calculated from ${route.start} to ${route.end}`);
  };

  const startPoint = { lat: 18.076, lng: 73.8777 };
  const endPoint = { lat: 18.5204, lng: 73.8567 };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-40 left-3 bg-white p-5 rounded-xl w-72 shadow-lg z-[999]">
        <h2 className="mb-4 text-xl text-gray-800">Find Route</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Start location"
            value={route.start}
            onChange={(e) => setRoute({ ...route, start: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="End location"
            value={route.end}
            onChange={(e) => setRoute({ ...route, end: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleGoClick}
          className="w-full py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition"
        >
          Go
        </button>

        <h3 className="mt-5 mb-2 text-base font-semibold text-gray-700 border-b pb-1">
          Search History
        </h3>
        <ul className="text-sm space-y-1">
          {searchHistory.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-100 px-2 py-1 rounded border-l-4 border-blue-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="fixed bottom-5 right-5 bg-blue-600 text-white w-12 h-12 rounded-full text-xl shadow-lg flex items-center justify-center hover:bg-blue-700 z-[1000]"
        title="Go to current location"
      >
        📍
      </button>

      <MapContainer
        center={route.startCoords}
        zoom={6}
        className="h-screen w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Routing start={startPoint} end={endPoint} /> */}
        <Marker position={route.startCoords}>
          <Popup>Start: {route.start}</Popup>
        </Marker>

        <Marker position={route.endCoords}>
          <Popup>Destination: {route.end}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
