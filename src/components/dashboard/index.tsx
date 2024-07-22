import React from "react";
import { Row, Col, Card } from "antd";
import StakedGraph from "./tag_stacked_graph";

const DashboardIndex: React.FC = () => {
  return (
    <>
      <Row gutter={6}>
        <Col span={4}>
          <Card style={{ height: "100px" }}></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}></Card>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={8}>
          <Card style={{ height: "300px" }}></Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: "300px" }}></Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: "300px" }}></Card>
        </Col>
      </Row>
    </>
  );
};
export default DashboardIndex;
