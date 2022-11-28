import Map, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { useUser } from "../hooks";

export default function MapPage() {
  const accessToken =
    "pk.eyJ1IjoibGluaC10cmluaCIsImEiOiJjbDl3dThkYWswNDNiM25wajhrZXlneTE1In0.9GCUDxTX5FwtVbHDtXz5ew";
  const [popup, setPopup] = useState(null);
  const user = useUser()

  function handleMapClick(e) {
    setPopup(e.lngLat);
    // query features here for metrics
  }

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
        style={{ borderRadius: 10, height: "calc(100vh - 200px)" }}
        onClick={handleMapClick}
      >
        {popup && (
          <Popup longitude={popup.lng} latitude={popup.lat} closeOnClick={false} onClose={() => setPopup()}>
            <p>Create a Project at ({popup.lng.toFixed(5)}, {popup.lat.toFixed(5)})</p>
            {!user && <p><b>Please sign in before creating a project.</b></p>}
          </Popup>
        )}
      </Map>
    </>
  );
}
