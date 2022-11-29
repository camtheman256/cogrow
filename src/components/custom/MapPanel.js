import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, List, Statistic, Typography } from "antd";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useUser } from "../../hooks";

export default function MapPanel({ dataEvent, metricsEvent }) {
  return (
    <Card
      className="map-panel"
      title={dataEvent ? "About this lot" : "Pick a lot on the map"}
    >
      {dataEvent && metricsEvent && (
        <ParcelInfo
          parcelData={dataEvent.properties}
          parcelMetrics={metricsEvent.properties}
        />
      )}
    </Card>
  );
}

function ParcelInfo({ parcelData, parcelMetrics }) {
  const user = useUser();
  const docRef = doc(db, "projects", `${parcelData.PARCELID}`);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setExists(doc.exists());
    });
    return unsubscribe;
  }, [docRef]);

  async function createProject() {
    await setDoc(docRef, {
      data: parcelData,
      metrics: parcelMetrics,
      owner: user.uid,
    });
  }

  return (
    <>
      <Typography.Title level={3}>{parcelData.ADDRESS}</Typography.Title>
      <Statistic
        title="% Impervious Cover (ground and structures)"
        value={Math.min(parcelData.PERC_IMP, 100)}
        precision={2}
        suffix="%"
      />
      <Statistic title="Ownership" value={parcelData.PUBLIC_PRI} />
      <Statistic
        title="Block Group Equity Index"
        value={parcelMetrics.INDEX_}
      />
      <Divider />
      {exists ? (
        <p>There's already a project here.</p>
      ) : user ? (
        <Button
          type={"primary"}
          icon={<PlusOutlined />}
          onClick={createProject}
        >
          Create a project here
        </Button>
      ) : (
        <p>Sign in first to create a project</p>
      )}
    </>
  );
}
