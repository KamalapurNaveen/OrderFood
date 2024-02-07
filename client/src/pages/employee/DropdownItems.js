import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    key: '1',
    label: '1st menu item'
  },
  {
    key: '2',
    label: '2st menu item'
  },
  {
    key: '3',
    label: '3st menu gdghjgdggs item'
  },

];
const DropdownItems = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
         Ordered Items
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default DropdownItems;