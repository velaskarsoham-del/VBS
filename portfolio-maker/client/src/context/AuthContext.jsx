import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('portfolio_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const data = await authService.getMe();
          if (data.success) {
            setUser(data.user);
          } else {
            authService.logout();
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error('Failed to load authenticated user:', err);
          authService.logout();
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const register = async (userData) => {
    setError(null);
    try {
      const data = await authService.register(userData);
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  const login = async (userData) => {
    setError(null);
    try {
      const data = await authService.login(userData);
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Invalid credentials.';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
