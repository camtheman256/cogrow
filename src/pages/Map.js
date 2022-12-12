import Map, {
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
  useControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../hooks";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import MapPanel from "../components/custom/MapPanel";
import { collection, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { Card, Typography } from "antd";

export default function MapPage() {
  const accessToken =
    "pk.eyJ1IjoibGluaC10cmluaCIsImEiOiJjbDl3dThkYWswNDNiM25wajhrZXlneTE1In0.9GCUDxTX5FwtVbHDtXz5ew";
  const [selectionMarker, setSelectionMarker] = useState();
  const [feature, setFeature] = useState();
  const [metrics, setMetrics] = useState();
  const [allProjects, setProjects] = useState([]);
  const [allProjectIds, setProjectIds] = useState([]);
  const user = useUser();
  const map = useRef();
  const mapStyle = "mapbox://styles/linh-trinh/clb077v2a000g14s6ru966tjd";
  const parcelLayer = "B_OWNERSHIP_geoloc";
  const metricsLayers = ["B_Index_Composite", "B_Index_Amenities"];

  const onMapLoad = useCallback(() => {
    console.log(map.current.getStyle())
    return onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjectIds(snapshot.docs.map((d) => parseInt(d.id)));
      setProjects(snapshot.docs.map((d) => d.data()));
    });
  }, []);

  function onMapClick(e) {
    if (e.features.length) {
      setFeature(e.features[0])
      setMetrics(map.current.queryRenderedFeatures(e.point, {layers: metricsLayers})[0])
      setSelectionMarker(e.lngLat);
      map.current.flyTo({ center: e.lngLat, zoom: 18 });
    }
  }

  return (
    <Map
      mapStyle={mapStyle}
      mapboxAccessToken={accessToken}
      initialViewState={{
        longitude: -75.168692,
        latitude: 39.948699,
        zoom: 11,
      }}
      ref={map}
      style={{ borderRadius: 10, height: "calc(100vh - 200px)" }}
      interactiveLayerIds={[parcelLayer]}
      onLoad={onMapLoad}
      onClick={onMapClick}
    >
      <Geocoder accessToken={accessToken} mapboxgl={mapboxgl} />
      <ProjectsLayer projects={allProjects} />
      <NavigationControl />
      <MapPanel
        dataEvent={feature}
        metricsEvent={metrics}
        allProjects={allProjectIds}
      />
      <LegendPanel />
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

function ProjectsLayer({ projects }) {
  return (
    <Source
      data={{
        type: "FeatureCollection",
        features: projects.map((p) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [p.data.Long, p.data.Lat],
          },
        })),
      }}
      type="geojson"
    >
      <Layer type={"circle"} paint={{ "circle-color": "#fcf403", "circle-radius": 10 }} />
    </Source>
  );
}

function LegendPanel() {
  return (
    <Card className="legend-panel">
      <Typography.Title level={4}>Legend</Typography.Title>
    </Card>
  );
}
