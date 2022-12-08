import { InfoCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks";

export default function MapPanel({ dataEvent, metricsEvent, allProjects }) {
  return (
    <Card
      className="map-panel"
      title={
        <Typography.Title level={3}>
          {dataEvent ? "About this lot" : "Pick a lot on the map"}
        </Typography.Title>
      }
    >
      {dataEvent && metricsEvent && (
        <ParcelInfo
          parcelData={dataEvent.properties}
          parcelMetrics={metricsEvent.properties}
          exists={allProjects.includes(dataEvent.properties.PARCELID)}
        />
      )}
    </Card>
  );
}

function ParcelInfo({ parcelData, parcelMetrics, exists }) {
  const user = useUser();
  const docRef = doc(db, "projects", `${parcelData.PARCELID}`);
  const [qrOpen, setQrOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);

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
      <div className="parcel-info">
      <Statistic
          title="Block Group Equity Index"
          value={parcelMetrics.INDEX_}
          suffix={<InfoCircleFilled onClick={() => setIndexOpen(true)} />}
        />
         <Statistic
          title="Ownership"
          value={parcelData.PUBLIC_PRI !== "PRIVATE" ? "Public" : "Private"}
        />
        <Statistic
          title="Owner"
          value={parcelData.OWNER1}
        />
        <Statistic
          title="% Impervious Cover (ground and structures)"
          value={Math.min(parcelData.PERC_IMP, 100)}
          precision={2}
          suffix="%"
        />
         <Statistic
          title="Lot Area"
          value={parcelData.Area}
          precision={0}
          suffix="sf"
        />

       

      </div>
      <Modal
        visible={indexOpen}
        footer={null}
        title="About the Green Infrastructure Equity Index"
        onCancel={() => setIndexOpen(false)}
      >
        <Row gutter={[16, 16]}>
          <Col>
            <Statistic
              title="Environmental Need"
              value={parcelMetrics.I_ENVNEED}
            />
          </Col>
          <Col>
            <Statistic
              title="% Low Income"
              value={parcelMetrics.I_LOWINC}
            />
           
          </Col>
          <Col>
            <Statistic title="Amenities" value={parcelMetrics.I_AMENITIE} />
          </Col>
          <Col>
            <Statistic title="Tree Canopy" value={parcelMetrics.I_CANOPY} />
          </Col>
          <Col>
            <Statistic title="Parks Access" value={parcelMetrics.I_PARKS} />
          </Col>
          <Col>
            <Statistic title="Playground Access" value={parcelMetrics.I_PLAY} />
          </Col>
          These are only some of the sub-indices that make up the Green Infrastructure Equity Index Score. 
            All indices are compiled at the level of the Block Group.
            <br></br>
            <br></br>
            Source: PREACT 
        </Row>

      </Modal>
      <Divider />
      {exists ? (
        <>
          <p>
            There's already a project here.{" "}
            <Link to={`/submit/${parcelData.PARCELID}`}>Contribute!</Link>
          </p>
          <Button onClick={() => setQrOpen(true)}>QR Code</Button>
          <QRModal
            link={`https://www.mitcogrow.org/submit/${parcelData.PARCELID}`}
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
