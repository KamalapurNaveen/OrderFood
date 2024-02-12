// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize isAuthenticated state based on localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    // Initialize userRole state based on localStorage
    return localStorage.getItem('userRole') || '';
  });

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userRole', userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    // Remove authentication data from localStorage upon logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    // Store isAuthenticated state in localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated);
    // Store userRole state in localStorage
    localStorage.setItem('userRole', userRole);
  }, [isAuthenticated, userRole]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
