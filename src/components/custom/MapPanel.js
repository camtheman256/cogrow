import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Modal, Statistic, Typography } from "antd";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [qrOpen, setQrOpen] = useState(false);

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
      created: new Date(),
      status: "ongoing",
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
        <>
          <p>
            There's already a project here.
            <Link to={`/submit/${parcelData.PARCELID}`}>Contribute!</Link>
          </p>
          <Button onClick={() => setQrOpen(true)}>QR Code</Button>
          <QRModal
            link={`https://cogrow.vercel.app/submit/${parcelData.PARCELID}`}
            open={qrOpen}
            closeFunc={() => setQrOpen(false)}
          />
        </>
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

function QRModal({ link, open, closeFunc }) {
  return (
    <Modal
      visible={open}
      title="Project QR Code"
      footer={null}
      onCancel={closeFunc}
    >
      <img
        src={`https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=${link}`}
        alt="QR Code"
      />
    </Modal>
  );
}
