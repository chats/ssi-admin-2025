import React from 'react';
import { Card, Form, Input, Button, Switch } from 'antd';

export const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Settings updated:', values);
  };

  return (
    <div>
      <h2>Settings</h2>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            notifications: true,
            twoFactor: false
          }}
        >
          <Form.Item label="Display Name" name="displayName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Email Notifications" name="notifications" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Two-Factor Authentication" name="twoFactor" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
