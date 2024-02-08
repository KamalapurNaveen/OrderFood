import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import logoImage from "../userLogo.png"
const Login = () => {
  const navigate = useNavigate();
  const {login} =useAuth();
  const onFinish = async (values) => {
    try {
      var response = await fetch("http://localhost:3500/api/_e/auth/login", {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      var data = await response.json()
      if(data.success) {
        login('employee')
        navigate("/employee/dashboard")
      }
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 ">
      <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded" >
      <div className="text-center mb-4">
          <img src={logoImage} alt="Logo" className="img-fluid"  />
        </div>
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
            {"\n"}
            {"      \t\t"}Or <a href="/customer/signup"> {"\t\t"}<span>Register now!</span></a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
