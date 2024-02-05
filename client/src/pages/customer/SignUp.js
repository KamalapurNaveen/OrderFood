import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

const Signup = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-4">
          <div className="card p-4 shadow">
            <h2 className="mb-4">Create an Account</h2>
            <Form onFinish={onFinish}>
              <Form.Item name="fullName" rules={[{ required: true, message: 'Please input your Full Name!' }]}>
                <Input placeholder="Full Name" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password placeholder="Password" autoComplete="new-password" />
              </Form.Item>
              <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please confirm your Password!' }]}>
                <Input.Password placeholder="Confirm Password" autoComplete="new-password" />
              </Form.Item>
              <Form.Item name="mobileNumber" rules={[{ required: true, message: 'Please input your Mobile Number!' }]}>
                <Input type="tel" placeholder="Mobile Number" />
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit" className="btn-success btn-block">
                  Create Account
                </Button>
              </Form.Item>
            </Form>
            <p className="mt-3">
              Already have an account?{' '}
              <Link to="/customer/signin" className="text-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
