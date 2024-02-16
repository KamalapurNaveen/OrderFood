import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import logon from "../assets/logon.png";
import API_LINK from '../../util/api.link'
import backgroundImage from '../assets/logo6.jpg'
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm(); // Form hook to access form instance

  const onFinish = async (values) => {
    try {
      console.log(API_LINK)
      var response = await fetch(`${API_LINK}/api/_c/auth/login`, {
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
        message.success("Successfully loggedin")
        navigate("/customer")
        form.resetFields(); 
      }
      else{
        form.resetFields(); 
        message.error(data.message)
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
       <img src={logon} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }} width="100" />
      <Card style={{ width: '90vw', maxWidth: '400px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.65)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <Form
        form={form} // Provide the form instance to the Form component
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
        <Form.Item style={{ textAlign: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  , paddingTop:"20px"}}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: '10px' }}>
              Log in
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <a href="/customer/signup" style={{ marginRight: '10px' }}>Register now!</a>
              <div style={{ width: '1px', height: '12px', backgroundColor: 'black', margin: '0 10px' }}></div>
              <a href="/customer/forgotpassword" style={{ marginLeft: '10px' }}>Forgot Password</a>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default Login;
