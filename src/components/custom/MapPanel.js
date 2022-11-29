import { Card, List, Statistic, Typography } from "antd";

export default function MapPanel({ data, metrics }) {
  return (
    <Card
      className="map-panel"
      title={data ? "About this lot" : "Pick a lot on the map"}
    >
      {data && (
        <>
          <Typography.Title level={3}>
            {data.properties.ADDRESS}
          </Typography.Title>
          <Statistic title="% Impervious Cover (ground and structures)" value={Math.min(data.properties.PERC_IMP, 100)} precision={2} suffix="%"  />
          <Statistic title="Ownership" value={data.properties.PUBLIC_PRI} />
          <Statistic title="Block Group Equity Index" value={metrics.properties.INDEX_} />
        </>
      )}
    </Card>
  );
}
