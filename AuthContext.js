//authcontext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬 저장소에서 사용자 정보를 가져옴
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error('Error retrieving user from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData) => {
    // 로그인 상태로 변경
    setUser(userData);
    console.log(userData);
  };

  const logout = async () => {
    try {
      // AsyncStorage에서 토큰과 사용자 정보 제거
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      // 로그아웃 상태로 변경
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const authContextValue = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
