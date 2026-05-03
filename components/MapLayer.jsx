"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// Helper component to center map when selecting a hospital or on load
function MapUpdater({
  center,
  zoom,
  trigger
}) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom || map.getZoom());
    }
  }, [center, map, zoom, trigger]);
  return null;
}

// Global Custom ambulance icon
// Global Custom ambulance icon
const ambulanceIcon = L.divIcon({
  className: 'bg-transparent border-none animated-ambulance',
  html: `<div class="relative flex items-center justify-center w-8 h-8 transition-all shadow-[0_5px_15px_rgba(255,0,0,0.5)] bg-white rounded flex-col border-2 border-error rotate-[-90deg]">
           <div class="absolute -top-1 w-3 h-1 bg-error rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,1)]"></div>
           <div class="absolute -top-1 w-3 h-1 bg-[#00e5ff] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,1)]" style="animation-delay: 0.5s;"></div>
           <span class="material-symbols-outlined text-error text-[18px]">airport_shuttle</span>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Custom icons using standard HTML/CSS for a modern look
const createCustomIcon = (isUser, isRecommended, isSelected) => {
  const bgColor = isUser ? "bg-primary" : isSelected ? "bg-tertiary" : "bg-surface-bright";
  const glow = isRecommended && !isUser ? "shadow-[0_0_15px_rgba(0,255,200,0.4)]" : isUser ? "shadow-[0_0_12px_rgba(0,229,255,0.5)]" : "shadow-md";
  const iconText = isUser ? "You" : "H";
  const textColor = isUser ? "text-on-primary" : "text-primary";
  const borderColor = isSelected ? "border-tertiary" : isRecommended ? "border-tertiary" : "border-outline-variant";

  // Custom marker for user location
  const userIcon = L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="relative flex items-center justify-center w-8 h-8">
             <div class="absolute inset-0 bg-primary/15 rounded-full"></div>
             <div class="w-4 h-4 bg-primary rounded-full border-2 border-surface-bright shadow-[0_0_12px_rgba(0,229,255,0.5)] z-10"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
  return isUser ? userIcon : L.divIcon({
    className: "custom-leaflet-icon bg-transparent border-none",
    html: `
      <div class="w-10 h-10 rounded-full ${bgColor} ${glow} border-2 ${borderColor} flex items-center justify-center font-bold text-xs tracking-wider backdrop-blur-md bg-opacity-80 transition-all ${isSelected ? 'scale-125 z-50' : 'scale-100'}">
        <span class="${textColor}">${iconText}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};
export default function MapLayer({
  userLocation,
  hospitals,
  selectedHospitalId,
  onHospitalSelect,
  recenterTrigger,
  activeRoute,
  onNavigate,
  isAmbulanceMode
}) {
  const defaultCenter = [40.7128, -74.0060]; // New York fallback if nothing is there
  const center = userLocation ? [userLocation.lat, userLocation.lon] : defaultCenter;
  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId);
  const activeCenter = selectedHospital ? [selectedHospital.lat, selectedHospital.lon] : center;

  // New tracking state for animation
  const [currentAmbulancePos, setCurrentAmbulancePos] = useState(null);
  useEffect(() => {
    let interval;
    if (isAmbulanceMode && activeRoute && activeRoute.length > 0) {
      // The ambulance route traces from hospital -> user.
      const ambulancePath = [...activeRoute].reverse();
      let stepIndex = 0;
      setCurrentAmbulancePos(ambulancePath[0]); // Start at hospital

      interval = setInterval(() => {
        stepIndex += Math.max(1, Math.floor(ambulancePath.length / 50)); // Scale speed based on path length for consistent arrival times
        if (stepIndex < ambulancePath.length) {
          setCurrentAmbulancePos(ambulancePath[stepIndex]);
        } else {
          setCurrentAmbulancePos(ambulancePath[ambulancePath.length - 1]); // Snap to final dest
          clearInterval(interval);
        }
      }, 500); // Trigger a transform tween every 500ms
    } else {
      setCurrentAmbulancePos(null);
    }
    return () => clearInterval(interval);
  }, [isAmbulanceMode, activeRoute]);
  return <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-outline-variant/15 z-0">
      <MapContainer center={center} zoom={userLocation ? 14 : 12} className="w-full h-full min-h-[400px] md:min-h-[600px] z-0" zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme OSM tiles
      />
        <ZoomControl position="bottomright" />
        <MapUpdater center={activeCenter} zoom={selectedHospital || isAmbulanceMode ? 16 : undefined} trigger={recenterTrigger} />
        
        {activeRoute && activeRoute.length > 0 && <>
            <Polyline positions={isAmbulanceMode ? [...activeRoute].reverse() : activeRoute} pathOptions={{
          color: isAmbulanceMode ? '#ff4081' : '#00e5ff',
          weight: 5,
          opacity: 0.9,
          dashArray: isAmbulanceMode ? '15, 15' : '10, 15',
          lineJoin: 'round'
        }} className="route-line" />
            {isAmbulanceMode && currentAmbulancePos && <Marker position={currentAmbulancePos} icon={ambulanceIcon} zIndexOffset={1000} />}
          </>}

        {userLocation && <Marker position={[userLocation.lat, userLocation.lon]} icon={createCustomIcon(true, false, false)}>
            <Popup className="custom-popup">
              <div className="font-headline font-bold text-lg">Your Location</div>
              <div className="text-sm opacity-70">GPS accurate to ~10m</div>
            </Popup>
          </Marker>}

        {hospitals.map(hospital => <Marker key={hospital.id} position={[hospital.lat, hospital.lon]} icon={createCustomIcon(false, !!hospital.recommended, selectedHospitalId === hospital.id)} eventHandlers={{
        click: () => onHospitalSelect(hospital.id)
      }}>
            <Popup className="custom-popup">
              <div className="flex flex-col gap-1 min-w-[200px]">
                {hospital.recommended && <span className="text-[10px] uppercase font-bold text-tertiary mb-1">Recommended</span>}
                <div className="font-headline font-bold text-gray-800 leading-tight">{hospital.name}</div>
                <div className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                  {hospital.address}
                </div>
                <div className="flex justify-between items-center mt-2 group">
                  <span className="text-xs font-bold text-gray-700">{hospital.specialization}</span>
                  {hospital.rating && <span className="text-xs text-secondary-container font-bold bg-secondary-container/10 px-2 py-0.5 rounded">★ {hospital.rating}</span>}
                </div>
                <button onClick={() => onNavigate ? onNavigate(hospital.id) : window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation?.lat}%2C${userLocation?.lon}%3B${hospital.lat}%2C${hospital.lon}`, '_blank')} className="mt-3 w-full py-1.5 rounded bg-primary text-white text-xs font-bold uppercase transition-colors hover:bg-primary/90">
                  Navigate
                </button>
              </div>
            </Popup>
          </Marker>)}
      </MapContainer>
      
      {/* Target Crosshair Decoration */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-12 h-12 border border-primary/20 rounded-full"></div>
        <div className="absolute w-[2px] h-3 bg-primary/20 top-[calc(50%-1.5rem)] left-1/2 -ml-[1px]"></div>
        <div className="absolute w-[2px] h-3 bg-primary/20 bottom-[calc(50%-1.5rem)] left-1/2 -ml-[1px]"></div>
        <div className="absolute h-[2px] w-3 bg-primary/20 left-[calc(50%-1.5rem)] top-1/2 -mt-[1px]"></div>
        <div className="absolute h-[2px] w-3 bg-primary/20 right-[calc(50%-1.5rem)] top-1/2 -mt-[1px]"></div>
      </div>
    </div>;
}
