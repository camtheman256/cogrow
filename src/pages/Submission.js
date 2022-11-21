import { Layout } from "antd";
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

        <form>
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" name="user_name" />
            </div>
            <div>
              <label for="mail">E-mail:</label>
              <input type="email" id="mail" name="user_email" />
            </div>
            <div>
              <label for="msg">Message:</label>
              <textarea id="msg" name="user_message"></textarea>
            </div>
        </form>
      </Layout.Content>
    </Layout>
  );
}
