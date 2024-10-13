import React from "react";
import { Row, Col, Card ,Statistic} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import DemoColumn from "./graph";

const DashboardIndex: React.FC = () => {
  return (
    <>
    <Row gutter={6}>
      <Col span={24}>
      </Col>
    </Row>
      <Row gutter={6}>
        <Col span={4}>
          <Card style={{ height: "100px" }}>
          <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}>   <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        /></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}> <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        /></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}> <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        /></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}><Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        /></Card>
        </Col>
        <Col span={4}>
          <Card style={{ height: "100px" }}><Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        /></Card>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={8}>
          <Card style={{ height: "300px" }}><DemoColumn/></Card>
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
