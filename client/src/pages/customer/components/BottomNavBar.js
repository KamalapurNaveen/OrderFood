import React from "react";
import { MenuOutlined, ShoppingCartOutlined, HistoryOutlined, WalletOutlined, UserOutlined } from "@ant-design/icons";
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
            <NavItem icon={<ShoppingCartOutlined style={{ fontSize: '22px' }} />} name="Cart" onClick={() => handleClick("Cart")} />
            <NavItem icon={<HistoryOutlined style={{ fontSize: '22px' }} />} name="History" onClick={() => handleClick("History")} />
            <NavItem icon={<WalletOutlined style={{ fontSize: '22px' }} />} name="Wallet" onClick={() => handleClick("Wallet")} />
            <NavItem icon={<UserOutlined style={{ fontSize: '22px' }} />} name="Profile" onClick={() => handleClick("Profile")} />
        </div>
    );
};

export default BottomNavBar;
