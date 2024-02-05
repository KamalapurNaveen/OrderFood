import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      var response = await fetch("http://127.0.0.1:3500/api/_e/auth/login", {
        method : "post",
        body : JSON.stringify({
          email : values.email,
          password : values.password,
        }),
        headers :{
          "Content-Type" : "application/json"
        },
        credentials: 'include',
      }) 
      var data = await response.json()
      console.log(data)
      if(data.success) {
        navigate("/customer/dashboard")
      }
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 ">
      <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded" >
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
            Or <a href="/customer/signup">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
