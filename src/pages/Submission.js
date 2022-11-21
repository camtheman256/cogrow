import { Form, Input, Layout } from "antd";
import { useParams } from "react-router-dom";
import logo from "../assets/images/cogrow-logo.png";

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
      <h1>Submit a Design for Project {project}</h1>
      
      <form action="/my-handling-form-page" method="post">
  <ul>
    <li>
      <label for="name">Name:</label>
      <input type="text" id="name" name="user_name" />
    </li>
    <li>
      <label for="mail">E-mail:</label>
      <input type="email" id="mail" name="user_email" />
    </li>
    <li>
      <label for="msg">Message:</label>
      <textarea id="msg" name="user_message"></textarea>
    </li>
  </ul>
  
  <form action="/action_page.php">
  <input type="file" id="myFile" name="filename">
  <input type="submit">
</form>

</form>

    </Layout.Content>
  </Layout>
  }
  
