import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Signup =  () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Received values:', values);
    try {
      var response = await fetch("http://127.0.0.1:3500/api/_c/auth/signup", {
        method : "post",
        body : JSON.stringify({
          name : values.fullName,
          email : values.email,
          mobile : values.mobileNumber,
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
        navigate("/customer/signin")
      }
    } catch(err) {
      console.log(err)
    }
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
              <p className="mt-3 text-center">
              Already have an account?{' '}
              <Link to="/customer/signin" className="text-primary">
                Login here
              </Link>
            </p>
            </Form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
