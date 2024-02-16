import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/logo6.jpg'
import API_LINK from '../../util/api.link'
import logon from "../assets/logon.png";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values:', values);
    try {
      const response = await fetch(`${API_LINK}/api/_c/auth/signup`, {
        method: "post",
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          mobile: values.mobileNumber,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        message.success("Successfully Registered");
        navigate("/customer/signin");
      }
      else{
         message.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={logon} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }} width="100" />
      <div style={{ width: '90%', maxWidth: '400px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.65)', borderRadius: '8px' }}>
        <h2 className="mb-4" style={{ textAlign: 'center' }}>Create an Account</h2>
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
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Create Account
            </Button>
          </Form.Item>
          <p className="mt-3 text-center">
            Already have an account?{' '}
            <Link to="/customer/signin" className="text-primary">
              Login here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
