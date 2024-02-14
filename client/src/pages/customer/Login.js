import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import backgroundImage from '../loginLogo.jpg'; // Import your background image

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '90vh', margin:"30px" }}>
      <Card style={{ width: '90vw', maxWidth: '1000px', maxHeight: '500px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12}>
            <img src={backgroundImage} alt="Background" style={{ width: '100%', height: '90%', objectFit: 'cover' }} />
          </Col>
          <Col xs={24} sm={12} md={9} style={{marginLeft:"50px"}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
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
                  {"      \t\t"}Or <a href="/customer/signup"> {"\t\t"}<span>Register now!</span></a>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;
