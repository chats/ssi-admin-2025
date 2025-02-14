import React, { useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import { useAuth } from 'oidc-react';
import { LoginOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const LoggedOut: React.FC = () => {
  const auth = useAuth();

  useEffect(() => {
    // Clear any remaining auth state
    auth.signOut();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <Card style={{ width: 350, textAlign: 'center' }}>
        <Title level={3}>Logged Out</Title>
        <Paragraph>
          You have been successfully logged out.
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
      </Card>
    </div>
  );
};