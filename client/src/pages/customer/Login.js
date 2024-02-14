import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import backgroundImage from '../logo6.jpg'; // Import your background image

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      var response = await fetch("http://localhost:3500/api/_c/auth/login", {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      var data = await response.json()
      if (data.success) {
        login('customer')
        navigate("/customer")
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />
      <Card style={{ width: '90vw', maxWidth: '400px', padding: '20px' , backgroundColor: 'rgba(255, 255, 255, 0.65)'}}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span style={{ display: 'inline-block', margin: '0 10px' }}>Or</span>
            <a href="/customer/signup">Register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
