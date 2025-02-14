import React from 'react';
import { Modal } from 'antd';

interface LogoutModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const LogoutConfirmation: React.FC<LogoutModalProps> = ({
  open,
  onOk,
  onCancel,
  loading = false
}) => {
  return (
    <Modal
      title="ยืนยันการออกจากระบบ"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="ใช่"
      cancelText="ไม่"
      confirmLoading={loading}
    >
      <p>คุณต้องการออกจากระบบใช่หรือไม่?</p>
    </Modal>
  );
};