import Map, {
  Marker,
  NavigationControl,
  Popup,
  useControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../hooks";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import MapPanel from "../components/custom/MapPanel";

export default function MapPage() {
  const accessToken =
    "pk.eyJ1IjoibGluaC10cmluaCIsImEiOiJjbDl3dThkYWswNDNiM25wajhrZXlneTE1In0.9GCUDxTX5FwtVbHDtXz5ew";
  const [selectionMarker, setSelectionMarker] = useState();
  const [feature, setFeature] = useState();
  const [metrics, setMetrics] = useState();
  const user = useUser();
  const map = useRef();

  const onMapLoad = useCallback(() => {
  }, []);

  function onMapClick(e) {
    if (e.features.some((f) => f.layer.id === "Parcel_Ownership")) {
      e.features.map((f) => f.layer.id === "Parcel_Ownership" ? setFeature(f) : setMetrics(f))
      setSelectionMarker(e.lngLat);
      map.current.flyTo({ center: e.lngLat, zoom: 18 });
    }
  }

  return (
    <Map
      mapStyle="mapbox://styles/linh-trinh/clb077v2a000g14s6ru966tjd"
      mapboxAccessToken={accessToken}
      initialViewState={{
        longitude: -75.168692,
        latitude: 39.948699,
        zoom: 11,
      }}
      ref={map}
      style={{ borderRadius: 10, height: "calc(100vh - 200px)" }}
      interactiveLayerIds={["Parcel_Ownership", "Block_Index_Composite"]}
      onLoad={onMapLoad}
      onClick={onMapClick}
    >
      <Geocoder accessToken={accessToken} mapboxgl={mapboxgl} />
      <NavigationControl />
      <MapPanel data={feature} metrics={metrics} />
      {selectionMarker && (
        <Marker
          longitude={selectionMarker.lng}
          latitude={selectionMarker.lat}
          color="#090"
        />
      )}
    </Map>
  );
}

function Geocoder(props) {
  useControl(() => new MapboxGeocoder(props));
  return null;
}
