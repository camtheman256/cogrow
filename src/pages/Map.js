import Map from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapPage() {
  const accessToken =
    "pk.eyJ1IjoiY2tsZWltYW4xNSIsImEiOiJjazhseTJvcnMwOWdvM2hvOHE2ejk0ZHhoIn0.dp27-MIUTPYjRr-VLw1Rqg";

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
        style={{borderRadius: 10}}
      />
    </>
  );
}
