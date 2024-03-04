import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';

const DropdownItems = ({ items }) => {
  const menuItems = (
    <Menu>
      {items.map(item => (
        <Menu.Item key={item._id}>
          {`${item.name} - ${item.quantity}`}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menuItems}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          Ordered Items
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownItems;
