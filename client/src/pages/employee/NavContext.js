import React, { createContext, useContext, useState, useEffect } from 'react';
import Profile from './Profile';

import Menu from './Menu';

import BottomNavBar from './components/BottomNavBar';
import Scanner from './Scanner';
import Orders from './Orders';
import NavBar from './components/Navbar';

const NavContext = createContext();

export const EmployeeNavProvider = () => {
  const [activeTab, setActiveTab] = useState('scanner');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => { 
    const handleResize = () => {  
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const components = {
    scanner: <Scanner/>,
    menu: <Menu/>,
    orders: <Orders/>,
    profile : <Profile/>
  };

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{paddingBottom : "100px", minHeight: '100vh', backgroundColor: 'rgba(195, 195, 195, 0.33)'}}>  
        <NavBar/>
        {components[activeTab]}
        {windowWidth <= 990 && (
          <div style={{ position: "fixed", bottom: "0", width: "100%", backgroundColor: "white", borderTop: "1px solid grey", textAlign: "center" }}>
            <BottomNavBar/>
          </div>
        )}
      </div>
    </NavContext.Provider>
  );
};

export const useNav = () => {
  return useContext(NavContext);
};
