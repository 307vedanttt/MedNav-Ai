export async function fetchRoute(startLat, startLon, endLat, endLon) {
  try {
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`);
    if (!response.ok) {
      throw new Error(`OSRM API error: ${response.status}`);
    }
    const data = await response.json();
    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      throw new Error("No route found");
    }

    // OSRM returns GeoJSON coordinates as [longitude, latitude]
    // Leaflet Polyline expects [latitude, longitude]
    const coordinates = data.routes[0].geometry.coordinates;
    return coordinates.map(coord => [coord[1], coord[0]]);
  } catch (error) {
    console.error("Failed to fetch route:", error);
    throw error;
  }
}
