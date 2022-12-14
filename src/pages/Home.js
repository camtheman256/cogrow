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

import {
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Slider,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import ProjectCard from "../components/custom/ProjectCard";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { ConsoleSqlOutlined } from "@ant-design/icons";

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
  const [sqftFilter, setSqftFilter] = useState();
  const [sqftRange, setSqftRange] = useState({ min: 0, max: 1 });
  const [searchVal, setSearchVal] = useState("");
  const [publicFilter, setPublicFilter] = useState(true);
  const [privateFilter, setPrivateFilter] = useState(true);

  useEffect(() => {
    return onSnapshot(projectsRef, (snapshot) => {
      const projects = snapshot.docs.map((d) => d.data());
      setProjectsData(projects);
      const sqftProjects = projects.map((d) => d.data.Area);
      const sqftFilterRange = {
        min: Math.floor(Math.min(...sqftProjects)),
        max: Math.ceil(Math.max(...sqftProjects)),
      };
      setSqftFilter([sqftFilterRange.min, sqftFilterRange.max]);
      setSqftRange(sqftFilterRange);
    });
  }, []);

  const constructStreetViewUrl = (address) =>
    encodeURI(
      `https://maps.googleapis.com/maps/api/streetview?location=${address}, Philadelphia, PA&size=600x500&key=AIzaSyDXJ0RymG8MZCgzjDAgskdoLOAKvkWTTEU`
    );

  const filteredProjects = projectsData
    .filter((p) =>
      searchVal
        ? p.data.ADDRESS.toLowerCase().includes(searchVal.toLowerCase())
        : true
    )
    .filter((p) =>
      sqftFilter
        ? sqftFilter[0] <= p.data.Area && p.data.Area <= sqftFilter[1]
        : true
    )
    .filter(
      (p) =>
        publicFilter || !["CITY", "PUBLIC_NONCITY"].includes(p.data.PUBLIC_PRI)
    )
    .filter((p) => privateFilter || p.data.PUBLIC_PRI !== "PRIVATE");

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col md={6}>
            <Card title="Filter Options">
              <Typography.Title level={5}>Address Search</Typography.Title>
              <Input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <Divider />
              <Typography.Title level={5}>Square Footage</Typography.Title>
              <Slider
                range
                min={sqftRange.min}
                max={sqftRange.max}
                value={sqftFilter}
                onChange={setSqftFilter}
              />
              <Divider />
              <Typography.Title level={5}>Ownership</Typography.Title>
              <Checkbox
                checked={privateFilter}
                onChange={(e) => setPrivateFilter(e.target.checked)}
              >
                Private
              </Checkbox>
              <Checkbox
                checked={publicFilter}
                onChange={(e) => setPublicFilter(e.target.checked)}
              >
                Public
              </Checkbox>
            </Card>
          </Col>
          <Col md={18}>
            <Title>CoGrow Projects</Title>
            <Row gutter={[16, 16]}>
              {filteredProjects.map((p, i) => (
                <ProjectCard
                  key={i}
                  title={p.data.ADDRESS}
                  creationDate={p.created.toDate().toLocaleString()}
                  status={p.status}
                  subtitle={`Parcel ${p.data.PARCELID}`}
                  learnMoreLink={`/submit/${p.data.PARCELID}`}
                  imageUrl={constructStreetViewUrl(p.data.ADDRESS)}
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
