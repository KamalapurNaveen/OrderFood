import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function EmailForm({onFinish}){
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded">
            <div className="mb-3">
                <h6>Please provide the email address.</h6>
            </div>
            <Form
                name="normal_login"
                className="login-form"
                onFinish = {onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your email !',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Send OTP
                    </Button>
                </Form.Item>
            </Form>
        </div>
      </div>
    )
}
            
function OTPForm({onFinish}){
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded">
            <div className="mb-3">
                <h6>Enter OTP sent to your email.</h6>
            </div>
            <Form
                name="normal_login"
                className="login-form"
                onFinish
            >
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter OTP !',
                    },
                    ]}
                >
                    <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="OTP" />
                </Form.Item>
                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Validate OTP
                    </Button>
                </Form.Item>
            </Form>
        </div>
      </div>
    )
}

function NewPasswordForm({onFinish}){
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded">
            <div className="mb-3">
                <h6>Set new password</h6>
            </div>
            <Form
                name="normal_login"
                className="login-form"
                onFinish
            >
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Enter new password !',
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter new password" />
                </Form.Item>
                <Form.Item
                    name="conformPassword"
                    rules={[
                    {
                        required: true,
                        message: 'Re enter password !',
                    },
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Re enter password" />
                </Form.Item>
                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Set New Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
      </div>
    )
}

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [hash, setHash] = useState(null)
    const [OTP, setOTP] = useState(null)
    const [email, setEmail] = useState(null)
    const [activeForm, setActiveForm ] = useState('email')

    const sendOTP = async (values) => {
        try{
            fetch(`http://localhost:3500/api/_c/auth/forgot_password_send_otp?email=${values.email}`,{credentials : 'include'})
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setHash(data)
                    setActiveForm('otp')
                }else{}
            })
        }catch(err){
            console.log(err)
        }
    };

    const verifyOTP = async (values) => {};
    const setPassword = async (values) => {};
    
    const FormElements = {
        'email' : <EmailForm onFinish={sendOTP}/>,
        'otp' : <OTP/>,
        'password' : <NewPasswordForm/>
    }

    let FormElement = FormElements[activeForm]
    
    return (
        <>
            {FormElement}
        </>
    );
};

export default ForgotPassword;
