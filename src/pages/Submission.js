import {
  Card,
  Col,
  Divider,
  Form,
  Grid,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import logo from "../assets/images/cogrow-logo.png";
import { ConsoleSqlOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ParcelInfo } from "../components/custom/MapPanel";

export default function SubmissionPage() {
  const { project } = useParams();
  const projectRef = doc(db, "projects", project);
  const history = useHistory();
  const [projectData, setProjectData] = useState();
  const [showForm, setShowForm] = useState(true);
  const galleryRef = collection(db, "projects", project, "submissions");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getDoc(projectRef).then(async (doc) => {
      if (doc.exists()) {
        setProjectData(doc.data());
        const unsubscribe = onSnapshot(galleryRef, (snapshot) => {
          setSubmissions(snapshot.docs.map((d) => d.data()));
        });
        return unsubscribe;
      } else {
        history.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className="layout-dashboard">
      <Layout.Header>
        <Link to="/" style={{color:"#000"}}>
          <div className="brand">
            <img src={logo} alt="" />
            <span>CoGrow</span>
          </div>
        </Link>
      </Layout.Header>
      {projectData ? (
        <Layout.Content>
          {showForm ? (
            <SubmissionForm
              project={project}
              projectData={projectData}
              collection={galleryRef}
              submittedFunc={() => setShowForm(false)}
            />
          ) : (
            <Button onClick={() => setShowForm(true)}>
              Submit your own design!
            </Button>
          )}
          <Divider />
          <Typography.Title level={1}>
            Gallery for Project {projectData.data.ADDRESS}
          </Typography.Title>
          <SubmissionGallery project={projectData} submissions={submissions} />
        </Layout.Content>
      ) : (
        <h1>Loading...</h1>
      )}
    </Layout>
  );
}

function SubmissionForm({ project, projectData, collection, submittedFunc }) {
  const [files, setFiles] = useState([]);

  async function handleSubmit(values) {
    if (!files.length) {
      message.error("Need to upload a design to submit.");
      return;
    }
    const file = files[0];
    const uploadRef = ref(storage, `${project}/${file.name}`);
    const upload = await uploadBytes(uploadRef, file.originFileObj);
    const submissions = collection;
    const result = await addDoc(submissions, {
      ...values,
      picture: await getDownloadURL(uploadRef),
      created: new Date(),
    });
    message.success("Design uploaded successfully!");
    submittedFunc();
  }
  return (
    <>
      <h1>Submit a Design for Project {projectData.data.ADDRESS}</h1>

      <Form onFinish={handleSubmit}>
        <br></br>
        <Form.Item
          className="username"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your design name!",
            },
          ]}
        >
          <Input placeholder="Name" type="Name" />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea
            style={{
              height: 100,
            }}
            placeholder="Add a description"
          />
        </Form.Item>

        <Form.Item>
          <Upload
            listType={"picture"}
            maxCount={1}
            accept="image/*"
            onChange={({ fileList }) => setFiles(fileList)}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload your design</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "10" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

function SubmissionGallery({ project, submissions }) {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} md={12}>
        <Card title="About this project">
          <ParcelInfo
            parcelData={project.data}
            parcelMetrics={project.metrics}
            showCreateProject={false}
          />
        </Card>
      </Col>
      {submissions.map((s, i) => (
        <Col lg={8} md={12} key={i}>
          <Card title={s.name} cover={<img src={s.picture} alt="Submission" />}>
            {s.description}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
