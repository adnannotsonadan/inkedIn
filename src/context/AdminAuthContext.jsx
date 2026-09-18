import React, { createContext, useContext, useState, useEffect } from "react";

// TODO: import { auth } from "../lib/firebase";
// TODO: import { onAuthStateChanged } from "firebase/auth";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // TODO: replace this block with Firebase onAuthStateChanged
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setAdmin(user);
    //   setAuthLoading(false);
    // });
    // return unsubscribe;

    // Temporary: nothing is authenticated by default
    setAuthLoading(false);
  }, []);

  // TODO: implement logout
  const logout = async () => {
    // await signOut(auth);
    setAdmin(null);
  };

  if (authLoading) return null;

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
