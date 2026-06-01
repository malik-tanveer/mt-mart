// token.js

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const removeToken = () => {
  localStorage.removeItem("token");
};