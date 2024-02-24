import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Logic for login goes here
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('loggedUser');
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
