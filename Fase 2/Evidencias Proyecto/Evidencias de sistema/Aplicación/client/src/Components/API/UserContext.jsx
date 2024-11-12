import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({ id: '', name: '', email: '', role: '' });

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

        // Aquí no necesitas setUserId ya que ya lo estás incluyendo dentro de userData
        if (data.isAuth) {
          setUserData({
            id: data.userId,  // Aquí asignamos el id correctamente
            name: data.name,
            email: data.email,
            role: data.role,
          });

          // Guardamos los datos del usuario en localStorage
          localStorage.setItem("userData", JSON.stringify({
            id: data.userId, 
            name: data.name,
            email: data.email,
            role: data.role,
          }));
        } else {
          setUserData({ id: '', name: '', email: '', role: '' });
        }
      })
      .catch((err) => {
        console.error("Error fetching /checkauth:", err);
      });
  }, []);

  const UserData = useMemo(() => ({
    isAuth, 
    userData,
    setIsAuth, 
    setUserData,
  }), [isAuth, userData]);

  return (
    <UserContext.Provider value={UserData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
