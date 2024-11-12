import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({ id: '', name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    const storedUserData = localStorage.getItem("userData");

    if (storedAuth) {
      setIsAuth(JSON.parse(storedAuth));
    }
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Realizamos la consulta de autenticación
    fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        localStorage.setItem("isAuth", JSON.stringify(data.isAuth));

        if (data.isAuth) {
          const user = {
            id: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
          };
          setUserData(user);
          localStorage.setItem("userData", JSON.stringify(user));
        } else {
          setUserData({ id: '', name: '', email: '', role: '' });
          localStorage.removeItem("userData");
        }
      })
      .catch((err) => {
        console.error("Error fetching /checkauth:", err);
        setIsAuth(false);
        setUserData({ id: '', name: '', email: '', role: '' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const userContextValue = useMemo(() => ({
    isAuth,
    setIsAuth,
    userData,
    setUserData,
    loading,
    setLoading
  }), [isAuth, userData, loading]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
