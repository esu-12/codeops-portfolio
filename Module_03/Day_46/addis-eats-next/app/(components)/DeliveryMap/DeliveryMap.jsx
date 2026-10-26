// app/(components)/DeliveryMap/DeliveryMap.jsx
"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

const deliveryPoint = [9.0192, 38.7875];
const courierPoint = [9.023, 38.781];

const courierIcon = L.divIcon({
  className: "courier-map-icon",
  html: "🛵",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const deliveryIcon = L.divIcon({
  className: "delivery-map-icon",
  html: "📍",
  iconSize: [36, 36],
  iconAnchor: [18, 32],
});

export default function DeliveryMap() {
  return (
    <section aria-labelledby="delivery-map-heading">
      <h2 id="delivery-map-heading">Delivery Map</h2>

      <p>
        Demonstration locations only. The courier marker does not
        represent live GPS tracking.
      </p>

      <div style={{ height: 380, width: "100%" }}>
        <MapContainer
          center={deliveryPoint}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={courierPoint} icon={courierIcon}>
            <Popup>Demo courier location</Popup>
          </Marker>

          <Marker position={deliveryPoint} icon={deliveryIcon}>
            <Popup>Approximate delivery area</Popup>
          </Marker>

          <Polyline
            positions={[courierPoint, deliveryPoint]}
            dashArray="8 8"
          />
        </MapContainer>
      </div>

      <ul>
        <li>Courier: demonstration position near the delivery area.</li>
        <li>Destination: approximate position in the Kazanchis area.</li>
      </ul>
    </section>
  );
}