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
import { useEffect, useState } from "react";
import ProjectCard from "../components/custom/ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const project1 = {
    title: "CoGrow Project",
    subtitle: "Project Code: abcdef",
    status: "Ongoing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    numSubmissions: 37,
    creationDate: "3 days ago",
    learnMoreLink: "/",
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
  };
  const projectsRef = collection(db, "projects");
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    getDocs(projectsRef).then((snapshot) =>
      setProjectsData(snapshot.docs.map((d) => d.data()))
    );
  }, [projectsRef]);

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
              {projectsData.map((p, i) => (
                <ProjectCard
                  key={i}
                  title={p.data.ADDRESS}
                  creationDate={p.created.toDate().toLocaleString()}
                  status={p.status}
                  subtitle={`Parcel ${p.data.PARCELID}`}
                  learnMoreLink={`/submit/${p.data.PARCELID}`}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
