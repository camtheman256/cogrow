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
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="user_name" />
    </div>
    <br></br>
    <div>
      <label for="msg">Message:</label>
      <textarea id="msg" name="user_message"></textarea>
    </div>
    <br></br>
    <div class="button">
  <button type="submit">Submit</button>
</div>

  
</form>

    </Layout.Content>
  </Layout>
  }
  
