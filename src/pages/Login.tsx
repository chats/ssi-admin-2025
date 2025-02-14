import React from 'react';
import { Button, Card, Space, Typography, Spin } from 'antd';
import { useAuth } from 'oidc-react';
import { Navigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Login: React.FC = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (auth.userData) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card 
        style={{ 
          width: 400, 
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>SSI Platform</Title>
          <Paragraph>
            Welcome to SSI Platform. Please sign in to continue.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            icon={<LoginOutlined />}
            onClick={() => auth.signIn()}
            style={{ width: '100%', height: '40px' }}
          >
            Sign In with SSO
          </Button>
        </Space>
      </Card>
    </div>
  );
};