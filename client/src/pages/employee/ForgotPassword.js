import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Form, Input,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/logo6.jpg'; 
function EmailForm({ onFinish }) {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.9' }}>
            <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded">
                <div className="mb-3">
                    <h6>Please provide the email address.</h6>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!',
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

function OTPForm({ onFinish }) {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.9' }}>
            <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded">
                <div className="mb-3">
                    <h6>Enter OTP sent to your email.</h6>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter OTP!',
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

function NewPasswordForm({ onFinish }) {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100 " style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.9' }}>
            <div className="col-md-6 col-lg-3 col-sm-11 card p-4 shadow rounded">
                <div className="mb-3">
                    <h6>Set new password</h6>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Enter new password!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter new password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Re-enter password!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Re-enter password" />
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
    const [activeForm, setActiveForm] = useState('email');
    const [hash, setHash] = useState(null)
    const [OTP, setOTP] = useState(null)
    const [email, setEmail] = useState(null)

    const sendOTP = async (values) => {
        try {
            const response = await fetch(`http://localhost:3500/api/_e/auth/forgot_password_send_otp?email=${values.email}`, { credentials: 'include' });
            const data = await response.json();
            if (data.success) {
                setEmail(values.email)
                setHash(data.hash)
                setActiveForm('otp');
                message.success(`OTP sent to ${values.email}`)
            } else {
                message.error(data.message);
                console.error(data.error); 
            }
        } catch (err) {
            console.error(err);
        }
    };

    const verifyOTP = async (values) => {
        try {
            const response = await fetch(`http://localhost:3500/api/_e/auth/forgot_password_verify_otp?email=${email}&otp=${values.otp}&hash=${hash}`, { credentials: 'include' });
            const data = await response.json();
            if (data.success) {
                setOTP(values.otp)
                setActiveForm('password');
                message.success('OTP Verified Successfully')
            } else {
                message.error(data.message)
                console.error(data.error); 
            }
        } catch (err) {
            console.error(err);
        }
    };

    const setPassword = async (values) => {
        try {
            console.log({ hash, email, otp : OTP, password : values.password })
            const response = await fetch(`http://localhost:3500/api/_e/auth/forgot_password_update`, {
                    method: "PUT",
                    body: JSON.stringify({ hash, email, otp : OTP, password : values.password }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
            const data = await response.json();
            if (data.success) {
                navigate('/employee/signin')
                message.success('Password Changed Successfully')
            } else {
                message.error(data.message)
                console.error(data.error); 
            }
        } catch (err) {
            console.error(err);
        }
    };

    const FormElements = {
        'email': <EmailForm onFinish={sendOTP} />,
        'otp': <OTPForm onFinish={verifyOTP} />,
        'password': <NewPasswordForm onFinish={setPassword} />
    };

    useEffect(() => {
        let FormElement = FormElements[activeForm];
    }, [activeForm]);

    return (
        <>
            {FormElements[activeForm]}
        </>
    );
};

export default ForgotPassword;
