import Map, { Popup, useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../hooks";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

export default function MapPage() {
  const accessToken =
    "pk.eyJ1IjoibGluaC10cmluaCIsImEiOiJjbDl3dThkYWswNDNiM25wajhrZXlneTE1In0.9GCUDxTX5FwtVbHDtXz5ew";
  const [feature, setFeature] = useState(null);
  const user = useUser()
  const map = useRef();

  const onMapLoad = useCallback(() => {
  }, [])

  return (
    <>
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
        interactiveLayerIds={['Parcel_Ownership']}
        onLoad={onMapLoad}
      >
        <Geocoder accessToken={accessToken} mapboxgl={mapboxgl} />
      </Map>
    </>
  );
}

function Geocoder(props) {
  useControl(() => new MapboxGeocoder(props))
  return null;
}