import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth) {
      setIsAuth(JSON.parse(storedAuth));
    }

    fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        localStorage.setItem("isAuth", JSON.stringify(data.isAuth));
        localStorage.setItem("userID", JSON.stringify(data.userId));
        setUserId(data.userId);
      })
      .catch((err) => {
        console.error("Error fetching /checkauth:", err);
      });
  }, []);

  const UserData = useMemo(() => ({ isAuth, userId, setIsAuth }), [isAuth, userId, setIsAuth]);

  return (
    <UserContext.Provider value={UserData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
