import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FlyToLocation({ coords }:any) {
  const map = useMap();

  useEffect(() => {
    if (coords) { 
      map.flyTo(coords, map.getZoom(), {
        animate: true,
        duration: 2, 
      });
    }
  }, [coords, map]);

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MapUI({ coords , popupContent }:any) {
  return (
    <MapContainer center={coords} zoom={15} className="h-screen w-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToLocation coords={coords} />

      <Marker position={coords}>
        <Popup>{popupContent}</Popup>
      </Marker>
    </MapContainer>
  );
}
