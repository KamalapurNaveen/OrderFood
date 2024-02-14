import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="Page Not Found"
            extra={<Button type="primary" onClick={handleButtonClick}>Back Home</Button>}
        />
    );
};

export default ErrorPage;
