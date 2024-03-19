import React, { createContext, useState, useContext } from "react";
import axios from "axios";
const AuthContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AuthProvider = ({ children }) => {
  const authUser = async (token) => {
   if (!token) {
     return false;
   }
   try {
     const res = await axios.get(`${backendUrl}/admin/verifyAdmin`, {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     });
     return res.data.status;
   } catch (err) {
     return false;
   }
  };

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
