import React from 'react';
import { Layout, Menu, Button, Avatar, Modal } from 'antd';
import { UserOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from 'oidc-react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { AuthConfig } from '../config/env.config';

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Define menu items
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
    confirm({
      title: 'ยืนยันการออกจากระบบ',
      content: 'คุณต้องการออกจากระบบใช่หรือไม่?',
      okText: 'ใช่',
      cancelText: 'ไม่',
      onOk: async () => {
        try {
          // 1. สร้าง URL สำหรับ Keycloak end session endpoint
          const idToken = auth.userData?.id_token;
          const params = new URLSearchParams({
            id_token_hint: idToken || '',
            post_logout_redirect_uri: AuthConfig.postLogoutRedirectUri,
            client_id: AuthConfig.clientId,
            state: Math.random().toString(36).substring(7), // Random state parameter
          });

          // 2. เรียก end session endpoint ผ่าน window.location
          // เพื่อให้ browser จัดการ cookies และ session ให้ถูกต้อง
          window.location.href = `${AuthConfig.authority}protocol/openid-connect/logout?${params.toString()}`;

        } catch (error) {
          console.error('Logout error:', error);
          Modal.error({
            title: 'เกิดข้อผิดพลาด',
            content: 'ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง',
          });
        }
      },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#001529'  // Dark theme header
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          SSI Platform
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px' 
        }}>
          <span style={{ color: 'white' }}>
            {auth.userData?.profile.name}
          </span>
          <Avatar 
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout} 
            style={{ 
              color: 'white',
              //hover: { color: '#1890ff' }
            }}
          >
            Logout
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
          background: '#f5f5f5'  // Light gray background
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
    </Layout>
  );
};