import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const icon=L.icon({iconUrl:"/marker-icon.png"})
function LocationMarker({ setPostion }) {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    position && setPostion(position);
  }, [position]);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker  position={position} icon={icon}>
      <Popup>You are here </Popup>
    </Marker>
  );
}

const Map = ({ setPostion }) => {
  return (
    <>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "40vh", width: "40vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setPostion={setPostion} />
      </MapContainer>
    </>
  );
};

export default Map;