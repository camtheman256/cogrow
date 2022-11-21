import { Layout } from "antd";
import { useParams } from "react-router-dom";
import logo from '../assets/images/cogrow-logo.png';

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
    </Layout.Content>
  </Layout>
  }
  </Layout>