import { Button, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import bg from "../assets/images/landing.jpg";

export default function Landing() {
  return (
    <Row
      style={{
        background: `linear-gradient(#00000044, #00000044), url('${bg}')`,
        minHeight: "75vh",
      }}
      justify={"center"}
      align={"middle"}
    >
      <Col>
        <Typography.Title style={{ color: "#fff", fontWeight: 700 }} level={1}>
          Welcome to CoGrow!
        </Typography.Title>
        <Row justify="center">
          <Space>
            <Link to="/projects">
              <Button>Let's Design</Button>
            </Link>
            <Link to="/map">
              <Button>Explore the Map</Button>
            </Link>
          </Space>
        </Row>
      </Col>
    </Row>
  );
}
