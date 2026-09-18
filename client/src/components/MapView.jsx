import React from "react";
import { MapContainer, TileLayer, Marker, Popup, DivIcon } from "react-leaflet";
import L from "leaflet";

const makeIcon = (status) =>
  L.divIcon({
    className: "",
    html: `<div class="gps-marker ${status === "at-risk" ? "at-risk" : ""}"></div>`,
    iconSize: [16, 16],
  });

const MapView = ({ animals }) => {
  const center = animals.length
    ? [animals[0].lastLocation.lat, animals[0].lastLocation.lng]
    : [0.5, 35.5];

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {animals.map((animal) => (
          <Marker
            key={animal._id}
            position={[animal.lastLocation.lat, animal.lastLocation.lng]}
            icon={makeIcon(animal.status)}
          >
            <Popup>
              <strong>{animal.name}</strong> ({animal.species})
              <br />
              Tag: {animal.tagId}
              <br />
              Status: {animal.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
