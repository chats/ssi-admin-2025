import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'oidc-react';
import { Spin } from 'antd';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();

  // แสดง loading state ขณะกำลังตรวจสอบสถานะการ authentication
  if (auth.isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f0f2f5'
      }}>
        <Spin>
          <div style={{ 
            padding: '50px', 
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.3)',
            minHeight: '200px',
            minWidth: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            Loading...
          </div>
        </Spin>
      </div>
    );
  }

  // ถ้ายังไม่ได้ login ให้ redirect ไปหน้า login
  if (!auth.userData) {
    return <Navigate to="/login" />;
  }

  // ถ้า login แล้วให้แสดง component ที่ต้องการ
  return <>{children}</>;
};