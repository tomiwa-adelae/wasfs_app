"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix the default icon issue in Leaflet + Next.js
import L from "leaflet";
// Correctly override default icon config for Leaflet
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export function WASFSMap() {
	const position: [number, number] = [6.6219, 3.3769];

	return (
		<div className="h-[400px] w-full rounded-lg overflow-hidden">
			<MapContainer
				center={position}
				zoom={16}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						WASFS Location <br /> 51B, Agboola Ajumobi, Magodo GRA,
						Phase 2, Ikeja, Lagos State, Nigeria
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
