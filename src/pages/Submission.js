import { Form, Input, Layout } from "antd";
import { useParams } from "react-router-dom";
import logo from "../assets/images/cogrow-logo.png";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

export default function SubmissionPage() {
  const { project } = useParams();
  return <Layout className="layout-dashboard">
    <Layout.Header>
      <div className="brand">
        <img src={logo} alt="" />
        <span>CoGrow</span>
      </div>
    </Layout.Header>
    <Layout.Content>
      <h1>Submit a Design for Project</h1>



   <form action="/my-handling-form-page" method="post">
  <br></br>
              <Form.Item
                  className="username"
                  name="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name!",
                    },
                  ]}
                >
                  <Input placeholder="Name" type="Name" />
                </Form.Item>
              
    
                 <Input.TextArea
                showCount
                maxLength={100}
                style={{
                height: 100,
               }}
               placeholder="Leave a Message"
                />

    <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </Space>

  <br></br>
  <br></br>
  <br></br>
  <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "10" }}
                  >
                    Submit
                  </Button>
                </Form.Item>

  
  </form>

    </Layout.Content>
  </Layout>
  }
  
