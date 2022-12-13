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
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { Card, Col, Col as div, Row, Typography } from "antd";

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
    console.log(map.current.getStyle());
    return onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjectIds(snapshot.docs.map((d) => parseInt(d.id)));
      setProjects(snapshot.docs.map((d) => d.data()));
    });
  }, []);

  function onMapClick(e) {
    if (e.features.length) {
      setFeature(e.features[0]);
      setMetrics(
        map.current.queryRenderedFeatures(e.point, { layers: metricsLayers })[0]
      );
      const parcelCenter = [
        e.features[0].properties.Long,
        e.features[0].properties.Lat,
      ];
      setSelectionMarker(parcelCenter);
      map.current.flyTo({ center: parcelCenter, zoom: 17 });
    }
  }

  return (
    <div>
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
        {selectionMarker && (
          <Marker
            longitude={selectionMarker[0]}
            latitude={selectionMarker[1]}
            color="#090"
          />
        )}
      </Map>
      <LegendPanel />
    </div>
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
      <Layer
        type={"circle"}
        paint={{ "circle-color": "#fcf403", "circle-radius": 10 }}
      />
    </Source>
  );
}

function LegendPanel() {
  const colors = [
    "hsla(0, 55%, 94%, 0.6)",
    "hsla(0, 100%, 95%, 0.8)",
    "hsla(0, 83%, 91%, 0.8)",
    "hsla(346, 68%, 56%, 0.35)",
    "hsla(346, 68%, 56%, 0.75)",
    "hsla(339, 100%, 35%, 0.9)",
    "hsla(314, 92%, 14%, 0.92)",
  ];

  const projectColors = [
    {
      title: "Completed",
      color: "hsla(31, 85%, 31%, 0.9)",
    },
    {
      title: "Under Construction",
      color: "hsla(42, 64%, 63%, 0.9)",
    },
    {
      title: "In Design",
      color: "hsla(192, 66%, 24%, 0.9)",
    },
    {
      title: "In Preparation",
      color: "hsla(189, 36%, 42%, 0.9)",
    },
  ];
  return (
    <Card className="legend-panel">
      <Row gutter={[24, 16]}>
        <Col>
          <Typography.Title level={4}>Equity Index Score</Typography.Title>
          <Row>
            <div>0&emsp;</div>
            {colors.map((c, i) => (
              <div
                style={{ backgroundColor: c, height: "30px", width: "30px" }}
                key={i}
              ></div>
            ))}
            <div>&emsp;9.2</div>
          </Row>
        </Col>
        <Col>
          <Typography.Title level={4}>
            Green Infrastructure Projects
          </Typography.Title>
          <Row gutter={15}>
            {projectColors.map((v, i) => (
              <Col>
                <div
                  style={{
                    backgroundColor: v.color,
                    borderRadius: "100%",
                    width: "15px",
                    height: "15px",
                    display: "inline-block",
                    marginInlineEnd: "5px",
                    verticalAlign: "middle",
                  }}
                  key={i}
                ></div>
                <span>{v.title}</span>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
