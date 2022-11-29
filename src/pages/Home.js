/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import ProjectCard from "../components/custom/ProjectCard";

function Home() {
  const project1 = {
    title: "CoGrow Project",
    subtitle: "Project Code: abcdef",
    status: "Ongoing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    numSubmissions: 37,
    creationDate: "3 days ago",
    learnMoreLink: "/",
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
  };

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col md={6}>
            <Card title="Filter Options">Card filter options can go here</Card>
          </Col>
          <Col md={18}>
            <Title>CoGrow Projects</Title>
            <Row gutter={[16, 16]}>
              <ProjectCard {...project1} />
              <ProjectCard {...project1} />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
