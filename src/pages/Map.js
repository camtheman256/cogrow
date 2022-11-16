import Map, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

export default function MapPage() {
  const accessToken =
    "pk.eyJ1IjoiY2tsZWltYW4xNSIsImEiOiJjazhseTJvcnMwOWdvM2hvOHE2ejk0ZHhoIn0.dp27-MIUTPYjRr-VLw1Rqg";
  const [popup, setPopup] = useState(null);

  function handleMapClick(e) {
    setPopup(e.lngLat);
    // query features here for metrics
  }

  return (
    <>
      <Map
        mapStyle={"mapbox://styles/ckleiman15/cl9w5emm8000b14p5c9xdkzu4"}
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
          </Popup>
        )}
      </Map>
    </>
  );
}
