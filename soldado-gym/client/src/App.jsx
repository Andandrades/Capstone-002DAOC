import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { LoginPage } from "./Pages/Login/LoginPage";
import RecoverPage from "./Pages/Recover/RecoverPage";
import { Menu } from "./Pages/Menu/Menu";
import { ProfilePage } from "./Pages/Profile/ProfilePage";
import { SchedulePage } from "./Pages/Schedule/SchedulePage";
import { ClassesPage } from "./Pages/Classes/ClassesPage";

import { ScheduleGym } from "./Pages/Schedule/ScheduleGym";

import  PlansPage  from "./Pages/Plans/PlansPage";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth) {
      setIsAuth(JSON.parse(storedAuth)); // Cargar el estado desde localStorage si existe
    }

    fetch("/checkauth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setLoading(false);
        localStorage.setItem("isAuth", JSON.stringify(data.isAuth)); // Almacenar el estado en localStorage
      })
      .catch((err) => {
        console.error("Error fetching /checkauth:", err);
        setLoading(false); // Finaliza la carga incluso si hay un error
      });
  }, []);

  // Componente para proteger rutas
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // Muestra un indicador de carga mientras se verifica la autenticación
    }

    return isAuth ? children : <Navigate to="/login" />;
  };

  // Componente para redirigir si el usuario ya está autenticado
  const RedirectIfAuthenticated = ({ children }) => {
    return isAuth ? <Navigate to="/inicio" /> : children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <LoginPage setIsAuth={setIsAuth} />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Planes" element={<PlansPage/>} /> 

        <Route
          path="/recover"
          element={
            <ProtectedRoute>
              <RecoverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule/gym"
          element={
            <ProtectedRoute>
              <ScheduleGym />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;