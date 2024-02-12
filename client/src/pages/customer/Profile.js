import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Avatar, Button, Card } from 'antd';
import  { useAuth } from './../../AuthContext';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

export default function Profile(){
    const {logout} = useAuth();
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        name : '',
        mobile : '',
        _id : '',
        email : ''
    })

    React.useEffect(()=>{
        fetch('http://localhost:3500/api/_c/profile', {credentials : "include"})
        .then(resp => resp.json())
        .then(data => setInfo(data.info))
        .catch(error => console.log(error))
    },[])

    function customerLogout(){
        logout()
        navigate('/')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                hoverable
                style={{ width: 400, marginTop: 100 }}
                actions={[
                    <div><EditOutlined/> Change Password</div>,
                    <div onClick={() => customerLogout()}><LogoutOutlined/> Logout</div>,
                ]}
            >
                <Meta
                    avatar={<Avatar shape='square'>{info.name.charAt(0)}</Avatar>}
                    title={info.name}
                    description={
                        <>
                            <p>Email: {info.email}</p>
                            <p>Mobile: {info.mobile}</p>
                        </>
                    }
                />
            </Card>
        </div>
    );
}
