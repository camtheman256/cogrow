import { Card } from "antd";


export default function MapPanel({ data }) {

  return <Card className="map-panel" title={data ? "About this lot" : "Pick a lot on the map"}>
    
  </Card>
}