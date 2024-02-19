import React from "react";
import { ScanOutlined,  MenuOutlined, HistoryOutlined, UserOutlined } from "@ant-design/icons";
import { useNav } from "../NavContext";

const NavItem = ({ icon, name, onClick }) => {
    return (
        <div style={{ textAlign: 'center', marginTop : '8px', cursor: "pointer" }} onClick={onClick}>
            {icon}
            <div style={{ fontSize: '12px' }}>{name}</div>
        </div>
    );
};

const BottomNavBar = () => {
    const { setActiveTab } = useNav()
    const handleClick = (name) => {
        setActiveTab(name.toLowerCase());
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
           
            <NavItem icon={<MenuOutlined style={{ fontSize: '22px' }} />} name="Menu" onClick={() => handleClick("Menu")} />
            <NavItem icon={<ScanOutlined style={{ fontSize: '22px' }} />} name="Scanner" onClick={() => handleClick("Scanner")} />
            <NavItem icon={<HistoryOutlined style={{ fontSize: '22px' }} />} name="Orders" onClick={() => handleClick("Orders")} />
            <NavItem icon={<UserOutlined style={{ fontSize: '22px' }} />} name="Profile" onClick={() => handleClick("Profile")} />
        </div>
    );
};

export default BottomNavBar;
