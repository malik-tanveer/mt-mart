"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =  useState(null);
  const [token, setToken] = useState(null);

  // LOAD TOKEN
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // LOGIN
  const login = (userData, token) => {

    setUser(userData);
    setToken(token);

    localStorage.setItem(
      "token",
      token
    );
  };

  // LOGOUT
  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem(
      "token"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);