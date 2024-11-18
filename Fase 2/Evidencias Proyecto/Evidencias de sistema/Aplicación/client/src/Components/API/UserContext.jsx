import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({ id: '', name: '', email: '', role: '' , weight  :'' , height  :''   });
  const [loading, setLoading] = useState(true);

 const fetchAuthData = () => {
  setLoading(true); // Establecer que está cargando al inicio

  fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      // Verificar si la respuesta contiene isAuth
      const isAuthenticated = data.isAuth || false;
      setIsAuth(isAuthenticated);
      localStorage.setItem("isAuth", JSON.stringify(isAuthenticated));

      if (isAuthenticated) {
        // Si está autenticado, solo asignar datos válidos
        const user = {
          id: data.userId || null,
          name: data.name || null,
          email: data.email || null,
          role: data.role || null,
          remaining_classes: data.remaining_classes || null,
          plan_id: data.plan_id || null,
          weight: data.weight || null,
          height: data.height || null,
        };

        if (user.id !== null || user.name !== null || user.email !== null) {
          setUserData(user);
          localStorage.setItem("userData", JSON.stringify(user));
        } else {
          setUserData({ id: null, name: null, email: null, role: null });
          localStorage.removeItem("userData");
        }
      } else {
        setUserData({ id: null, name: null, email: null, role: null });
        localStorage.removeItem("userData");
      }
    })
    .catch((err) => {
      console.error("Error fetching /checkauth:", err);
      setIsAuth(false);
      setUserData({ id: null, name: null, email: null, role: null });
    })
    .finally(() => {
      setLoading(false); 
    });
};

  useEffect(() => {
    setLoading(true);
    fetchAuthData();
  }, []);




  const userContextValue = useMemo(() => ({
    isAuth,
    setIsAuth,
    userData,
    setUserData,
    loading,
    setLoading,
    fetchAuthData
  }), [isAuth, userData, loading]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
