import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, notification } from 'antd';
import { UserOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from 'oidc-react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { LogoutConfirmation } from '../components/LogoutConfirmation';
import { AuthConfig } from '../config/env.config';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    }
  ];

  const handleLogout = async () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      const idToken = auth.userData?.id_token;
      const params = new URLSearchParams({
        id_token_hint: idToken || '',
        post_logout_redirect_uri: AuthConfig.postLogoutRedirectUri,
        client_id: AuthConfig.clientId,
        state: Math.random().toString(36).substring(7),
      });

      window.location.href = `${AuthConfig.authority}protocol/openid-connect/logout?${params.toString()}`;
    } catch (error) {
      console.error('Logout error:', error);
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง',
      });
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        //background: '#001529',
        color: '#222',
        background: '#fefefe',
        borderBottom: '1px solid #f5f5f5'
      }}>
        <div style={{ 
          color: '#222', 
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          <img src="/images/RAMA-Primary-Logo-En-C.png" alt="logo" style={{ height: '60px'}} />
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px'
        }}>
          <span >
            {auth.userData?.profile.name}
          </span>
          <Avatar 
            icon={<UserOutlined />}
            style={{ backgroundColor: '#235255' }}
          />
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout} 
          >
            ออกจากระบบ
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider 
          width={200}
          style={{
            background: '#fff',
            borderRight: '1px solid #f0f0f0'
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ 
              height: '100%',
              borderRight: 0,
              paddingTop: '16px'
            }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ 
          padding: '24px',
          background: '#f5f5f5'
        }}>
          <Content style={{ 
            padding: 24, 
            margin: 0, 
            minHeight: 280,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {children}
          </Content>
        </Layout>
      </Layout>

      <LogoutConfirmation
        open={isLogoutModalOpen}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        loading={isLoggingOut}
      />
    </Layout>
  );
};

export default MainLayout;