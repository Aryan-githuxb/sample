import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Logic: When the app loads, check if there is a token in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser({ username: storedUser, token: storedToken });
    }
  }, []);

  // Logic: Function to run when user logs in successfully
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', userData.username);
    setUser({ username: userData.username, token });
  };

  // Logic: Function to run on logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};