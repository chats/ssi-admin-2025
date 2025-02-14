import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, KeyOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={112}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Keys"
              value={48}
              prefix={<KeyOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Verified Claims"
              value={93}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;