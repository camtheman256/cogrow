import { Form, Input, Layout } from "antd";
import { useParams } from "react-router-dom";
import logo from "../assets/images/cogrow-logo.png";

export default function SubmissionPage() {
  const { project } = useParams();
  return (
    <Layout className="layout-dashboard">
      <Layout.Header>
        <div className="brand">
          <img src={logo} alt="" />
          <span>CoGrow</span>
        </div>
      </Layout.Header>
      <Layout.Content>
        <h1>Submit a Design for Project {project}</h1>

        <Form>
            <Form.Item>
              <label for="name">Name:</label>
              <Input type="text" id="name" name="user_name" />
            </Form.Item>
            <Form.Item>
              <label for="mail">E-mail:</label>
              <Input type="email" id="mail" name="user_email" />
            </Form.Item>
            <Form.Item>
              <label for="msg">Message:</label>
              <Input.TextArea id="msg" name="user_message" />
            </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  );
}
