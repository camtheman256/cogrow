import { Form, Input, Layout, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import logo from "../assets/images/cogrow-logo.png";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function SubmissionPage() {
  const { project } = useParams();
  const history = useHistory();
  const projectRef = doc(db, "projects", project);
  const [projectData, setProjectData] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getDoc(projectRef).then((doc) => {
      if (doc.exists()) {
        setProjectData(doc.data());
      } else {
        history.push("/");
      }
    });
  }, [projectRef, history]);

  async function handleSubmit(values) {
    if (!files.length) {
      message.error("Need to upload a design to submit.");
      return;
    }
    const file = files[0];
    const uploadRef = ref(storage, `${project}/${file.name}`);
    const upload = await uploadBytes(uploadRef, file.originFileObj);
    const submissions = collection(db, "projects", project, "submissions");
    const result = await addDoc(submissions, {
      ...values,
      picture: await getDownloadURL(uploadRef),
    });
    message.success("Design uploaded successfully!");
  }

  return (
    <Layout className="layout-dashboard">
      <Layout.Header>
        <div className="brand">
          <img src={logo} alt="" />
          <span>CoGrow</span>
        </div>
      </Layout.Header>
      {projectData ? (
        <Layout.Content>
          <h1>Submit a Design for Project {projectData.data.ADDRESS}</h1>

          <Form onFinish={handleSubmit}>
            <br></br>
            <Form.Item
              className="username"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
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
        </Layout.Content>
      ) : (
        <h1>Loading...</h1>
      )}
    </Layout>
  );
}
