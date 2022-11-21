import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useParams } from "react-router-dom";
import logo from '../assets/images/cogrow-logo.png';

export default function SubmissionPage() {
  const { project } = useParams();
  return <Layout className="layout-dashboard">
    <Header>
      <div className="brand">
        <img src={logo} alt="" />
        <span>CoGrow</span>
      </div>
    </Header>
    <Content>
      <h1>Submit a Design for Project {project}</h1>
    </Content>
  </Layout>
}