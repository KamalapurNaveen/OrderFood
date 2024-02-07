import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, message } from 'antd';


const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    // Add more user details as needed
  });
  const [editMode, setEditMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditPassword = () => {
    setEditMode(true);
  };

  const handleSubmitPassword = (e) => {
   // e.preventDefault();
    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password must match.');
      return;
    }
    // Perform API call to change password
    // Reset form fields and exit edit mode
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setEditMode(false);
    message.success('Password changed successfully!');
  };

  return (
    <Row justify="center" style={{  }}>
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card title="User Profile">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add more user details here */}
          {!editMode ? (
            <Button type="primary" onClick={handleEditPassword}>Edit Password</Button>
          ) : (
            <Form layout="vertical" onFinish={handleSubmitPassword}>
              <Form.Item label="Current Password" name="currentPassword">
                <Input.Password value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </Form.Item>
              <Form.Item label="New Password" name="newPassword">
                <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Form.Item>
              <Form.Item label="Confirm New Password" name="confirmPassword">
                <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Save Password</Button>
                <Button onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>Cancel</Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
