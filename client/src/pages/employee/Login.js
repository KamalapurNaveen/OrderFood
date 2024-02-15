import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import backgroundImage from '../assets/logo6.jpg'; // Import your background image

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:3500/api/_e/auth/login", {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        login('employee');
        message.success("Successfully logged in")
        navigate("/employee/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.65)'}}>
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
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Log in
            </Button>
            <a href="/employee/forgotpassword" style={{ marginLeft: '10px' }}>Forgot Password</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
